<script setup lang="ts">
import type { GalleryItem } from '@gmbovinos/shared'
import { Images, Star, Upload } from 'lucide-vue-next'

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
const uploadProgress = ref('')
const savingId = ref<string | null>(null)
const dragging = ref(false)

const uploadFiles = ref<File[]>([])
const uploadCaption = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

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

const addFiles = (list: FileList | File[]) => {
  const next = Array.from(list).filter(
    (file) => file.type.startsWith('image/') || file.type.startsWith('video/'),
  )
  uploadFiles.value = [...uploadFiles.value, ...next]
}

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) addFiles(input.files)
  input.value = ''
}

const onDrop = (event: DragEvent) => {
  dragging.value = false
  const list = event.dataTransfer?.files
  if (list?.length) addFiles(list)
}

const onUpload = async () => {
  if (!uploadFiles.value.length) {
    error.value = 'Selecione um ou mais arquivos.'
    return
  }
  uploading.value = true
  error.value = ''
  success.value = ''
  const total = uploadFiles.value.length
  let done = 0
  try {
    const chunkSize = 8
    for (let i = 0; i < uploadFiles.value.length; i += chunkSize) {
      const chunk = uploadFiles.value.slice(i, i + chunkSize)
      const form = new FormData()
      for (const file of chunk) form.append('files', file)
      if (uploadCaption.value.trim()) form.append('caption', uploadCaption.value.trim())
      await api.uploadGalleryItems(form)
      done += chunk.length
      uploadProgress.value = `${done} de ${total}`
    }
    uploadFiles.value = []
    uploadCaption.value = ''
    success.value = total === 1 ? 'Arquivo enviado.' : `${total} arquivos enviados.`
    await load()
  } catch {
    error.value = 'Falha no upload em massa.'
  } finally {
    uploading.value = false
    uploadProgress.value = ''
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

const onToggleHero = async (item: GalleryItem) => {
  if (item.kind !== 'IMAGE') {
    error.value = 'Só imagens podem ser destacadas no hero.'
    return
  }
  savingId.value = item.id
  error.value = ''
  success.value = ''
  try {
    const updated = await api.updateGalleryItem(item.id, { featuredHero: !item.featuredHero })
    items.value = items.value.map((row) =>
      row.id === updated.id ? updated : { ...row, featuredHero: false },
    )
    success.value = updated.featuredHero ? 'Imagem definida no hero.' : 'Destaque do hero removido.'
  } catch {
    error.value = 'Não foi possível destacar a imagem no hero.'
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
  <div class="portal-stack">
    <header class="portal-page-header">
      <div>
        <p class="admin-eyebrow">Mídia</p>
        <h2 class="portal-page-title">Galeria</h2>
        <p class="portal-page-desc">
          Upload em massa, destaque da imagem do hero, edição de alt/caption e reordenação.
        </p>
      </div>
    </header>

    <form class="portal-card space-y-4 hover:translate-y-0" @submit.prevent="onUpload">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Upload em massa</h3>
          <p class="mt-1 text-sm text-gray-600">Arraste várias imagens ou vídeos, ou selecione no computador.</p>
        </div>
        <span class="portal-icon">
          <Images class="size-4" aria-hidden="true" />
        </span>
      </div>

      <div
        class="rounded-box border-2 border-dashed px-4 py-10 text-center transition duration-300"
        :class="
          dragging
            ? 'border-accent-400 bg-accent-400/10'
            : 'border-gray-300 bg-gray-100/60 hover:border-accent-400/60'
        "
        @dragenter.prevent="dragging = true"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="onDrop"
      >
        <Upload class="mx-auto size-8 text-primary-700" aria-hidden="true" />
        <p class="mt-3 text-sm font-medium text-gray-900">Solte os arquivos aqui</p>
        <p class="mt-1 text-xs text-gray-600">PNG, JPG, WebP, MP4 e outros formatos de mídia</p>
        <button type="button" class="btn-secondary focus-ring mt-4" @click="fileInput?.click()">
          Escolher arquivos
        </button>
        <input
          ref="fileInput"
          type="file"
          accept="image/*,video/*"
          multiple
          class="hidden"
          @change="onFileChange"
        />
      </div>

      <p v-if="uploadFiles.length" class="text-sm text-gray-600">
        {{ uploadFiles.length }} arquivo{{ uploadFiles.length === 1 ? '' : 's' }} na fila:
        {{ uploadFiles.map((file) => file.name).join(', ') }}
      </p>

      <label class="block text-sm text-gray-600">
        Caption opcional (aplicada a este lote)
        <input
          v-model="uploadCaption"
          class="focus-ring mt-1 w-full rounded-control border border-gray-300 px-3 py-2"
        />
      </label>

      <button type="submit" class="btn-primary focus-ring" :disabled="uploading">
        {{ uploading ? `Enviando… ${uploadProgress}` : 'Enviar arquivos' }}
      </button>
    </form>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-if="success" class="text-sm text-emerald-700">{{ success }}</p>
    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>

    <ul v-else class="grid gap-4 lg:grid-cols-2">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        class="portal-card hover:translate-y-0"
      >
        <div class="flex flex-col gap-4 sm:flex-row">
          <div class="h-36 w-full shrink-0 overflow-hidden rounded-control bg-gray-100 shadow-card sm:w-44">
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
                :class="item.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'"
              >
                {{ item.active ? 'Ativo' : 'Inativo' }}
              </span>
              <span
                v-if="item.featuredHero"
                class="inline-flex items-center gap-1 rounded-md bg-accent-400/20 px-2 py-0.5 text-[11px] font-bold uppercase text-accent-700"
              >
                <Star class="size-3" aria-hidden="true" />
                Hero
              </span>
              <span class="text-xs text-gray-600">ordem {{ item.sortOrder }}</span>
            </div>

            <div v-if="drafts[item.id]" class="grid gap-3">
              <label class="block text-sm text-gray-600">
                Alt
                <input
                  v-model="drafts[item.id]!.alt"
                  class="focus-ring mt-1 w-full rounded-control border border-gray-300 px-3 py-2"
                />
              </label>
              <label class="block text-sm text-gray-600">
                Caption
                <input
                  v-model="drafts[item.id]!.caption"
                  class="focus-ring mt-1 w-full rounded-control border border-gray-300 px-3 py-2"
                />
              </label>
            </div>

            <div class="flex flex-wrap gap-2">
              <button
                type="button"
                class="btn-secondary focus-ring px-3 py-1.5 text-sm"
                :disabled="index === 0"
                @click="move(index, -1)"
              >
                ↑
              </button>
              <button
                type="button"
                class="btn-secondary focus-ring px-3 py-1.5 text-sm"
                :disabled="index === items.length - 1"
                @click="move(index, 1)"
              >
                ↓
              </button>
              <button
                type="button"
                class="btn-secondary focus-ring px-3 py-1.5 text-sm"
                :disabled="savingId === item.id || item.kind !== 'IMAGE'"
                @click="onToggleHero(item)"
              >
                {{ item.featuredHero ? 'Remover do hero' : 'Usar no hero' }}
              </button>
              <button
                type="button"
                class="btn-secondary focus-ring px-3 py-1.5 text-sm"
                :disabled="savingId === item.id"
                @click="onToggleActive(item)"
              >
                {{ item.active ? 'Desativar' : 'Ativar' }}
              </button>
              <button
                type="button"
                class="btn-primary focus-ring px-3 py-1.5 text-sm"
                :disabled="savingId === item.id"
                @click="onSaveMeta(item)"
              >
                Salvar
              </button>
              <button
                type="button"
                class="rounded-control border border-red-300 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50"
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
        class="portal-card px-5 py-8 text-center text-sm text-gray-600 hover:translate-y-0 lg:col-span-2"
      >
        Nenhum item na galeria.
      </li>
    </ul>
  </div>
</template>
