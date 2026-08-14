/** Versão da chave: incrementar se o formato do valor mudar. */
export const CONSENT_STORAGE_KEY = 'gmbovinos:cookie-consent:v1'

/** `essential` = só o necessário ao site; `all` = inclui GA4 e Meta Pixel. */
export type ConsentChoice = 'essential' | 'all'

export function isConsentChoice(value: string): value is ConsentChoice {
  return value === 'essential' || value === 'all'
}
