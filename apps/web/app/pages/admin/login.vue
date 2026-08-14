<script setup lang="ts">
import { ArrowLeft, ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-vue-next'

definePageMeta({
  layout: false,
})

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const { login, isAuthenticated } = useAdminApi()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

if (import.meta.client && isAuthenticated.value) {
  await navigateTo('/admin')
}

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    await navigateTo('/admin')
  } catch (e: unknown) {
    const message =
      e && typeof e === 'object' && 'statusMessage' in e
        ? String((e as { statusMessage?: string }).statusMessage)
        : ''
    error.value = message || 'E-mail ou senha inválidos.'
    await useAdminApi().logout()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="border-b border-primary-700 bg-primary-700 text-white">
      <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:h-16">
        <NuxtLink
          to="/"
          class="focus-ring inline-flex items-center gap-2 rounded-control text-sm text-white/75 transition hover:text-white"
        >
          <ArrowLeft class="size-4" aria-hidden="true" />
          Voltar para o site
        </NuxtLink>
        <p class="text-sm font-medium text-white/80">Painel admin</p>
      </div>
    </header>

    <section class="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-2 md:items-start md:py-14">
      <aside class="rounded-box border border-gray-300 bg-white p-6 sm:p-8">
        <div class="flex items-center gap-3">
          <span class="portal-icon">
            <ShieldCheck class="size-5" aria-hidden="true" />
          </span>
          <div>
            <p class="font-semibold text-gray-900">GM Bovinos Admin</p>
            <p class="text-xs text-gray-600">Gestão do site, galeria e leads</p>
          </div>
        </div>
        <ul class="mt-8 space-y-4 text-sm text-gray-600">
          <li>Seções da landing e conteúdo institucional.</li>
          <li>Galeria de fotos e vídeos da operação.</li>
          <li>Pipeline de leads capturados pelo site.</li>
          <li>Acesso restrito às contas autorizadas no Supabase.</li>
        </ul>
      </aside>

      <div class="rounded-box border border-gray-300 bg-white p-6 sm:p-8">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="admin-eyebrow">Área restrita</p>
            <h1 class="mt-2 text-2xl font-semibold tracking-tight text-gray-900">Bem-vindo de volta</h1>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-gray-600">
              Entre com a conta autorizada para gerenciar o painel.
            </p>
          </div>
          <span class="hidden size-10 shrink-0 place-items-center rounded-full bg-primary-500/10 text-primary-700 sm:grid">
            <LockKeyhole class="size-5" aria-hidden="true" />
          </span>
        </div>

        <form class="mt-7 grid gap-4" @submit.prevent="onSubmit">
          <label class="text-sm font-medium text-gray-900" for="admin-email">
            E-mail
            <input
              id="admin-email"
              v-model="email"
              type="email"
              required
              autocomplete="username"
              class="focus-ring mt-1.5 w-full rounded-control border border-gray-300 px-3 py-2.5 font-normal"
              placeholder="voce@gmbovinos.com.br"
            />
          </label>
          <label class="text-sm font-medium text-gray-900" for="admin-password">
            Senha
            <input
              id="admin-password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              class="focus-ring mt-1.5 w-full rounded-control border border-gray-300 px-3 py-2.5 font-normal"
              placeholder="••••••••"
            />
          </label>
          <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
          <button type="submit" class="btn-primary focus-ring" :disabled="loading">
            {{ loading ? 'Entrando…' : 'Acessar painel' }}
            <ArrowRight class="ml-2 size-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
