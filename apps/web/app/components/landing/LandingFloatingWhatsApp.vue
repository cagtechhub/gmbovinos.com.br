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
    aria-label="Falar no WhatsApp com GM Bovinos"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-on-primary flex items-center justify-center shadow-[0_12px_32px_rgba(1,163,164,0.35)] hover:scale-105 active:scale-95 transition-all focus:outline-none"
    @click.prevent="$emit('openWhatsapp')"
  >
    <span class="material-symbols-outlined text-[28px]">chat</span>
  </a>
</template>
