<script setup lang="ts">
defineProps<{
  whatsappLink: string
}>()

defineEmits<{
  openWhatsapp: []
}>()
</script>

<template>
  <a
    :href="whatsappLink"
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-pulse fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-600"
    @click.prevent="$emit('openWhatsapp')"
  >
    <IconsWhatsAppIcon class="h-4 w-4 shrink-0" />
    Falar no WhatsApp
  </a>
</template>
