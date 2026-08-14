<script setup lang="ts">
import { sectionKeySchema, type SectionKey, type SiteSection } from '@gmbovinos/shared'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const route = useRoute()
const api = useAdminApi()

const keyParsed = sectionKeySchema.safeParse(String(route.params.key || ''))
if (!keyParsed.success) {
  throw createError({ statusCode: 404, statusMessage: 'Seção não encontrada' })
}
const sectionKey = keyParsed.data as SectionKey

const sectionLabel: Record<SectionKey, string> = {
  hero: 'Hero',
  como_funciona: 'Como funciona',
  atuacao: 'Atuação',
  seo_content: 'Conteúdo SEO',
  about: 'Sobre',
  cta: 'CTA',
  pre_footer: 'Pré-rodapé',
}

const error = ref('')
const success = ref('')
const loading = ref(true)
const saving = ref(false)
const payloadError = ref('')

const title = ref('')
const fields = reactive({
  eyebrow: '',
  headline: '',
  body: '',
  chip: '',
  imageUrl: '',
})
const advancedJson = ref('{}')
const basePayload = ref<Record<string, unknown>>({})

const applySection = (section: SiteSection) => {
  title.value = section.title
  const payload = { ...(section.payload as Record<string, unknown>) }
  basePayload.value = payload
  fields.eyebrow = String(payload.eyebrow ?? '')
  fields.headline = String(payload.headline ?? '')
  fields.body = String(payload.body ?? '')
  fields.chip = String(payload.chip ?? '')
  fields.imageUrl = String(payload.imageUrl ?? '')
  advancedJson.value = JSON.stringify(payload, null, 2)
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const sections = await api.listSections()
    const found = sections.find((item) => item.key === sectionKey)
    if (!found) {
      throw createError({ statusCode: 404, statusMessage: 'Seção não encontrada' })
    }
    applySection(found)
  } catch (e: unknown) {
    const status =
      e && typeof e === 'object' && 'statusCode' in e
        ? Number((e as { statusCode?: number }).statusCode)
        : 0
    if (status === 404) throw e
    error.value = 'Não foi possível carregar a seção.'
  } finally {
    loading.value = false
  }
}

const syncFieldsIntoJson = () => {
  let parsed: Record<string, unknown>
  try {
    const raw = JSON.parse(advancedJson.value)
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      throw new Error('invalid')
    }
    parsed = raw as Record<string, unknown>
  } catch {
    parsed = { ...basePayload.value }
  }

  const fieldKeys = ['eyebrow', 'headline', 'body', 'chip', 'imageUrl'] as const
  const rebuilt: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(parsed)) {
    if ((fieldKeys as readonly string[]).includes(key)) continue
    rebuilt[key] = value
  }
  for (const key of fieldKeys) {
    const value = fields[key]
    if (value.trim()) rebuilt[key] = value
  }

  advancedJson.value = JSON.stringify(rebuilt, null, 2)
  basePayload.value = rebuilt
}

const syncJsonIntoFields = () => {
  payloadError.value = ''
  try {
    const raw = JSON.parse(advancedJson.value)
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      payloadError.value = 'O payload precisa ser um objeto JSON.'
      return
    }
    const parsed = raw as Record<string, unknown>
    basePayload.value = parsed
    fields.eyebrow = String(parsed.eyebrow ?? '')
    fields.headline = String(parsed.headline ?? '')
    fields.body = String(parsed.body ?? '')
    fields.chip = String(parsed.chip ?? '')
    fields.imageUrl = String(parsed.imageUrl ?? '')
  } catch {
    payloadError.value = 'JSON inválido.'
  }
}

const onSave = async () => {
  saving.value = true
  error.value = ''
  success.value = ''
  payloadError.value = ''
  syncFieldsIntoJson()

  let payload: Record<string, unknown>
  try {
    const raw = JSON.parse(advancedJson.value)
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      payloadError.value = 'O payload precisa ser um objeto JSON.'
      saving.value = false
      return
    }
    payload = raw as Record<string, unknown>
  } catch {
    payloadError.value = 'JSON inválido.'
    saving.value = false
    return
  }

  try {
    const updated = await api.updateSection(sectionKey, {
      title: title.value,
      payload: payload as SiteSection['payload'],
    })
    applySection(updated)
    success.value = 'Seção salva.'
  } catch {
    error.value = 'Falha ao salvar a seção.'
  } finally {
    saving.value = false
  }
}

await load()
</script>

<template>
  <div class="mx-auto max-w-3xl portal-stack">
    <header class="portal-page-header">
      <div>
        <NuxtLink to="/admin/conteudo" class="text-sm font-medium text-primary-500 hover:underline">
          ← Voltar
        </NuxtLink>
        <h2 class="portal-page-title">{{ sectionLabel[sectionKey] || sectionKey }}</h2>
        <p class="portal-page-desc">Campos comuns + JSON avançado do payload.</p>
      </div>
    </header>

    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>

    <form
      v-else
      class="space-y-4 rounded-xl border border-gray-300 bg-white p-6"
      @submit.prevent="onSave"
    >
      <label class="block text-sm text-gray-600">
        Título da seção
        <input
          v-model="title"
          required
          class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
        />
      </label>

      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm text-gray-600">
          Eyebrow
          <input
            v-model="fields.eyebrow"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            @change="syncFieldsIntoJson"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Chip
          <input
            v-model="fields.chip"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            @change="syncFieldsIntoJson"
          />
        </label>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Headline
          <input
            v-model="fields.headline"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            @change="syncFieldsIntoJson"
          />
        </label>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Body
          <textarea
            v-model="fields.body"
            rows="4"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            @change="syncFieldsIntoJson"
          />
        </label>
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Image URL
          <input
            v-model="fields.imageUrl"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
            @change="syncFieldsIntoJson"
          />
        </label>
      </div>

      <label class="block text-sm text-gray-600">
        Payload completo (JSON avançado)
        <textarea
          v-model="advancedJson"
          rows="14"
          class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs"
          @blur="syncJsonIntoFields"
        />
      </label>

      <p v-if="payloadError" class="text-sm text-red-600">{{ payloadError }}</p>
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
      <p v-if="success" class="text-sm text-emerald-700">{{ success }}</p>

      <button
        type="submit"
        class="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
        :disabled="saving"
      >
        {{ saving ? 'Salvando…' : 'Salvar seção' }}
      </button>
    </form>
  </div>
</template>
