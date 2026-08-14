<script setup lang="ts">
import type {
  CreateLeadInput,
  Lead,
  LeadChannel,
  LeadStatus,
  UpdateLeadInput,
} from '@gmbovinos/shared'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const api = useAdminApi()
const leads = ref<Lead[]>([])
const error = ref('')
const loading = ref(true)
const creating = ref(false)
const saving = ref(false)
const showForm = ref(false)
const selectedLead = ref<Lead | null>(null)
const draggingId = ref<string | null>(null)
const dropTarget = ref<LeadStatus | null>(null)
const didDrag = ref(false)

const columns: { status: LeadStatus; label: string }[] = [
  { status: 'NEW', label: 'Novo' },
  { status: 'CONTACTED', label: 'Contatado' },
  { status: 'QUALIFIED', label: 'Qualificado' },
  { status: 'CONVERTED', label: 'Convertido' },
  { status: 'LOST', label: 'Perdido' },
]

const channelLabel: Record<LeadChannel, string> = {
  WEBSITE: 'Site',
  ADSENSE: 'AdSense',
  WHATSAPP: 'WhatsApp',
  INSTAGRAM: 'Instagram',
  FACEBOOK: 'Facebook',
  REFERRAL: 'Indicação',
  OTHER: 'Outro',
}

const channelTone: Record<LeadChannel, string> = {
  WEBSITE: 'bg-primary-500/15 text-primary-700',
  ADSENSE: 'bg-amber-100 text-amber-900',
  WHATSAPP: 'bg-emerald-100 text-emerald-900',
  INSTAGRAM: 'bg-rose-100 text-rose-900',
  FACEBOOK: 'bg-sky-100 text-sky-900',
  REFERRAL: 'bg-accent-400/20 text-accent-600',
  OTHER: 'bg-gray-100 text-gray-600',
}

const statusLabel: Record<LeadStatus, string> = {
  NEW: 'Novo',
  CONTACTED: 'Contatado',
  QUALIFIED: 'Qualificado',
  CONVERTED: 'Convertido',
  LOST: 'Perdido',
}

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  notes: '',
  channel: 'WHATSAPP' as LeadChannel,
  status: 'NEW' as LeadStatus,
})

const detail = reactive({
  fullName: '',
  email: '',
  phone: '',
  notes: '',
  channel: 'OTHER' as LeadChannel,
  status: 'NEW' as LeadStatus,
})

const leadsByStatus = computed(() => {
  const map = Object.fromEntries(columns.map((col) => [col.status, [] as Lead[]])) as Record<
    LeadStatus,
    Lead[]
  >
  for (const lead of leads.value) {
    map[lead.status]?.push(lead)
  }
  return map
})

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    leads.value = await api.listLeads()
  } catch {
    error.value = 'Não foi possível carregar os leads.'
  } finally {
    loading.value = false
  }
}

const formatDate = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value)
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const resetCreateForm = () => {
  form.fullName = ''
  form.email = ''
  form.phone = ''
  form.notes = ''
  form.channel = 'WHATSAPP'
  form.status = 'NEW'
}

const onCreate = async () => {
  creating.value = true
  error.value = ''
  try {
    const payload: CreateLeadInput = {
      fullName: form.fullName,
      email: form.email || null,
      phone: form.phone || null,
      notes: form.notes || null,
      channel: form.channel,
      status: form.status,
      contactId: null,
    }
    await api.createLead(payload)
    showForm.value = false
    resetCreateForm()
    await load()
  } catch {
    error.value = 'Falha ao criar lead.'
  } finally {
    creating.value = false
  }
}

const openLead = (lead: Lead) => {
  if (didDrag.value) {
    didDrag.value = false
    return
  }
  selectedLead.value = lead
  detail.fullName = lead.fullName
  detail.email = lead.email || ''
  detail.phone = lead.phone || ''
  detail.notes = lead.notes || ''
  detail.channel = lead.channel
  detail.status = lead.status
}

const closeLead = () => {
  selectedLead.value = null
}

