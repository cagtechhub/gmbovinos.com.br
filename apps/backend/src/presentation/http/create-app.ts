import {
  checkHealth,
  createContact,
  createGalleryItem,
  createLead,
  deleteGalleryItem,
  deleteLead,
  getGalleryItem,
  getLeadById,
  getSectionByKey,
  getSiteSettings,
  listGallery,
  listLeads,
  listSections,
  reorderGallery,
  updateGalleryItem,
  updateLead,
  updateSection,
  updateSiteSettings,
  uploadGalleryItem,
} from "@/application/index"
import {
  contactSchema,
  createContactSchema,
  createGalleryItemSchema,
  createLeadSchema,
  galleryItemSchema,
  healthResponseSchema,
  leadSchema,
  reorderGallerySchema,
  sectionKeySchema,
  siteSectionSchema,
  siteSettingsSchema,
  updateGalleryItemSchema,
  updateLeadSchema,
  updateSiteSectionSchema,
  updateSiteSettingsSchema,
} from "@gmbovinos/shared"
import { Cause, Effect, Exit, ManagedRuntime } from "effect"
import express, { type Express, type Request, type Response } from "express"
import multer from "multer"
import type { AppServices } from "@/infrastructure/runtime"
import { requireAdmin } from "@/presentation/http/require-admin"
import { ALLOWED_MEDIA_MIME_TYPES } from "@/domain/media/media-kind"

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (
      ALLOWED_MEDIA_MIME_TYPES.has(file.mimetype) ||
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true)
      return
    }
    cb(new Error("Unsupported file type"))
  },
})

const failureMessage = (exit: Exit.Exit<unknown, unknown>, fallback: string) => {
  if (Exit.isSuccess(exit)) return fallback
  const failures = [...Cause.failures(exit.cause), ...Cause.defects(exit.cause)]
  const first = failures[0]
  if (first instanceof Error) return first.message
  if (typeof first === "string") return first
  return fallback
}

const sendExitError = (
  res: Response,
  exit: Exit.Exit<unknown, unknown>,
  notFoundMessage: string
) => {
  const message = failureMessage(exit, notFoundMessage)
  const isNotFound = message.toLowerCase().includes("not found")
  res.status(isNotFound ? 404 : 500).json({
    error: isNotFound ? "not_found" : "internal_error",
    message,
  })
}

const runEffect = <A, E>(
  runtime: ManagedRuntime.ManagedRuntime<AppServices, never>,
  effect: Effect.Effect<A, E, AppServices>,
  res: Response,
  onSuccess: (value: A) => void,
  notFoundMessage = "Resource not found"
) => {
  void runtime.runPromiseExit(effect).then((exit) => {
    if (Exit.isSuccess(exit)) {
      onSuccess(exit.value)
      return
    }
    sendExitError(res, exit, notFoundMessage)
  })
}

const parseSectionKey = (value: string) => sectionKeySchema.safeParse(value)

