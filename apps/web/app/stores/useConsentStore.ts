import { defineStore } from 'pinia'

import { CONSENT_STORAGE_KEY, type ConsentChoice, isConsentChoice } from '~/types/consent'

export const useConsentStore = defineStore('consent', () => {
  const choice = ref<ConsentChoice | null>(null)
  const hydrated = ref(false)

  const marketingAllowed = computed(() => choice.value === 'all')

  /** Só exibir o banner após ler o `localStorage` (evita flash incorreto). */
  const shouldPrompt = computed(() => hydrated.value && choice.value === null)

  const hydrateFromStorage = () => {
    if (!import.meta.client) {
      return
    }
    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY)
      if (raw && isConsentChoice(raw)) {
        choice.value = raw
      }
    } catch {
      /* storage indisponível */
    }
    hydrated.value = true
  }

  const setChoice = (value: ConsentChoice) => {
    choice.value = value
    if (!import.meta.client) {
      return
    }
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
  }

  return {
    choice,
    hydrated,
    marketingAllowed,
    shouldPrompt,
    hydrateFromStorage,
    setChoice,
  }
})
