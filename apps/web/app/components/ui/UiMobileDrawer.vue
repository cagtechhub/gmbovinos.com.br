<script setup lang="ts">
import { computed } from 'vue'

const open = defineModel<boolean>({ required: true })

const props = withDefaults(
  defineProps<{
    /** `id` do painel (aria-modal); use o mesmo em aria-controls do botão. */
    panelId: string
    title?: string
    panelClass?: string
    backdropClass?: string
    /** Cabeçalho interno e botão fechar (painel escuro vs. claro). */
    tone?: 'light' | 'dark'
    /** Só exibir abaixo de `sm` ou `md` (alinhado ao `hideFrom` do botão). */
    hideFrom?: 'sm' | 'md'
  }>(),
  {
    title: 'Menu',
    panelClass: '',
    backdropClass: 'bg-black/50',
    tone: 'light',
    hideFrom: 'md',
  }
)

useBodyScrollLock(open)

watchEffect((onCleanup) => {
  if (!import.meta.client || !open.value) return
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') open.value = false
  }
  window.addEventListener('keydown', onKey)
  onCleanup(() => window.removeEventListener('keydown', onKey))
})

function close() {
  open.value = false
}

const headerBarClass = computed(() =>
  props.tone === 'dark'
    ? 'border-white/15 text-white'
    : 'border-gray-200 text-gray-900'
)
const closeBtnClass = computed(() =>
  props.tone === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'
)

const visibilityClass = computed(() =>
  props.hideFrom === 'sm' ? 'sm:hidden' : 'md:hidden'
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100]"
        :class="visibilityClass"
        role="presentation"
      >
        <div
          :class="['absolute inset-0', backdropClass]"
          aria-hidden="true"
          @click="close"
        />
        <aside
          :id="panelId"
          class="drawer-panel absolute right-0 top-0 flex h-full max-h-[100dvh] w-[min(20rem,88vw)] flex-col border-l shadow-2xl"
          :class="panelClass"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
        >
          <div
            class="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3"
            :class="headerBarClass"
          >
            <span class="text-sm font-semibold tracking-wide">{{ title }}</span>
            <button
              type="button"
              class="rounded-control p-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              :class="closeBtnClass"
              aria-label="Fechar menu"
              @click="close"
            >
              ✕
            </button>
          </div>
          <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            <slot />
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-panel {
  animation: drawer-slide-in 0.28s ease-out both;
}

@keyframes drawer-slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
