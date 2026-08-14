<script setup lang="ts">
import type { Component } from 'vue'
import {
  ArrowLeft,
  FileText,
  FolderKanban,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from 'lucide-vue-next'

const route = useRoute()
const config = useRuntimeConfig()
const { logout } = useAdminApi()

const mobileNavOpen = ref(false)
const adminEmail = ref('')

const siteName = computed(() => String(config.public.siteName || 'GM Bovinos').trim() || 'GM Bovinos')

const links: Array<{
  to: string
  label: string
  description: string
  icon: Component
  exact?: boolean
}> = [
  {
    to: '/admin',
    label: 'Visão geral',
    description: 'Resumo de conteúdo, galeria e leads.',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    to: '/admin/conteudo',
    label: 'Conteúdo',
    description: 'Seções da landing.',
    icon: FileText,
  },
  {
    to: '/admin/galeria',
    label: 'Galeria',
    description: 'Fotos e vídeos do site.',
    icon: Images,
  },
  {
    to: '/admin/leads',
    label: 'Leads',
    description: 'Pipeline de contatos.',
    icon: FolderKanban,
  },
  {
    to: '/admin/configuracoes',
    label: 'Configurações',
    description: 'SEO, contato e analytics.',
    icon: Settings,
  },
]

const isActive = (to: string, exact = false) => {
  if (exact) return route.path === to
  return route.path === to || route.path.startsWith(`${to}/`)
}

const activeItem = computed(() => links.find((link) => isActive(link.to, link.exact)) ?? links[0]!)

const adminInitials = computed(() => {
  const local = adminEmail.value.split('@')[0]?.trim() || ''
  if (!local) return 'AD'
  const parts = local.split(/[._-]+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase()
  }
  return local.slice(0, 2).toUpperCase()
})

const onLogout = async () => {
  mobileNavOpen.value = false
  await logout()
  await navigateTo('/admin/login')
}

watch(
  () => route.path,
  () => {
    mobileNavOpen.value = false
  },
)

onMounted(async () => {
  try {
    const { data } = await useSupabaseClient().auth.getUser()
    adminEmail.value = data.user?.email || ''
  } catch {
    adminEmail.value = ''
  }
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900">
    <button
      v-if="mobileNavOpen"
      class="fixed inset-0 z-40 bg-primary-700/50 lg:hidden"
      type="button"
      aria-label="Fechar menu"
      @click="mobileNavOpen = false"
    />

    <aside
      class="fixed inset-y-0 left-0 z-50 flex h-screen w-[16rem] shrink-0 flex-col border-r border-white/10 bg-primary-700 text-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-0 lg:translate-x-0"
      :class="mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      aria-label="Menu de navegação"
    >
      <div class="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4 lg:h-20 lg:px-5">
        <NuxtLink to="/" class="focus-ring min-w-0">
          <img src="/img/logo-mono.png" alt="GM Bovinos" class="h-8 w-auto invert" width="140" height="32" />
        </NuxtLink>
        <button
          class="focus-ring grid size-9 place-items-center rounded-control text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          type="button"
          aria-label="Fechar menu"
          @click="mobileNavOpen = false"
        >
          <X class="size-5" aria-hidden="true" />
        </button>
      </div>

      <div class="shrink-0 border-b border-white/10 px-3 py-4 lg:px-4">
        <p class="px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-300">Painel admin</p>
        <div class="mt-2 flex w-full items-center gap-3 rounded-control bg-white/5 px-3 py-2.5 text-left text-sm">
          <span class="grid size-8 shrink-0 place-items-center rounded-full bg-accent-500 text-xs font-bold text-primary-700">
            GM
          </span>
          <span class="min-w-0">
            <span class="block truncate font-medium">{{ siteName }}</span>
            <span class="block truncate text-xs text-white/45">Gestão do site</span>
          </span>
        </div>
      </div>

      <nav class="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <p class="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">Menu</p>
        <ul class="space-y-1">
          <li v-for="link in links" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="focus-ring flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm transition"
              :class="
                isActive(link.to, link.exact)
                  ? 'bg-white font-semibold text-primary-700'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              "
              :aria-current="isActive(link.to, link.exact) ? 'page' : undefined"
            >
              <component :is="link.icon" class="size-4 shrink-0" aria-hidden="true" />
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="shrink-0 space-y-1 border-t border-white/10 p-3">
        <NuxtLink
          to="/"
          class="focus-ring flex items-center gap-3 rounded-control px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft class="size-4" aria-hidden="true" />
          Voltar ao site
        </NuxtLink>
        <button
          type="button"
          class="focus-ring flex w-full items-center gap-3 rounded-control px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
          @click="onLogout"
        >
          <LogOut class="size-4" aria-hidden="true" />
          Sair do painel
        </button>
      </div>
    </aside>

    <div class="flex min-h-screen min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-30 border-b border-gray-300 bg-white/95 backdrop-blur">
        <div class="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
          <div class="flex min-w-0 items-center gap-3">
            <button
              class="focus-ring grid size-10 shrink-0 place-items-center rounded-control border border-gray-300 text-primary-700 lg:hidden"
              type="button"
              :aria-label="mobileNavOpen ? 'Fechar menu' : 'Abrir menu'"
              :aria-expanded="mobileNavOpen"
              @click="mobileNavOpen = !mobileNavOpen"
            >
              <Menu class="size-5" aria-hidden="true" />
            </button>
            <div class="min-w-0">
              <p class="truncate text-xs text-gray-600">Painel admin</p>
              <h1 class="truncate text-base font-semibold text-gray-900 lg:text-lg">
                {{ activeItem.label }}
              </h1>
            </div>
          </div>

          <div class="flex shrink-0 items-center gap-2 sm:gap-4">
            <div class="hidden h-8 w-px bg-gray-300 sm:block" />
            <div class="flex items-center gap-2.5">
              <span class="grid size-9 place-items-center rounded-full bg-primary-700 text-xs font-bold text-white">
                {{ adminInitials }}
              </span>
              <div class="hidden sm:block">
                <p class="max-w-[12rem] truncate text-sm font-semibold text-gray-900">
                  {{ adminEmail || 'Administrador' }}
                </p>
                <p class="text-xs text-gray-600">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <slot />
      </main>
    </div>
  </div>
</template>
