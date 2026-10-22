<script setup lang="ts">
import { landingNavSectionLinks } from '~/constants/landingNavLinks'

withDefaults(
  defineProps<{
    /** `overlay`: barra sobre foto (hero); `solid`: barra sólida com blur. */
    variant?: 'solid' | 'overlay'
  }>(),
  { variant: 'solid' }
)

const mobileMenuOpen = ref(false)
const mobilePanelId = 'site-header-mobile-menu'

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      variant === 'solid'
        ? 'bg-surface-container-low/95 backdrop-blur-xl border-b border-stroke shadow-[0_1px_8px_rgba(20,24,31,0.06)]'
        : 'bg-dark-canvas/40 backdrop-blur-sm border-b border-white/10'
    "
  >
    <div
      class="h-20 max-w-[1240px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md"
    >
      <div class="flex items-center gap-space-md">
        <a
          href="/"
          class="flex items-center gap-space-sm group focus:outline-none"
          title="GM Bovinos — início"
        >
          <nuxt-img
            src="/img/logo.png"
            alt="GM Bovinos"
            width="192"
            height="74"
            class="h-8 w-auto object-contain"
            :class="variant === 'overlay' ? 'brightness-0 invert' : ''"
          />
          <span
            class="font-headline text-title tracking-tight font-medium"
            :class="variant === 'overlay' ? 'text-dark-text-strong' : 'text-text-strong'"
          >
            GM BOVINOS
          </span>
        </a>
      </div>

      <nav class="hidden md:flex items-center gap-space-xl">
        <a
          v-for="link in landingNavSectionLinks"
          :key="link.href"
          :href="link.href"
          class="font-body text-body-sm transition-colors"
          :class="
            variant === 'overlay'
              ? 'text-dark-text-base hover:text-dark-text-strong'
              : 'text-text-base hover:text-text-strong'
          "
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-space-md">
        <a
          href="#cta"
          class="hidden sm:inline-flex items-center justify-center h-[52px] px-space-lg rounded bg-primary-container text-on-primary font-label text-label tracking-[0.18em] uppercase hover:bg-primary-hover transition-all shadow-[0_1px_2px_rgba(20,24,31,0.06)] focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2"
          :class="variant === 'overlay' ? 'border border-dark-stroke' : ''"
        >
          Contato
        </a>

        <UiMenuIconButton
          :expanded="mobileMenuOpen"
          :tone="variant === 'overlay' ? 'dark' : 'light'"
          :controls-id="mobilePanelId"
          hide-from="md"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </div>
    </div>

    <UiMobileDrawer
      v-model="mobileMenuOpen"
      :panel-id="mobilePanelId"
      title="Menu"
      tone="dark"
      hide-from="md"
      panel-class="border-dark-stroke bg-dark-surface text-on-secondary"
      backdrop-class="bg-dark-canvas/70 backdrop-blur-sm"
    >
      <nav class="flex flex-col gap-3 p-4">
        <a
          v-for="link in landingNavSectionLinks"
          :key="link.href"
          :href="link.href"
          class="font-body text-body text-dark-text-base hover:text-dark-text-strong py-2 border-b border-dark-stroke/50"
          @click="closeMobileMenu"
        >
          {{ link.label }}
        </a>
        <a
          href="#cta"
          class="mt-4 w-full h-[52px] rounded bg-primary-container hover:bg-primary-hover text-on-primary font-label text-label tracking-wider flex items-center justify-center gap-2"
          @click="closeMobileMenu"
        >
          <span>CONTATO</span>
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </nav>
    </UiMobileDrawer>
  </header>
</template>
