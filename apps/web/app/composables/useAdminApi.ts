import {
  createGalleryItemSchema,
  createLeadSchema,
  reorderGallerySchema,
  updateGalleryItemSchema,
  updateLeadSchema,
  updateSiteSectionSchema,
  updateSiteSettingsSchema,
  type CreateGalleryItemInput,
  type CreateLeadInput,
  type GalleryItem,
  type Lead,
  type ReorderGalleryInput,
  type SectionKey,
  type SiteSection,
  type SiteSettings,
  type UpdateGalleryItemInput,
  type UpdateLeadInput,
  type UpdateSiteSectionInput,
  type UpdateSiteSettingsInput,
} from '@gmbovinos/shared'

export type AdminDashboardStats = {
  leadsNew: number
  leadsTotal: number
  galleryCount: number
  sectionsCount: number
}

export const useAdminApi = () => {
  const token = useCookie<string | null>('admin_token', {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  const baseUrl = useApiBase()

  const ensureAccessToken = async (): Promise<string | null> => {
    if (import.meta.client) {
      try {
        const supabase = useSupabaseClient()
        const { data } = await supabase.auth.getSession()
        token.value = data.session?.access_token ?? null
      } catch {
        // keep cookie value
      }
    }
    return token.value
  }

  const authHeaders = async (): Promise<HeadersInit> => {
    const accessToken = await ensureAccessToken()
    if (!accessToken) return {}
    return { Authorization: `Bearer ${accessToken}` }
  }

  const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const headers = new Headers(init.headers)
    if (!(init.body instanceof FormData) && !headers.has('Content-Type') && init.body) {
      headers.set('Content-Type', 'application/json')
    }
    for (const [key, value] of Object.entries(await authHeaders())) {
      headers.set(key, value)
    }

    const response = await fetch(`${baseUrl.value}${path}`, {
      ...init,
      headers,
    })

    if (response.status === 204) {
      return undefined as T
    }

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      if (response.status === 401) {
        token.value = null
      }
      throw createError({
        statusCode: response.status,
        statusMessage: data?.message || data?.error || 'Erro na API',
        data,
      })
    }
    return data as T
  }

  const login = async (email: string, password: string) => {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error || !data.session) {
      throw createError({
        statusCode: 401,
        statusMessage: error?.message || 'E-mail ou senha inválidos',
      })
    }
    token.value = data.session.access_token

    // Confirma permissão na API (ADMIN_ALLOWED_EMAILS / role) antes de entrar no painel.
    try {
      await request<AdminDashboardStats>('/admin/dashboard')
    } catch (cause: unknown) {
      token.value = null
      try {
        await supabase.auth.signOut()
      } catch {
        // ignore
      }
      const statusCode =
        cause && typeof cause === 'object' && 'statusCode' in cause
          ? Number((cause as { statusCode?: number }).statusCode)
          : 403
      const statusMessage =
        cause && typeof cause === 'object' && 'statusMessage' in cause
          ? String((cause as { statusMessage?: string }).statusMessage)
          : 'Usuário sem permissão de admin'
      throw createError({
        statusCode: statusCode || 403,
        statusMessage:
          statusCode === 403
            ? 'Este e-mail não tem permissão de admin. Inclua-o em ADMIN_ALLOWED_EMAILS no backend.'
            : statusMessage || 'Falha ao validar acesso admin',
      })
    }
  }

  const logout = async () => {
    try {
      if (import.meta.client) {
        await useSupabaseClient().auth.signOut()
      }
    } finally {
      token.value = null
    }
  }

  const isAuthenticated = computed(() => Boolean(token.value))

  const getDashboard = () => request<AdminDashboardStats>('/admin/dashboard')

  const listLeads = () => request<Lead[]>('/admin/leads')
  const createLead = (input: CreateLeadInput) =>
    request<Lead>('/admin/leads', {
      method: 'POST',
      body: JSON.stringify(createLeadSchema.parse(input)),
    })
  const updateLead = (id: string, input: UpdateLeadInput) =>
    request<Lead>(`/admin/leads/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateLeadSchema.parse(input)),
    })
  const removeLead = (id: string) => request<undefined>(`/admin/leads/${id}`, { method: 'DELETE' })

  const getSettings = () => request<SiteSettings>('/admin/settings')
  const updateSettings = (input: UpdateSiteSettingsInput) =>
    request<SiteSettings>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(updateSiteSettingsSchema.parse(input)),
    })

  const listSections = () => request<SiteSection[]>('/admin/sections')
  const updateSection = (key: SectionKey, input: UpdateSiteSectionInput) =>
    request<SiteSection>(`/admin/sections/${key}`, {
      method: 'PATCH',
      body: JSON.stringify(updateSiteSectionSchema.parse(input)),
    })

  const listGallery = () => request<GalleryItem[]>('/admin/gallery')
  const createGalleryItem = (input: CreateGalleryItemInput) =>
    request<GalleryItem>('/admin/gallery', {
      method: 'POST',
      body: JSON.stringify(createGalleryItemSchema.parse(input)),
    })
  const updateGalleryItem = (id: string, input: UpdateGalleryItemInput) =>
    request<GalleryItem>(`/admin/gallery/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateGalleryItemSchema.parse(input)),
    })
  const removeGalleryItem = (id: string) =>
    request<undefined>(`/admin/gallery/${id}`, { method: 'DELETE' })

  const uploadGalleryItem = (form: FormData) =>
    request<GalleryItem>('/admin/gallery/upload', {
      method: 'POST',
      body: form,
    })

  const reorderGallery = (input: ReorderGalleryInput) =>
    request<GalleryItem[]>('/admin/gallery/reorder', {
      method: 'POST',
      body: JSON.stringify(reorderGallerySchema.parse(input)),
    })

  return {
    token,
    isAuthenticated,
    login,
    logout,
    getDashboard,
    listLeads,
    createLead,
    updateLead,
    removeLead,
    getSettings,
    updateSettings,
    listSections,
    updateSection,
    listGallery,
    createGalleryItem,
    updateGalleryItem,
    removeGalleryItem,
    uploadGalleryItem,
    reorderGallery,
  }
}
