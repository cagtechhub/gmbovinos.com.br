/**
 * Impede rolagem do `body` enquanto `locked` for true (ex.: drawer aberto).
 */
export function useBodyScrollLock(locked: Ref<boolean>) {
  watch(
    locked,
    (isLocked) => {
      if (!import.meta.client) return
      document.body.style.overflow = isLocked ? 'hidden' : ''
    },
    { immediate: true }
  )

  onUnmounted(() => {
    if (import.meta.client) document.body.style.overflow = ''
  })
}
