import type { CreateContactInput } from "@gmbovinos/shared"
import { Effect } from "effect"
import nodemailer from "nodemailer"
import { ContactRepository } from "@/application/contact-repository.context"
import { LeadRepository } from "@/application/lead-repository.context"

const buildLeadNotes = (input: CreateContactInput) => {
  const parts = [input.subject, input.message]
    .map((part) => part?.trim())
    .filter((part): part is string => Boolean(part))
  return parts.length ? parts.join("\n\n") : null
}

const sendContactEmail = async (input: CreateContactInput) => {
  const host = process.env.SMTP_HOST?.trim()
  if (!host) return

  const port = Number(process.env.SMTP_PORT ?? 587)
  const username = process.env.SMTP_USERNAME?.trim()
  const password = process.env.SMTP_PASSWORD?.trim()
  const from = process.env.SMTP_FROM_ADDRESS?.trim() || username
  const to =
    process.env.SMTP_TO?.trim() ||
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ||
    from

  if (!from || !to) {
    console.warn(
      "[contact] SMTP_HOST definido, mas SMTP_FROM_ADDRESS/SMTP_TO ausentes — e-mail ignorado"
    )
    return
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: username && password ? { user: username, pass: password } : undefined,
  })

  await transporter.sendMail({
    from: `"GM Bovinos" <${from}>`,
    to,
    replyTo: input.email,
    subject: input.subject?.trim()
      ? `[Contato] ${input.subject.trim()}`
      : `[Contato] ${input.fullName}`,
    text: [
      `Nome: ${input.fullName}`,
      `Email: ${input.email}`,
      input.phone ? `Telefone: ${input.phone}` : null,
      input.subject ? `Assunto: ${input.subject}` : null,
      "",
      input.message ?? "",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  })
}

export const createContact = (input: CreateContactInput) =>
  Effect.gen(function* () {
    const contacts = yield* ContactRepository
    const leads = yield* LeadRepository
    const contact = yield* contacts.create(input)
    yield* leads.create({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone ?? null,
      notes: buildLeadNotes(input),
      channel: "WEBSITE",
      status: "NEW",
      contactId: contact.id,
    })

    yield* Effect.promise(async () => {
      try {
        await sendContactEmail(input)
      } catch (cause) {
        console.error("[contact] Falha ao enviar e-mail (contato já salvo)", cause)
      }
    })

    return contact
  })
