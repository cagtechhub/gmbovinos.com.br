<script setup lang="ts">
import type { AdminDashboardStats } from '~/composables/useAdminApi'

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
  { label: 'Leads novos', value: stats.value.leadsNew },
  { label: 'Leads totais', value: stats.value.leadsTotal },
  { label: 'Itens na galeria', value: stats.value.galleryCount },
  { label: 'Seções de conteúdo', value: stats.value.sectionsCount },
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
  <div class="space-y-8">
    <div>
      <h2 class="text-3xl font-semibold text-gray-900">Visão geral</h2>
      <p class="mt-1 text-sm text-gray-600">Resumo do conteúdo, galeria e leads captados.</p>
    </div>

    <p v-if="loading" class="text-sm text-gray-600">Carregando…</p>
    <div v-else-if="error" class="space-y-3">
      <p class="text-sm text-red-600">{{ error }}</p>
      <button
        type="button"
        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
        @click="loadDashboard"
      >
        Tentar novamente
      </button>
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="card in cards"
        :key="card.label"
        class="rounded-xl border border-gray-300 bg-white p-5"
      >
        <p class="text-xs uppercase tracking-wider text-gray-600">{{ card.label }}</p>
        <p class="mt-2 text-3xl font-semibold text-primary-700">{{ card.value }}</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-3">
      <NuxtLink
        to="/admin/leads"
        class="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Ver leads
      </NuxtLink>
      <NuxtLink
        to="/admin/conteudo"
        class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
      >
        Editar conteúdo
      </NuxtLink>
      <NuxtLink
        to="/admin/galeria"
        class="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100"
      >
        Gerenciar galeria
      </NuxtLink>
    </div>
  </div>
</template>
