import { useConsentStore } from '~/stores/useConsentStore'

export default defineNuxtPlugin(() => {
  useConsentStore().hydrateFromStorage()
})