const onSaveDetail = async () => {
  if (!selectedLead.value) return
  saving.value = true
  error.value = ''
  try {
    const payload: UpdateLeadInput = {
      fullName: detail.fullName,
      email: detail.email || null,
      phone: detail.phone || null,
      notes: detail.notes || null,
      channel: detail.channel,
      status: detail.status,
    }
    const updated = await api.updateLead(selectedLead.value.id, payload)
    const idx = leads.value.findIndex((item) => item.id === updated.id)
    if (idx >= 0) leads.value[idx] = updated
    else await load()
    selectedLead.value = updated
  } catch {
    error.value = 'Falha ao salvar lead.'
  } finally {
    saving.value = false
  }
}

const moveLead = async (leadId: string, status: LeadStatus) => {
  const lead = leads.value.find((item) => item.id === leadId)
  if (!lead || lead.status === status) return

  const previous = lead.status
  lead.status = status
  try {
    const updated = await api.updateLead(leadId, { status })
    const idx = leads.value.findIndex((item) => item.id === updated.id)
    if (idx >= 0) leads.value[idx] = updated
  } catch {
    lead.status = previous
    error.value = 'Não foi possível mover o lead.'
  }
}

const onDragStart = (lead: Lead, event: DragEvent) => {
  didDrag.value = true
  draggingId.value = lead.id
  event.dataTransfer?.setData('text/plain', lead.id)
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move'
}

const onDragEnd = () => {
  draggingId.value = null
  dropTarget.value = null
  requestAnimationFrame(() => {
    didDrag.value = false
  })
}

const onDragOver = (status: LeadStatus, event: DragEvent) => {
  event.preventDefault()
  dropTarget.value = status
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
}

const onDrop = async (status: LeadStatus, event: DragEvent) => {
  event.preventDefault()
  const leadId = event.dataTransfer?.getData('text/plain') || draggingId.value
  dropTarget.value = null
  draggingId.value = null
  if (!leadId) return
  await moveLead(leadId, status)
}

const onDelete = async (lead: Lead) => {
  if (!confirm(`Excluir lead de ${lead.fullName}?`)) return
  await api.removeLead(lead.id)
  if (selectedLead.value?.id === lead.id) closeLead()
  await load()
}

const closeCreate = () => {
  showForm.value = false
}

const openCreate = (status: LeadStatus = 'NEW') => {
  form.status = status
  showForm.value = true
}

const onBackdropClick = (event: MouseEvent) => {
  if (event.target !== event.currentTarget) return
  if (selectedLead.value) closeLead()
  else if (showForm.value) closeCreate()
}

const onEscape = (event: KeyboardEvent) => {
  if (event.key !== 'Escape') return
  if (selectedLead.value) closeLead()
  else if (showForm.value) closeCreate()
}

const quickAdd = (status: LeadStatus) => {
  openCreate(status)
}

onMounted(() => window.addEventListener('keydown', onEscape))
onUnmounted(() => window.removeEventListener('keydown', onEscape))

await load()
</script>

