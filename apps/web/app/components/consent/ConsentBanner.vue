<script setup lang="ts">
import { useConsentStore } from '~/stores/useConsentStore'

const consent = useConsentStore()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <section
        v-if="consent.shouldPrompt"
        class="pointer-events-auto fixed inset-x-0 bottom-0 z-[60] border-t border-gray-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-banner-title"
      >
        <div class="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div class="min-w-0 space-y-2 text-sm text-gray-700">
            <h2 id="consent-banner-title" class="text-base font-semibold text-primary-700">
              Cookies e privacidade
            </h2>
            <p class="leading-relaxed">
              Usamos cookies essenciais para o funcionamento do site. Com a sua autorização, também
              podemos usar Google Analytics e Meta Pixel para entender o uso da página e melhorar a
              experiência.
            </p>
          </div>
          <div class="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              class="rounded-control border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              @click="consent.setChoice('essential')"
            >
              Apenas essenciais
            </button>
            <button
              type="button"
              class="rounded-control bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              @click="consent.setChoice('all')"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>
