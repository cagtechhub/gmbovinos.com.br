<script setup lang="ts">
import type { SectionKey, SiteSection } from '@gmbovinos/shared'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const api = useAdminApi()
const sections = ref<SiteSection[]>([])
const error = ref('')
const loading = ref(true)
const savingKey = ref<SectionKey | null>(null)
const successKey = ref<SectionKey | null>(null)
const editingKey = ref<SectionKey | null>(null)
const editTitle = ref('')
const editPayloadText = ref('')
const payloadError = ref('')

const sectionLabel: Record<SectionKey, string> = {
  hero: 'Hero',
  como_funciona: 'Como funciona',
  atuacao: 'Atuação',
  seo_content: 'Conteúdo SEO',
  about: 'Sobre',
  cta: 'CTA',
  pre_footer: 'Pré-rodapé',
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    sections.value = await api.listSections()
  } catch {
    error.value = 'Não foi possível carregar as seções.'
  } finally {
    loading.value = false
  }
}

const openEdit = (section: SiteSection) => {
  editingKey.value = section.key
  editTitle.value = section.title
  editPayloadText.value = JSON.stringify(section.payload, null, 2)
  payloadError.value = ''
  successKey.value = null
}

const closeEdit = () => {
  editingKey.value = null
  payloadError.value = ''
}

const onSave = async () => {
  if (!editingKey.value) return
  payloadError.value = ''
  successKey.value = null

  let payload: unknown
  try {
    payload = JSON.parse(editPayloadText.value)
  } catch {
    payloadError.value = 'JSON inválido no payload.'
    return
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    payloadError.value = 'O payload precisa ser um objeto JSON.'
    return
  }

  savingKey.value = editingKey.value
  try {
    const updated = await api.updateSection(editingKey.value, {
      title: editTitle.value,
      payload: payload as SiteSection['payload'],
    })
    const idx = sections.value.findIndex((item) => item.key === updated.key)
    if (idx >= 0) sections.value[idx] = updated
    successKey.value = updated.key
    editingKey.value = null
  } catch {
    error.value = 'Falha ao salvar a seção.'
  } finally {
    savingKey.value = null
  }
}

await load()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-semibold text-gray-900">Conteúdo</h2>
      <p class="mt-1 text-sm text-gray-600">
        Seções da landing — clique para editar título e payload JSON, ou abra o editor avançado.
      </p>
    </div>

    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>
    <p v-else-if="error" class="text-sm text-red-600">{{ error }}</p>

    <ul v-else class="space-y-3">
      <li
        v-for="section in sections"
        :key="section.key"
        class="rounded-xl border border-gray-300 bg-white"
      >
        <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <button type="button" class="min-w-0 flex-1 text-left" @click="openEdit(section)">
            <p class="font-semibold text-gray-900">
              {{ sectionLabel[section.key] || section.key }}
            </p>
            <p class="mt-0.5 truncate text-sm text-gray-600">{{ section.title }}</p>
            <p v-if="successKey === section.key" class="mt-1 text-xs text-emerald-700">Salvo.</p>
          </button>
          <div class="flex gap-2">
            <NuxtLink
              :to="`/admin/conteudo/${section.key}`"
              class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
            >
              Editor
            </NuxtLink>
            <button
              type="button"
              class="rounded-lg bg-primary-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700"
              @click="openEdit(section)"
            >
              JSON
            </button>
          </div>
        </div>

        <form
          v-if="editingKey === section.key"
          class="space-y-3 border-t border-gray-300 px-5 py-4"
          @submit.prevent="onSave"
        >
          <label class="block text-sm text-gray-600">
            Título
            <input
              v-model="editTitle"
              required
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
            />
          </label>
          <label class="block text-sm text-gray-600">
            Payload (JSON)
            <textarea
              v-model="editPayloadText"
              rows="14"
              class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-xs text-gray-900"
            />
          </label>
          <p v-if="payloadError" class="text-sm text-red-600">{{ payloadError }}</p>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
              @click="closeEdit"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="rounded-lg bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
              :disabled="savingKey === section.key"
            >
              {{ savingKey === section.key ? 'Salvando…' : 'Salvar' }}
            </button>
          </div>
        </form>
      </li>
    </ul>
  </div>
</template>
