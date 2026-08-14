<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ConsentBanner from '~/components/consent/ConsentBanner.vue'
import { useConsentStore } from '~/stores/useConsentStore'
import { useSiteStore } from '~/stores/useSiteStore'

const store = useSiteStore()
const consent = useConsentStore()
const { whatsappLink } = storeToRefs(store)
</script>

<template>
  <div class="page-atmosphere min-h-screen font-sans text-gray-900 antialiased">
    <ConsentBanner />
    <NuxtRouteAnnouncer />

    <LandingFloatingWhatsApp
      :whatsapp-link="whatsappLink"
      @open-whatsapp="store.openWhatsApp('floating_cta')"
    />

    <main
      class="relative flex w-full flex-col gap-0 px-6 pb-0 lg:px-10 animate-fade-up motion-reduce:animate-none"
      :class="consent.shouldPrompt ? 'pb-44 sm:pb-40' : ''"
    >
      <slot />
    </main>

    <LandingPreFooterHero />

    <LandingMinimalFooter />
  </div>
</template>
