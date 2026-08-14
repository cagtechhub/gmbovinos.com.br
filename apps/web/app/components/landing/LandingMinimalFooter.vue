<script setup lang="ts">
import { formatPhone } from '~/utils/formatPhone'

const config = useRuntimeConfig()

const address = computed(() => String(config.public.businessAddress || '').trim())
const businessPhone = computed(() => String(config.public.businessPhone || '').replace(/\D/g, ''))
const whatsappNumber = computed(() => String(config.public.whatsappNumber || '').replace(/\D/g, ''))

const telHref = computed(() =>
  businessPhone.value ? `tel:${formatPhone(businessPhone.value, 'international')}` : ''
)
</script>

<template>
  <footer class="relative bg-gray-900 py-12 text-white md:py-14">
    <div class="section-accent-rule" aria-hidden="true" />
    <div
      class="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-5 px-10 text-center lg:px-10"
    >
      <p class="text-lg font-semibold tracking-wide">GM Bovinos © 2026</p>

      <address v-if="address || telHref" class="not-italic text-sm leading-relaxed text-gray-300">
        <span v-if="address" class="block font-medium text-white/90">{{ address }}</span>

        <div class="mt-2 flex items-center justify-center gap-2">
          <a
            v-if="telHref"
            :href="telHref"
            class="inline-block font-medium text-accent-300 underline-offset-2 hover:text-accent-400 hover:underline"
            title="Ligar para a GM Bovinos"
          >
            {{ formatPhone(businessPhone, 'local') }}
          </a>
          <span aria-hidden="true" class="text-white/30">·</span>
          <a
            v-if="whatsappNumber"
            :href="`https://wa.me/${whatsappNumber}`"
            class="inline-block font-medium text-accent-300 underline-offset-2 hover:text-accent-400 hover:underline"
            title="Enviar mensagem no WhatsApp"
          >
            {{ formatPhone(whatsappNumber, 'local') }}
          </a>
        </div>
      </address>
      <nav
        class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-400"
        aria-label="Links internos"
      >
        <a href="/#como-funciona" class="transition hover:text-accent-300">Como funciona</a>
        <span aria-hidden="true" class="text-white/20">·</span>
        <a href="/#atuacao" class="transition hover:text-accent-300">Atuação</a>
        <span aria-hidden="true" class="text-white/20">·</span>
        <a href="/#gallery" class="transition hover:text-accent-300">Galeria</a>
        <span aria-hidden="true" class="text-white/20">·</span>
        <a href="/#sobre-nos" class="transition hover:text-accent-300">Sobre nós</a>
        <span aria-hidden="true" class="text-white/20">·</span>
        <a href="/#cta" class="transition hover:text-accent-300">Contato</a>
      </nav>
      <p class="text-xs text-gray-500">Todos os direitos reservados</p>
      <p class="text-xs text-gray-500">
        Direitos autorais
        <a
          href="http://cagtech.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-accent-300 underline-offset-2 transition hover:text-accent-400 hover:underline"
          title="Visitar o site da CAG TECH"
        >
          CAG TECH
        </a>
      </p>
    </div>
  </footer>
</template>
