<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const headerVariant = ref<'solid' | 'overlay'>('overlay')

const HEADER_SCROLL_THRESHOLD_PX = 100

const syncHeaderVariant = () => {
  headerVariant.value = window.scrollY < HEADER_SCROLL_THRESHOLD_PX ? 'overlay' : 'solid'
}

onMounted(() => {
  syncHeaderVariant()
  window.addEventListener('scroll', syncHeaderVariant, { passive: true })

  const hash = window.location.hash.replace(/^#/, '')
  if (hash) {
    nextTick(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', syncHeaderVariant)
})
</script>

<template>
  <div class="w-full">
    <!-- LocalBusiness / Organization: JSON-LD em useSiteSeoHead (evita duplicar com microdados). -->

    <!-- Header fora do wrapper só do hero: `sticky` precisa de um ancestral tão alto quanto a rolagem da página. -->
    <LandingSiteHeader :variant="headerVariant" />
    <div class="relative isolate w-full">
      <LandingHeroSection />
    </div>
    <!-- <LandingSlidesSection /> -->
    <LandingComoFuncionaSection />
    <LandingBusinessScopeSection />
    <LandingSeoContentSection />
    <LandingGallerySection />
    <LandingAboutSection />
    <LandingCtaSection />
  </div>
</template>