export const createApp = (
  runtime: ManagedRuntime.ManagedRuntime<AppServices, never>
): Express => {
  const app = express()
  app.use(express.json({ limit: "2mb" }))
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (_req.method === "OPTIONS") {
      res.sendStatus(204)
      return
    }
    next()
  })

  app.get("/", (_req, res) => {
    res.json({
      name: "@gmbovinos/backend",
      docs: {
        health: "GET /health",
        contacts: "POST /contacts",
        settings: "GET /settings",
        sections: "GET /sections",
        gallery: "GET /gallery",
        admin: "/admin/*",
      },
    })
  })

  app.get("/health", (_req, res) => {
    void runtime.runPromiseExit(checkHealth).then((exit) => {
      if (Exit.isSuccess(exit)) {
        res.status(200).json(
          healthResponseSchema.parse({
            status: "ok",
            ...exit.value,
          })
        )
        return
      }
      res.status(503).json(
        healthResponseSchema.parse({
          status: "degraded",
          api: "ok",
          database: "error",
        })
      )
    })
  })

  app.post("/contacts", (req, res) => {
    const parsed = createContactSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }

    runEffect(runtime, createContact(parsed.data), res, (contact) => {
      res.status(201).json(contactSchema.parse(contact))
    })
  })

  app.get("/settings", (_req, res) => {
    runEffect(runtime, getSiteSettings, res, (item) => {
      res.json(siteSettingsSchema.parse(item))
    })
  })

  app.get("/sections", (_req, res) => {
    runEffect(runtime, listSections, res, (items) => {
      res.json(items.map((item) => siteSectionSchema.parse(item)))
    })
  })

  app.get("/sections/:key", (req, res) => {
    const keyParsed = parseSectionKey(req.params.key)
    if (!keyParsed.success) {
      res.status(400).json({
        error: "validation_error",
        message: "Invalid section key",
        issues: keyParsed.error.flatten().formErrors,
      })
      return
    }
    runEffect(
      runtime,
      getSectionByKey(keyParsed.data),
      res,
      (item) => {
        res.json(siteSectionSchema.parse(item))
      },
      "Section not found"
    )
  })

  app.get("/gallery", (_req, res) => {
    runEffect(runtime, listGallery({ activeOnly: true }), res, (items) => {
      res.json(items.map((item) => galleryItemSchema.parse(item)))
    })
  })

  app.get("/admin/dashboard", requireAdmin, (_req, res) => {
    runEffect(
      runtime,
      Effect.gen(function* () {
        const leads = yield* listLeads
        const gallery = yield* listGallery()
        const sections = yield* listSections
        return {
          leadsNew: leads.filter((lead) => lead.status === "NEW").length,
          leadsTotal: leads.length,
          galleryCount: gallery.length,
          sectionsCount: sections.length,
        }
      }),
      res,
      (stats) => {
        res.json(stats)
      }
    )
  })

  app.get("/admin/leads", requireAdmin, (_req, res) => {
    runEffect(runtime, listLeads, res, (items) => {
      res.json(items.map((item) => leadSchema.parse(item)))
    })
  })

  app.get("/admin/leads/:id", requireAdmin, (req, res) => {
    runEffect(
      runtime,
      getLeadById(req.params.id),
      res,
      (item) => {
        res.json(leadSchema.parse(item))
      },
      "Lead not found"
    )
  })

  app.post("/admin/leads", requireAdmin, (req, res) => {
    const parsed = createLeadSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(runtime, createLead(parsed.data), res, (item) => {
      res.status(201).json(leadSchema.parse(item))
    })
  })

  app.patch("/admin/leads/:id", requireAdmin, (req, res) => {
    const parsed = updateLeadSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(
      runtime,
      updateLead(req.params.id, parsed.data),
      res,
      (item) => {
        res.json(leadSchema.parse(item))
      },
      "Lead not found"
    )
  })

  app.delete("/admin/leads/:id", requireAdmin, (req, res) => {
    runEffect(
      runtime,
      deleteLead(req.params.id),
      res,
      () => {
        res.status(204).send()
      },
      "Lead not found"
    )
  })

  app.get("/admin/settings", requireAdmin, (_req, res) => {
    runEffect(runtime, getSiteSettings, res, (item) => {
      res.json(siteSettingsSchema.parse(item))
    })
  })

  app.put("/admin/settings", requireAdmin, (req, res) => {
    const parsed = updateSiteSettingsSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(runtime, updateSiteSettings(parsed.data), res, (item) => {
      res.json(siteSettingsSchema.parse(item))
    })
  })

  app.get("/admin/sections", requireAdmin, (_req, res) => {
    runEffect(runtime, listSections, res, (items) => {
      res.json(items.map((item) => siteSectionSchema.parse(item)))
    })
  })

  app.patch("/admin/sections/:key", requireAdmin, (req, res) => {
    const keyParsed = parseSectionKey(req.params.key)
    if (!keyParsed.success) {
      res.status(400).json({
        error: "validation_error",
        message: "Invalid section key",
        issues: keyParsed.error.flatten().formErrors,
      })
      return
    }
    const parsed = updateSiteSectionSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(
      runtime,
      updateSection(keyParsed.data, parsed.data),
      res,
      (item) => {
        res.json(siteSectionSchema.parse(item))
      },
      "Section not found"
    )
  })

  app.get("/admin/gallery", requireAdmin, (_req, res) => {
    runEffect(runtime, listGallery(), res, (items) => {
      res.json(items.map((item) => galleryItemSchema.parse(item)))
    })
  })

  app.post("/admin/gallery", requireAdmin, (req, res) => {
    const parsed = createGalleryItemSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(runtime, createGalleryItem(parsed.data), res, (item) => {
      res.status(201).json(galleryItemSchema.parse(item))
    })
  })

  app.post("/admin/gallery/upload", requireAdmin, (req, res) => {
    const handleUpload = upload.single("file") as unknown as (
      req: Request,
      res: Response,
      cb: (err?: unknown) => void
    ) => void

    handleUpload(req, res, (err) => {
      if (err) {
        res.status(400).json({ error: "upload_error", message: String(err) })
        return
      }
      const file = (
        req as Request & {
          file?: { originalname: string; mimetype: string; buffer: Buffer }
        }
      ).file
      if (!file) {
        res.status(400).json({
          error: "validation_error",
          message: "Arquivo obrigatório (file)",
        })
        return
      }

      const alt =
        typeof req.body?.alt === "string" && req.body.alt.trim()
          ? req.body.alt.trim()
          : file.originalname
      const caption =
        typeof req.body?.caption === "string" ? req.body.caption.trim() : undefined

      runEffect(
        runtime,
        uploadGalleryItem(
          {
            fileName: file.originalname,
            contentType: file.mimetype,
            body: file.buffer,
          },
          { alt, caption }
        ),
        res,
        (item) => {
          res.status(201).json(galleryItemSchema.parse(item))
        }
      )
    })
  })

  app.post("/admin/gallery/reorder", requireAdmin, (req, res) => {
    const parsed = reorderGallerySchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(runtime, reorderGallery(parsed.data.orderedIds), res, (items) => {
      res.json(items.map((item) => galleryItemSchema.parse(item)))
    })
  })

  app.get("/admin/gallery/:id", requireAdmin, (req, res) => {
    runEffect(
      runtime,
      getGalleryItem(req.params.id),
      res,
      (item) => {
        res.json(galleryItemSchema.parse(item))
      },
      "Gallery item not found"
    )
  })

  app.patch("/admin/gallery/:id", requireAdmin, (req, res) => {
    const parsed = updateGalleryItemSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      })
      return
    }
    runEffect(
      runtime,
      updateGalleryItem(req.params.id, parsed.data),
      res,
      (item) => {
        res.json(galleryItemSchema.parse(item))
      },
      "Gallery item not found"
    )
  })

  app.delete("/admin/gallery/:id", requireAdmin, (req, res) => {
    runEffect(
      runtime,
      deleteGalleryItem(req.params.id),
      res,
      () => {
        res.status(204).send()
      },
      "Gallery item not found"
    )
  })

  return app
}
