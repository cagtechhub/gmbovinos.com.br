<script setup lang="ts">
import type { SiteSettings } from '@gmbovinos/shared'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const api = useAdminApi()
const error = ref('')
const success = ref('')
const loading = ref(true)
const saving = ref(false)

const form = reactive({
  siteUrl: '',
  siteName: '',
  seoLocality: '',
  noIndex: false,
  businessAddress: '',
  businessPhone: '',
  contactEmail: '',
  whatsappNumber: '',
  whatsappMessage: '',
  instagramUrl: '',
  facebookUrl: '',
  founderProfileUrl: '',
  defaultOgImageUrl: '',
  faviconUrl: '',
  ga4MeasurementId: '',
  metaPixelId: '',
  mapsEmbedUrl: '',
  geoLatitude: '',
  geoLongitude: '',
})

const applySettings = (item: SiteSettings) => {
  form.siteUrl = item.siteUrl
  form.siteName = item.siteName
  form.seoLocality = item.seoLocality
  form.noIndex = item.noIndex
  form.businessAddress = item.businessAddress
  form.businessPhone = item.businessPhone
  form.contactEmail = item.contactEmail
  form.whatsappNumber = item.whatsappNumber
  form.whatsappMessage = item.whatsappMessage
  form.instagramUrl = item.instagramUrl
  form.facebookUrl = item.facebookUrl
  form.founderProfileUrl = item.founderProfileUrl
  form.defaultOgImageUrl = item.defaultOgImageUrl
  form.faviconUrl = item.faviconUrl
  form.ga4MeasurementId = item.ga4MeasurementId
  form.metaPixelId = item.metaPixelId
  form.mapsEmbedUrl = item.mapsEmbedUrl
  form.geoLatitude = item.geoLatitude
  form.geoLongitude = item.geoLongitude
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    applySettings(await api.getSettings())
  } catch {
    error.value = 'Não foi possível carregar as configurações.'
  } finally {
    loading.value = false
  }
}

const onSubmit = async () => {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    applySettings(await api.updateSettings({ ...form }))
    success.value = 'Configurações salvas.'
  } catch {
    error.value = 'Falha ao salvar configurações.'
  } finally {
    saving.value = false
  }
}

const uploadingAsset = ref<'favicon' | 'og' | null>(null)

const onUploadAsset = async (kind: 'favicon' | 'og', event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploadingAsset.value = kind
  error.value = ''
  success.value = ''
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('kind', kind)
    applySettings(await api.uploadBrandAsset(formData))
    success.value = kind === 'favicon' ? 'Favicon enviado.' : 'Imagem OG enviada.'
  } catch {
    error.value = 'Falha no upload da imagem.'
  } finally {
    uploadingAsset.value = null
    input.value = ''
  }
}

await load()
</script>

<template>
  <div class="mx-auto max-w-3xl portal-stack">
    <header class="portal-page-header">
      <div>
        <p class="admin-eyebrow">Site</p>
        <h2 class="portal-page-title">Configurações</h2>
        <p class="portal-page-desc">SEO, contato, redes, mapa e analytics — usados no site público.</p>
      </div>
    </header>

    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>

    <form
      v-else
      class="portal-card space-y-4 hover:translate-y-0"
      @submit.prevent="onSubmit"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Nome do site
          <input
            v-model="form.siteName"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          URL do site
          <input
            v-model="form.siteUrl"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Localidade SEO
          <input
            v-model="form.seoLocality"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="inline-flex items-center gap-2 self-end pb-2 text-sm text-gray-600">
          <input v-model="form.noIndex" type="checkbox" />
          No-index (bloquear busca)
        </label>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Endereço comercial
          <input
            v-model="form.businessAddress"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Telefone
          <input
            v-model="form.businessPhone"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          E-mail de contato
          <input
            v-model="form.contactEmail"
            type="email"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          WhatsApp (DDI + número)
          <input
            v-model="form.whatsappNumber"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Mensagem padrão WhatsApp
          <input
            v-model="form.whatsappMessage"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Instagram
          <input
            v-model="form.instagramUrl"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Facebook
          <input
            v-model="form.facebookUrl"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Perfil do fundador (URL)
          <input
            v-model="form.founderProfileUrl"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <div class="sm:col-span-2 grid gap-4 sm:grid-cols-2">
          <div class="rounded-control border border-gray-300 p-4">
            <p class="text-sm font-medium text-gray-900">Favicon</p>
            <p class="mt-1 text-xs text-gray-600">PNG, ICO, SVG ou WebP.</p>
            <img
              v-if="form.faviconUrl"
              :src="form.faviconUrl"
              alt="Favicon atual"
              class="mt-3 size-12 rounded-control border border-gray-300 bg-white object-contain p-1 shadow-card"
            />
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon,.ico"
              class="mt-3 block w-full text-sm"
              :disabled="uploadingAsset === 'favicon'"
              @change="onUploadAsset('favicon', $event)"
            />
            <label class="mt-3 block text-sm text-gray-600">
              URL
              <input
                v-model="form.faviconUrl"
                class="focus-ring mt-1 w-full rounded-control border border-gray-300 px-3 py-2"
              />
            </label>
          </div>
          <div class="rounded-control border border-gray-300 p-4">
            <p class="text-sm font-medium text-gray-900">Imagem OG padrão</p>
            <p class="mt-1 text-xs text-gray-600">PNG, JPEG ou WebP (recomendado 1200×630).</p>
            <img
              v-if="form.defaultOgImageUrl"
              :src="form.defaultOgImageUrl"
              alt="Imagem Open Graph atual"
              class="mt-3 h-24 w-full rounded-control border border-gray-300 object-cover shadow-card"
            />
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              class="mt-3 block w-full text-sm"
              :disabled="uploadingAsset === 'og'"
              @change="onUploadAsset('og', $event)"
            />
            <label class="mt-3 block text-sm text-gray-600">
              URL
              <input
                v-model="form.defaultOgImageUrl"
                class="focus-ring mt-1 w-full rounded-control border border-gray-300 px-3 py-2"
              />
            </label>
          </div>
        </div>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Embed do Google Maps (URL do iframe)
          <textarea
            v-model="form.mapsEmbedUrl"
            rows="3"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Latitude
          <input
            v-model="form.geoLatitude"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Longitude
          <input
            v-model="form.geoLongitude"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          GA4 Measurement ID
          <input
            v-model="form.ga4MeasurementId"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="G-XXXXXXXXXX"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Meta Pixel ID
          <input
            v-model="form.metaPixelId"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="123456789012345"
          />
        </label>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <p v-if="success" class="text-sm text-emerald-700">{{ success }}</p>

      <button
        type="submit"
        class="btn-primary focus-ring"
        :disabled="saving"
      >
        {{ saving ? 'Salvando…' : 'Salvar configurações' }}
      </button>
    </form>
  </div>
</template>
