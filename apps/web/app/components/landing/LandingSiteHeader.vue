<script setup lang="ts">
import { landingNavAllLinks, landingNavSectionLinks } from '~/constants/landingNavLinks'

withDefaults(
  defineProps<{
    /** `overlay`: barra sobre foto (hero); `solid`: cartão claro padrão. */
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
    v-if="variant === 'solid'"
    class="sticky top-4 inset-x-0 z-50 mx-auto w-[calc(100%-1.5rem)] max-w-7xl rounded-box border border-gray-300/70 bg-white/90 shadow-[0_8px_30px_-12px_rgb(30_58_138_/_0.2)] ring-1 ring-accent-500/10 backdrop-blur-md transition-all duration-300 sm:top-5 sm:w-[calc(100%-2rem)]"
  >
    <nav
      class="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-5"
      aria-label="Principal"
    >
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <a href="/" title="GM Bovinos — início">
          <nuxt-img src="/img/logo.png" alt="GM Bovinos" class="w-44 sm:w-48" width="192" height="74" />
        </a>
      </div>

      <div class="flex items-center justify-end gap-3">
        <LandingNavLinkList
          class="hidden md:flex"
          :links="landingNavAllLinks"
          theme="solid"
          orientation="horizontal"
        />
        <UiMenuIconButton
          :expanded="mobileMenuOpen"
          tone="light"
          :controls-id="mobilePanelId"
          hide-from="md"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </div>
    </nav>

    <UiMobileDrawer
      v-model="mobileMenuOpen"
      :panel-id="mobilePanelId"
      title="Menu"
      tone="light"
      hide-from="md"
      panel-class="border-gray-200 bg-white text-gray-900"
      backdrop-class="bg-black/40"
    >
      <LandingNavLinkList
        :links="landingNavAllLinks"
        theme="solid"
        orientation="vertical"
        @navigate="closeMobileMenu"
      />
    </UiMobileDrawer>
  </header>

  <header
    v-else
    class="pointer-events-none absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-gradient-to-b from-black/40 via-black/15 to-transparent"
  >
    <nav
      class="pointer-events-auto mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 lg:px-8"
      aria-label="Principal"
    >
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <a href="/" class="inline-flex" title="GM Bovinos — início">
          <nuxt-img
            src="/img/logo-mono.png"
            alt="GM Bovinos"
            width="192"
            height="74"
            class="h-12 w-auto max-w-[11rem] object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)] invert"
          />
        </a>
      </div>

      <div class="flex items-center justify-end gap-3 sm:gap-6">
        <UiMenuIconButton
          :expanded="mobileMenuOpen"
          tone="dark"
          :controls-id="mobilePanelId"
          hide-from="sm"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
        <LandingNavLinkList
          class="hidden sm:flex"
          :links="landingNavSectionLinks"
          theme="overlay"
          orientation="horizontal"
        />
        <a href="#cta" class="btn-landing btn-landing--accent hidden !min-w-0 !px-5 !py-2.5 sm:inline-flex">
          Contato
        </a>
      </div>
    </nav>

    <UiMobileDrawer
      v-model="mobileMenuOpen"
      :panel-id="mobilePanelId"
      title="Menu"
      tone="dark"
      hide-from="sm"
      panel-class="border-white/20 bg-gray-900/98 text-white backdrop-blur-md"
      backdrop-class="bg-black/55"
    >
      <LandingNavLinkList
        :links="landingNavAllLinks"
        theme="overlay"
        orientation="vertical"
        @navigate="closeMobileMenu"
      />
    </UiMobileDrawer>
  </header>
</template>
