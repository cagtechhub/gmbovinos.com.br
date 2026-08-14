<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Estado do menu (hambúrguer vs. X). */
    expanded?: boolean
    /** `light`: traço escuro (header claro). `dark`: traço claro (header sobre foto). */
    tone?: 'light' | 'dark'
    /** `id` do painel controlado (aria-controls). */
    controlsId: string
    /** Ocultar quando a navegação desktop estiver visível (`sm:` ou `md:`). */
    hideFrom?: 'sm' | 'md'
  }>(),
  { expanded: false, tone: 'light', hideFrom: 'md' }
)

defineEmits<{
  click: []
}>()

const strokeClass =
  'stroke-current ' + (props.tone === 'dark' ? 'text-white' : 'text-gray-800')

const hideUntilDesktop =
  props.hideFrom === 'sm' ? 'sm:hidden' : 'md:hidden'

const surfaceClass =
  props.tone === 'dark'
    ? 'border-white/35 bg-black/20 text-white hover:bg-white/10'
    : 'border-gray-300 bg-white/80 text-gray-800 hover:bg-white'
</script>

<template>
  <button
    type="button"
    class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-control border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    :class="[hideUntilDesktop, surfaceClass]"
    :aria-expanded="expanded"
    :aria-controls="controlsId"
    :aria-label="expanded ? 'Fechar menu' : 'Abrir menu'"
    @click="$emit('click')"
  >
    <svg
      class="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke-width="2"
      stroke-linecap="round"
      :class="strokeClass"
      aria-hidden="true"
    >
      <template v-if="!expanded">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </template>
      <template v-else>
        <path d="M6 6l12 12M18 6L6 18" />
      </template>
    </svg>
  </button>
</template>
