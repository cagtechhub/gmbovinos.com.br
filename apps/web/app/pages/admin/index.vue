<script setup lang="ts">
import type { AdminDashboardStats } from '~/composables/useAdminApi'
import { FileText, FolderKanban, Images, RefreshCw } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

const api = useAdminApi()
const error = ref('')
const loading = ref(true)
const stats = ref<AdminDashboardStats>({
  leadsNew: 0,
  leadsTotal: 0,
  galleryCount: 0,
  sectionsCount: 0,
})

const cards = computed(() => [
  {
    label: 'Leads novos',
    value: stats.value.leadsNew,
    helper: 'Aguardando primeiro contato',
    icon: FolderKanban,
    to: '/admin/leads',
  },
  {
    label: 'Leads totais',
    value: stats.value.leadsTotal,
    helper: 'Todos os canais',
    icon: FolderKanban,
    to: '/admin/leads',
  },
  {
    label: 'Itens na galeria',
    value: stats.value.galleryCount,
    helper: 'Fotos e vídeos',
    icon: Images,
    to: '/admin/galeria',
  },
  {
    label: 'Seções de conteúdo',
    value: stats.value.sectionsCount,
    helper: 'Blocos da landing',
    icon: FileText,
    to: '/admin/conteudo',
  },
])

const loadDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    stats.value = await api.getDashboard()
  } catch (cause: unknown) {
    const statusMessage =
      cause && typeof cause === 'object' && 'statusMessage' in cause
        ? String((cause as { statusMessage?: string }).statusMessage)
        : ''
    const statusCode =
      cause && typeof cause === 'object' && 'statusCode' in cause
        ? Number((cause as { statusCode?: number }).statusCode)
        : 0
    if (statusCode === 403) {
      error.value =
        'Usuário sem permissão de admin. Inclua o e-mail em ADMIN_ALLOWED_EMAILS (apps/backend/.env) ou deixe a variável vazia em desenvolvimento.'
    } else if (statusCode === 401) {
      error.value = 'Sessão expirada. Faça login novamente.'
      await navigateTo('/admin/login')
    } else {
      error.value = statusMessage || 'Não foi possível carregar o dashboard.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void loadDashboard()
})
</script>

<template>
  <div class="portal-stack">
    <header class="portal-page-header">
      <div>
        <p class="admin-eyebrow">Painel</p>
        <h2 class="portal-page-title">Visão geral</h2>
        <p class="portal-page-desc">Resumo do conteúdo, galeria e leads captados.</p>
      </div>
      <button type="button" class="btn-secondary focus-ring" @click="loadDashboard">
        <RefreshCw class="mr-2 size-4" aria-hidden="true" />
        Atualizar
      </button>
    </header>

    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>
    <div v-else-if="error" class="space-y-3">
      <p class="text-sm text-red-600">{{ error }}</p>
      <button type="button" class="btn-secondary focus-ring" @click="loadDashboard">Tentar novamente</button>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <NuxtLink v-for="card in cards" :key="card.label" :to="card.to" class="portal-card transition hover:border-accent-400/50">
        <div class="flex items-start justify-between gap-3">
          <p class="text-sm text-gray-600">{{ card.label }}</p>
          <span class="portal-icon">
            <component :is="card.icon" class="size-4" aria-hidden="true" />
          </span>
        </div>
        <p class="mt-5 text-2xl font-semibold tabular-nums text-primary-700">{{ card.value }}</p>
        <p class="mt-1 text-xs text-gray-600">{{ card.helper }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
