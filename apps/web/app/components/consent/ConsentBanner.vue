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
        class="pointer-events-auto fixed inset-x-0 bottom-0 z-[60] border-t border-stroke bg-surface/98 p-4 shadow-raised backdrop-blur-md sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-banner-title"
      >
        <div
          class="mx-auto flex max-w-[1240px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 px-margin-mobile md:px-margin"
        >
          <div class="min-w-0 space-y-1 text-sm text-text-base font-body">
            <h2
              id="consent-banner-title"
              class="text-base font-semibold text-text-strong font-title"
            >
              Cookies e privacidade
            </h2>
            <p class="leading-relaxed">
              Usamos cookies essenciais para o funcionamento do site. Com a sua autorização, também
              podemos usar métricas para entender o tráfego e aprimorar o atendimento.
            </p>
          </div>
          <div class="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              class="h-10 px-4 rounded border border-stroke-strong bg-surface text-sm font-medium text-text-strong shadow-sm transition hover:bg-surface-muted cursor-pointer"
              @click="consent.setChoice('essential')"
            >
              Apenas essenciais
            </button>
            <button
              type="button"
              class="h-10 px-4 rounded bg-primary-container text-sm font-medium text-on-primary shadow-sm transition hover:bg-primary-hover cursor-pointer"
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
