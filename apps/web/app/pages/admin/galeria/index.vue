<script setup lang="ts">
import type { GalleryItem } from '@gmbovinos/shared'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const api = useAdminApi()
const items = ref<GalleryItem[]>([])
const error = ref('')
const success = ref('')
const loading = ref(true)
const uploading = ref(false)
const savingId = ref<string | null>(null)

const uploadFile = ref<File | null>(null)
const uploadAlt = ref('')
const uploadCaption = ref('')

const drafts = reactive<Record<string, { alt: string; caption: string }>>({})

const syncDrafts = () => {
  for (const item of items.value) {
    drafts[item.id] = {
      alt: item.alt,
      caption: item.caption || '',
    }
  }
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    items.value = await api.listGallery()
    syncDrafts()
  } catch {
    error.value = 'Não foi possível carregar a galeria.'
  } finally {
    loading.value = false
  }
}

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  uploadFile.value = input.files?.[0] ?? null
  if (uploadFile.value && !uploadAlt.value.trim()) {
    uploadAlt.value = uploadFile.value.name.replace(/\.[^.]+$/, '')
  }
}

const onUpload = async () => {
  if (!uploadFile.value) {
    error.value = 'Selecione um arquivo.'
    return
  }
  uploading.value = true
  error.value = ''
  success.value = ''
  try {
    const form = new FormData()
    form.append('file', uploadFile.value)
    form.append('alt', uploadAlt.value.trim() || uploadFile.value.name)
    if (uploadCaption.value.trim()) form.append('caption', uploadCaption.value.trim())
    await api.uploadGalleryItem(form)
    uploadFile.value = null
    uploadAlt.value = ''
    uploadCaption.value = ''
    success.value = 'Arquivo enviado.'
    await load()
  } catch {
    error.value = 'Falha no upload.'
  } finally {
    uploading.value = false
  }
}

const onToggleActive = async (item: GalleryItem) => {
  savingId.value = item.id
  error.value = ''
  try {
    const updated = await api.updateGalleryItem(item.id, { active: !item.active })
    const idx = items.value.findIndex((row) => row.id === updated.id)
    if (idx >= 0) items.value[idx] = updated
  } catch {
    error.value = 'Não foi possível atualizar o status.'
  } finally {
    savingId.value = null
  }
}

const onSaveMeta = async (item: GalleryItem) => {
  const draft = drafts[item.id]
  if (!draft) return
  savingId.value = item.id
  error.value = ''
  success.value = ''
  try {
    const updated = await api.updateGalleryItem(item.id, {
      alt: draft.alt,
      caption: draft.caption,
    })
    const idx = items.value.findIndex((row) => row.id === updated.id)
    if (idx >= 0) items.value[idx] = updated
    drafts[item.id] = { alt: updated.alt, caption: updated.caption || '' }
    success.value = 'Item atualizado.'
  } catch {
    error.value = 'Falha ao salvar alt/caption.'
  } finally {
    savingId.value = null
  }
}

const onDelete = async (item: GalleryItem) => {
  if (!confirm(`Excluir item "${item.alt}"?`)) return
  savingId.value = item.id
  error.value = ''
  try {
    await api.removeGalleryItem(item.id)
    await load()
  } catch {
    error.value = 'Falha ao excluir.'
  } finally {
    savingId.value = null
  }
}

const move = async (index: number, direction: -1 | 1) => {
  const target = index + direction
  if (target < 0 || target >= items.value.length) return
  const ordered = [...items.value]
  const [removed] = ordered.splice(index, 1)
  if (!removed) return
  ordered.splice(target, 0, removed)
  items.value = ordered
  error.value = ''
  try {
    items.value = await api.reorderGallery({ orderedIds: ordered.map((item) => item.id) })
    syncDrafts()
  } catch {
    error.value = 'Não foi possível reordenar.'
    await load()
  }
}

await load()
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-3xl font-semibold text-gray-900">Galeria</h2>
      <p class="mt-1 text-sm text-gray-600">
        Upload, edição de alt/caption, ativar/desativar e reordenar itens.
      </p>
    </div>

    <form
      class="space-y-4 rounded-xl border border-gray-300 bg-white p-5"
      @submit.prevent="onUpload"
    >
      <h3 class="text-lg font-semibold text-gray-900">Novo upload</h3>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm text-gray-600 sm:col-span-2">
          Arquivo
          <input
            type="file"
            accept="image/*,video/*"
            class="mt-1 block w-full text-sm"
            @change="onFileChange"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Alt
          <input
            v-model="uploadAlt"
            required
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
        <label class="block text-sm text-gray-600">
          Caption
          <input
            v-model="uploadCaption"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
          />
        </label>
      </div>
      <button
        type="submit"
        class="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
        :disabled="uploading"
      >
        {{ uploading ? 'Enviando…' : 'Enviar' }}
      </button>
    </form>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-if="success" class="text-sm text-emerald-700">{{ success }}</p>
    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>

    <ul v-else class="space-y-3">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="rounded-xl border border-gray-300 bg-white p-4"
      >
        <div class="flex flex-col gap-4 lg:flex-row">
          <div
            class="h-28 w-full shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-gray-100 lg:w-40"
          >
            <img
              v-if="item.kind === 'IMAGE'"
              :src="item.url"
              :alt="item.alt"
              class="h-full w-full object-cover"
            />
            <div
              v-else
              class="grid h-full place-items-center text-xs font-semibold uppercase text-gray-600"
            >
              {{ item.kind }}
            </div>
          </div>

          <div class="min-w-0 flex-1 space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="rounded-md px-2 py-0.5 text-[11px] font-bold uppercase"
                :class="
                  item.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                "
              >
                {{ item.active ? 'Ativo' : 'Inativo' }}
              </span>
              <span class="text-xs text-gray-600">ordem {{ item.sortOrder }}</span>
            </div>

            <div v-if="drafts[item.id]" class="grid gap-3 sm:grid-cols-2">
              <label class="block text-sm text-gray-600">
                Alt
                <input
                  v-model="drafts[item.id]!.alt"
                  class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
              <label class="block text-sm text-gray-600">
                Caption
                <input
                  v-model="drafts[item.id]!.caption"
                  class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </label>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-40"
                :disabled="index === 0"
                @click="move(index, -1)"
              >
                ↑ Subir
              </button>
              <button
                type="button"
                class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-40"
                :disabled="index === items.length - 1"
                @click="move(index, 1)"
              >
                ↓ Descer
              </button>
              <button
                type="button"
                class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100"
                :disabled="savingId === item.id"
                @click="onToggleActive(item)"
              >
                {{ item.active ? 'Desativar' : 'Ativar' }}
              </button>
              <button
                type="button"
                class="rounded-lg bg-primary-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                :disabled="savingId === item.id"
                @click="onSaveMeta(item)"
              >
                Salvar
              </button>
              <button
                type="button"
                class="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                :disabled="savingId === item.id"
                @click="onDelete(item)"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </li>
      <li
        v-if="!items.length"
        class="rounded-xl border border-gray-300 bg-white px-5 py-8 text-center text-sm text-gray-600"
      >
        Nenhum item na galeria.
      </li>
    </ul>
  </div>
</template>