<template>
  <div class="portal-stack">
    <header class="portal-page-header">
      <div>
        <p class="admin-eyebrow">Pipeline</p>
        <h2 class="portal-page-title">Leads</h2>
        <p class="portal-page-desc">Quadro estilo pipeline — arraste os cartões entre as listas.</p>
      </div>
      <button type="button" class="btn-primary focus-ring" @click="openCreate('NEW')">Novo lead</button>
    </header>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-else-if="loading" class="text-sm text-gray-600">Carregando…</p>

    <div v-else class="overflow-x-auto pb-2">
      <div class="flex w-max items-start gap-3">
        <section
          v-for="column in columns"
          :key="column.status"
          class="flex max-h-[70vh] w-[272px] shrink-0 flex-col rounded-xl border border-gray-300/80 bg-white shadow-card transition duration-300"
          :class="dropTarget === column.status ? 'outline outline-2 outline-primary-500' : ''"
          @dragover="onDragOver(column.status, $event)"
          @drop="onDrop(column.status, $event)"
        >
          <header class="flex items-center justify-between gap-2 px-3 pb-1 pt-3">
            <h3 class="truncate text-sm font-semibold tracking-tight text-gray-900">
              {{ column.label }}
            </h3>
            <span
              class="grid min-w-6 place-items-center rounded-full bg-gray-100 px-1.5 py-0.5 text-[11px] font-semibold text-gray-600 ring-1 ring-gray-300"
            >
              {{ leadsByStatus[column.status].length }}
            </span>
          </header>

          <div class="flex-1 space-y-2 overflow-y-auto px-2 pb-1 pt-1">
            <article
              v-for="lead in leadsByStatus[column.status]"
              :key="lead.id"
              draggable="true"
              class="group cursor-pointer rounded-lg border border-gray-300/80 bg-white p-3 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent-400/50 hover:shadow-soft active:cursor-grabbing"
              :class="draggingId === lead.id ? 'rotate-1 opacity-60' : ''"
              @dragstart="onDragStart(lead, $event)"
              @dragend="onDragEnd"
              @click="openLead(lead)"
            >
              <div class="mb-2 flex flex-wrap gap-1">
                <span
                  class="inline-block rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  :class="channelTone[lead.channel]"
                >
                  {{ channelLabel[lead.channel] }}
                </span>
              </div>

              <p class="text-sm font-semibold leading-snug text-gray-900">
                {{ lead.fullName }}
              </p>

              <p v-if="lead.notes" class="mt-1 line-clamp-2 text-xs leading-4 text-gray-600">
                {{ lead.notes }}
              </p>

              <div class="mt-2.5 flex items-center justify-between gap-2">
                <p
                  v-if="lead.phone || lead.email"
                  class="min-w-0 flex-1 truncate text-[11px] text-gray-600"
                >
                  {{ lead.phone || lead.email }}
                </p>
                <span
                  class="grid size-7 shrink-0 place-items-center rounded-full bg-primary-700 text-[10px] font-bold text-white"
                  :title="lead.fullName"
                >
                  {{ initials(lead.fullName) }}
                </span>
              </div>
            </article>
          </div>

          <button
            type="button"
            class="mx-2 mb-2 mt-1 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            @click="quickAdd(column.status)"
          >
            <span class="text-lg leading-none">+</span>
            Adicionar um cartão
          </button>
        </section>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showForm"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-10 sm:pt-16"
        @click="onBackdropClick"
      >
        <div
          class="mb-10 w-full max-w-lg overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Novo lead"
        >
          <div class="flex items-center justify-between border-b border-gray-300 px-5 py-4">
            <h3 class="text-xl font-semibold text-gray-900">Novo lead</h3>
            <button
              type="button"
              class="grid size-8 place-items-center rounded-full text-xl text-gray-600 hover:bg-gray-100"
              aria-label="Fechar"
              @click="closeCreate"
            >
              ×
            </button>
          </div>

          <form class="grid gap-4 p-5 sm:grid-cols-2" @submit.prevent="onCreate">
            <label class="block text-sm text-gray-600 sm:col-span-2">
              Nome
              <input
                v-model="form.fullName"
                required
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <label class="block text-sm text-gray-600">
              E-mail
              <input
                v-model="form.email"
                type="email"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <label class="block text-sm text-gray-600">
              Telefone
              <input
                v-model="form.phone"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <label class="block text-sm text-gray-600">
              Canal
              <select
                v-model="form.channel"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              >
                <option v-for="(label, value) in channelLabel" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
            </label>
            <label class="block text-sm text-gray-600">
              Lista inicial
              <select
                v-model="form.status"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              >
                <option v-for="(label, value) in statusLabel" :key="value" :value="value">
                  {{ label }}
                </option>
              </select>
            </label>
            <label class="block text-sm text-gray-600 sm:col-span-2">
              Observações
              <textarea
                v-model="form.notes"
                rows="3"
                class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
              />
            </label>
            <div class="flex justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
                @click="closeCreate"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="rounded-lg bg-primary-500 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                :disabled="creating"
              >
                {{ creating ? 'Salvando…' : 'Criar lead' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <Teleport to="body">
      <div
        v-if="selectedLead"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-10 sm:pt-16"
        @click="onBackdropClick"
      >
        <div
          class="mb-10 w-full max-w-[768px] overflow-hidden rounded-xl border border-gray-300 bg-gray-100 shadow-xl"
          role="dialog"
          aria-modal="true"
          :aria-label="`Lead ${selectedLead.fullName}`"
        >
          <div class="border-b border-gray-300 bg-white px-5 py-4">
            <div class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <div class="mb-2 flex flex-wrap gap-1">
                  <span
                    class="inline-block rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase"
                    :class="channelTone[selectedLead.channel]"
                  >
                    {{ channelLabel[selectedLead.channel] }}
                  </span>
                  <span
                    class="inline-block rounded-md bg-primary-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-700"
                  >
                    {{ statusLabel[selectedLead.status] }}
                  </span>
                </div>
                <h3 class="text-2xl font-semibold leading-tight text-gray-900">
                  {{ selectedLead.fullName }}
                </h3>
                <p class="mt-1 text-xs text-gray-600">
                  na lista
                  <strong class="text-gray-900">{{ statusLabel[selectedLead.status] }}</strong>
                  · criado {{ formatDate(selectedLead.createdAt) }}
                </p>
              </div>
              <button
                type="button"
                class="grid size-8 shrink-0 place-items-center rounded-full text-xl text-gray-600 hover:bg-gray-100"
                aria-label="Fechar"
                @click="closeLead"
              >
                ×
              </button>
            </div>
          </div>

          <form class="grid gap-4 p-5 sm:grid-cols-[1fr_200px]" @submit.prevent="onSaveDetail">
            <div class="space-y-4">
              <section class="rounded-xl border border-gray-300 bg-white p-4">
                <h4 class="mb-3 text-xs font-bold uppercase tracking-wide text-gray-600">
                  Descrição / observações
                </h4>
                <textarea
                  v-model="detail.notes"
                  rows="5"
                  placeholder="Adicione uma descrição mais detalhada…"
                  class="w-full rounded-lg border-0 bg-gray-100 px-3 py-2 text-sm text-gray-900 outline-none focus:bg-white focus:outline focus:outline-2 focus:outline-primary-500"
                />
              </section>

              <section class="rounded-xl border border-gray-300 bg-white p-4">
                <h4 class="mb-3 text-xs font-bold uppercase tracking-wide text-gray-600">
                  Informações do contato
                </h4>
                <div class="grid gap-3 sm:grid-cols-2">
                  <label class="block text-sm text-gray-600">
                    Nome
                    <input
                      v-model="detail.fullName"
                      required
                      class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                    />
                  </label>
                  <label class="block text-sm text-gray-600">
                    Telefone
                    <input
                      v-model="detail.phone"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                    />
                  </label>
                  <label class="block text-sm text-gray-600 sm:col-span-2">
                    E-mail
                    <input
                      v-model="detail.email"
                      type="email"
                      class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                    />
                  </label>
                </div>
                <p
                  v-if="selectedLead.contactId"
                  class="mt-3 rounded-lg bg-primary-500/10 px-3 py-2 text-xs text-primary-700"
                >
                  Originado pelo formulário do site.
                </p>
              </section>
            </div>

            <aside class="space-y-3">
              <div>
                <p class="mb-1 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                  Ações
                </p>
                <label class="mb-2 block text-xs text-gray-600">
                  Mover para
                  <select
                    v-model="detail.status"
                    class="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm"
                  >
                    <option v-for="(label, value) in statusLabel" :key="value" :value="value">
                      {{ label }}
                    </option>
                  </select>
                </label>
                <label class="mb-2 block text-xs text-gray-600">
                  Canal
                  <select
                    v-model="detail.channel"
                    class="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm"
                  >
                    <option v-for="(label, value) in channelLabel" :key="value" :value="value">
                      {{ label }}
                    </option>
                  </select>
                </label>
                <button
                  type="submit"
                  class="mt-2 w-full rounded-lg bg-primary-500 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60"
                  :disabled="saving"
                >
                  {{ saving ? 'Salvando…' : 'Salvar' }}
                </button>
                <button
                  type="button"
                  class="mt-2 w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  @click="onDelete(selectedLead)"
                >
                  Excluir
                </button>
              </div>
              <p class="text-[11px] leading-4 text-gray-600">
                Atualizado {{ formatDate(selectedLead.updatedAt) }}
              </p>
            </aside>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>
