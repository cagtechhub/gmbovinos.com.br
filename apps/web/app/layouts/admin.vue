<script setup lang="ts">
const route = useRoute()
const { logout } = useAdminApi()

const links = [
  { to: '/admin', label: 'Visão geral', exact: true },
  { to: '/admin/conteudo', label: 'Conteúdo' },
  { to: '/admin/galeria', label: 'Galeria' },
  { to: '/admin/leads', label: 'Leads' },
  { to: '/admin/configuracoes', label: 'Configurações' },
]

const isActive = (to: string, exact = false) => {
  if (exact) return route.path === to
  return route.path === to || route.path.startsWith(`${to}/`)
}

const onLogout = async () => {
  await logout()
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <header class="border-b border-primary-700 bg-primary-700 text-white">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-accent-400">Painel</p>
          <h1 class="text-xl font-semibold text-white">GM Bovinos Admin</h1>
        </div>
        <nav class="flex flex-wrap items-center gap-2">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-1.5 text-sm transition"
            :class="
              isActive(link.to, link.exact)
                ? 'bg-white/15 text-accent-400'
                : 'text-white/75 hover:bg-white/10 hover:text-white'
            "
          >
            {{ link.label }}
          </NuxtLink>
          <button
            type="button"
            class="rounded-lg border border-white/25 px-3 py-1.5 text-sm text-white/85 hover:bg-white/10"
            @click="onLogout"
          >
            Sair
          </button>
        </nav>
      </div>
    </header>
    <main class="mx-auto max-w-7xl px-5 py-8">
      <slot />
    </main>
  </div>
</template>
