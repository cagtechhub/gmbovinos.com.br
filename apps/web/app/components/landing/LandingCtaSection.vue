<script setup lang="ts">
import { formatPhone } from '~/utils/formatPhone'

const DEFAULT_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3711.2913709424433!2d-45.4830883!3d-21.535459400000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca8d3973a83c9b%3A0x1cee0e6762772380!2sFazenda%20Para%C3%ADso%20-%20Varginha!5e0!3m2!1spt-BR!2sbr!4v1777071671981!5m2!1spt-BR!2sbr'

const config = useRuntimeConfig()
const apiBase = useApiBase()
const mapsEmbedUrl = computed(
  () => String(config.public.mapsEmbedUrl || '').trim() || DEFAULT_MAPS_EMBED_URL
)

const rawWhatsapp = computed(() =>
  String(config.public.whatsappNumber || config.public.businessPhone || '5535998421200').replace(
    /\D/g,
    ''
  )
)
const formattedPhone = computed(() => formatPhone(rawWhatsapp.value, 'local'))
const whatsappDeskLink = computed(
  () =>
    `https://wa.me/${rawWhatsapp.value}?text=${encodeURIComponent('Olá! Gostaria de consultar informações sobre lotes com a GM Bovinos.')}`
)

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('cta')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Mesa de Negócios GM Bovinos')
const headline = computed(
  () => payload.value?.headline || 'Quer comprar, vender ou avaliar um lote?'
)
const body = computed(
  () =>
    payload.value?.body ||
    'Preencha o formulário para atendimento direto com nosso time de originação ou fale via canais oficiais.'
)

const form = reactive({
  nome: '',
  email: '',
  telefone: '',
  operacao: 'venda',
  quantidade: '',
  municipio: '',
  mensagem: '',
})

const result = ref<{ success: boolean; data: unknown }>()
const loading = ref(false)
const isSentOK = computed(() => result.value?.success)

async function handleSubmit() {
  loading.value = true

  const operacaoLabels: Record<string, string> = {
    venda: 'Vender Gado (Ofertando lote)',
    compra: 'Comprar Gado (Reposição/Engorda)',
    avaliacao: 'Avaliação Técnica no Curral',
    confinamento: 'Parceria de Confinamento / Boitel',
  }

  const subject = `[${operacaoLabels[form.operacao] || form.operacao}] ${form.quantidade ? form.quantidade + ' cab. - ' : ''}${form.municipio || 'Sul de Minas'}`
  const composedMessage = [
    form.quantidade ? `Quantidade estimada: ${form.quantidade} cabeças` : null,
    form.municipio ? `Origem / Município: ${form.municipio}` : null,
    form.mensagem ? `Observações do rebanho: ${form.mensagem}` : null,
  ]
    .filter(Boolean)
    .join('\n\n')

  try {
    await $fetch(`${apiBase.value}/contacts`, {
      method: 'POST',
      body: {
        fullName: form.nome,
        email: form.email,
        phone: form.telefone,
        subject,
        message: composedMessage || 'Interesse registrado via mesa de negociação do site.',
      },
    })

    result.value = {
      success: true,
      data: null,
    }
    form.nome = ''
    form.email = ''
    form.telefone = ''
    form.quantidade = ''
    form.municipio = ''
    form.mensagem = ''
  } catch (error) {
    result.value = {
      success: false,
      data: error,
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section
    id="cta"
    class="w-full bg-surface-container-low py-space-section-mobile md:py-space-section scroll-mt-20"
  >
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
      <!-- Section Intro -->
      <div class="text-center max-w-2xl mx-auto mb-space-2xl">
        <div class="inline-flex items-center gap-space-sm mb-space-xs">
          <span class="inline-block w-6 h-[2px] bg-tertiary-dark" />
          <span class="font-label text-label text-tertiary-dark uppercase tracking-[0.24em]">
            {{ eyebrow }}
          </span>
          <span class="inline-block w-6 h-[2px] bg-tertiary-dark" />
        </div>
        <h2
          class="font-headline text-headline-mobile md:text-headline text-text-strong mb-space-xs"
        >
          {{ headline }}
        </h2>
        <p class="font-body text-body text-text-base">
          {{ body }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        <!-- Left Column: Commercial Form Card (7 Cols) -->
        <div
          class="lg:col-span-7 bg-surface p-space-lg md:p-space-xl rounded-xl shadow-card border border-stroke"
        >
          <div
            class="flex items-center justify-between pb-space-md mb-space-lg border-b border-stroke"
          >
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary-container text-[22px]">feed</span>
              <span class="font-title text-title text-text-strong font-semibold">
                Solicitação de Negociação
              </span>
            </div>
            <span class="font-badge-mono text-badge-mono text-text-muted">[CANAL DIRETO]</span>
          </div>

          <form class="flex flex-col gap-space-md" @submit.prevent="handleSubmit">
            <!-- Full Name -->
            <div class="flex flex-col gap-1">
              <label
                class="font-label text-label text-text-strong uppercase tracking-wider"
                for="cta-nome"
              >
                Nome Completo / Produtor Rural *
              </label>
              <input
                id="cta-nome"
                v-model="form.nome"
                class="w-full h-12 px-4 rounded bg-surface border border-stroke-strong text-text-strong placeholder:text-text-muted font-body text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                placeholder="Ex.: Carlos Eduardo Silveira"
                required
                type="text"
              />
            </div>

            <!-- Email & WhatsApp -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div class="flex flex-col gap-1">
                <label
                  class="font-label text-label text-text-strong uppercase tracking-wider"
                  for="cta-email"
                >
                  E-mail de Contato *
                </label>
                <input
                  id="cta-email"
                  v-model="form.email"
                  class="w-full h-12 px-4 rounded bg-surface border border-stroke-strong text-text-strong placeholder:text-text-muted font-body text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  placeholder="carlos@fazenda.com.br"
                  required
                  type="email"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  class="font-label text-label text-text-strong uppercase tracking-wider"
                  for="cta-tel"
                >
                  Telefone / WhatsApp *
                </label>
                <input
                  id="cta-tel"
                  v-model="form.telefone"
                  class="w-full h-12 px-4 rounded bg-surface border border-stroke-strong text-text-strong placeholder:text-text-muted font-numeric text-numeric focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  placeholder="(35) 99999-9999"
                  required
                  type="tel"
                />
              </div>
            </div>

            <!-- Operation Type -->
            <div class="flex flex-col gap-1">
              <label
                class="font-label text-label text-text-strong uppercase tracking-wider"
                for="cta-operacao"
              >
                Tipo de Operação *
              </label>
              <select
                id="cta-operacao"
                v-model="form.operacao"
                class="w-full h-12 px-4 rounded bg-surface border border-stroke-strong text-text-strong font-body text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                required
              >
                <option value="venda">Quero Vender Gado (Tenho lote)</option>
                <option value="compra">Quero Comprar Gado (Reposição/Engorda)</option>
                <option value="avaliacao">Solicitar Avaliação Técnica no Curral</option>
                <option value="confinamento">Conhecer Parceria de Confinamento</option>
              </select>
            </div>

            <!-- Heads Count & Location -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div class="flex flex-col gap-1">
                <label
                  class="font-label text-label text-text-strong uppercase tracking-wider"
                  for="cta-qtd"
                >
                  Quantidade Estimada (Cabeças)
                </label>
                <input
                  id="cta-qtd"
                  v-model="form.quantidade"
                  class="w-full h-12 px-4 rounded bg-surface border border-stroke-strong text-text-strong placeholder:text-text-muted font-numeric text-numeric focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  min="1"
                  placeholder="Ex.: 80"
                  type="number"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label
                  class="font-label text-label text-text-strong uppercase tracking-wider"
                  for="cta-mun"
                >
                  Município / Fazenda de Origem
                </label>
                <input
                  id="cta-mun"
                  v-model="form.municipio"
                  class="w-full h-12 px-4 rounded bg-surface border border-stroke-strong text-text-strong placeholder:text-text-muted font-body text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  placeholder="Ex.: Varginha / Três Pontas - MG"
                  type="text"
                />
              </div>
            </div>

            <!-- Notes / Details -->
            <div class="flex flex-col gap-1">
              <label
                class="font-label text-label text-text-strong uppercase tracking-wider"
                for="cta-msg"
              >
                Detalhes do Rebanho / Observações
              </label>
              <textarea
                id="cta-msg"
                v-model="form.mensagem"
                class="w-full p-4 rounded bg-surface border border-stroke-strong text-text-strong placeholder:text-text-muted font-body text-body-sm focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all resize-none"
                placeholder="Informe raça predominante (Nelore, Cruzamento), peso médio estimado, regime alimentar ou condições desejadas..."
                rows="3"
              />
            </div>

            <!-- Feedback Message -->
            <div
              v-if="isSentOK"
              class="p-3 bg-field/10 border border-field text-field rounded font-body text-body-sm flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-[18px]">task_alt</span>
              <span
                >Mensagem registrada com sucesso. Um especialista entrará em contato em breve.</span
              >
            </div>

            <!-- Primary Action Button -->
            <button
              :disabled="loading"
              class="w-full h-[52px] rounded bg-primary-container text-on-primary font-label text-label tracking-[0.18em] uppercase hover:bg-primary-hover transition-all shadow-[0_4px_16px_rgba(31,95,214,0.3)] flex items-center justify-center gap-2 focus:ring-2 focus:ring-primary-container focus:ring-offset-2 disabled:opacity-60 cursor-pointer"
              type="submit"
            >
              <span class="material-symbols-outlined text-[20px]">send</span>
              <span>{{ loading ? 'Enviando...' : 'Solicitar contato da mesa de operações' }}</span>
            </button>
            <span class="text-center font-badge-mono text-[11px] text-text-muted">
              DADOS PROTEGIDOS • ATENDIMENTO EXCLUSIVO E CONFIDENCIAL
            </span>
          </form>
        </div>

        <!-- Right Column: Location Map & Direct Desk Contacts (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-space-lg">
          <!-- Facility Map Card -->
          <div
            class="bg-surface rounded-xl p-space-md border border-stroke shadow-sm flex flex-col gap-space-md"
          >
            <div class="flex items-center justify-between pb-space-xs border-b border-stroke">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-tertiary-dark text-[20px]"
                  >pin_drop</span
                >
                <span class="font-title text-body font-semibold text-text-strong"
                  >Localização da Operação</span
                >
              </div>
              <span class="font-badge-mono text-badge-mono text-text-muted">MG - BRASIL</span>
            </div>

            <!-- Embedded Map -->
            <div
              class="w-full h-52 overflow-hidden rounded border border-stroke relative flex items-end"
            >
              <iframe
                title="Localização GM Bovinos no mapa"
                :src="mapsEmbedUrl"
                width="100%"
                height="100%"
                style="border: 0"
                allow="fullscreen; geolocation"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
              />
              <div
                class="absolute bottom-3 left-3 bg-dark-canvas/90 backdrop-blur px-3 py-1.5 rounded border border-dark-stroke text-dark-text-strong font-badge-mono text-[11px] flex items-center gap-2 pointer-events-none"
              >
                <span class="w-2 h-2 rounded-full bg-primary-container" />
                <span>FAZENDA PARAÍSO • VARGINHA/MG</span>
              </div>
            </div>

            <div class="flex flex-col gap-2 font-body text-body-sm text-text-base">
              <div class="flex items-start gap-2">
                <span
                  class="material-symbols-outlined text-tertiary-dark text-[18px] shrink-0 mt-0.5"
                  >location_on</span
                >
                <span
                  ><strong>Escritório & Confinamento:</strong> Rodovia Varginha - MG • Zona Rural •
                  Fazenda Paraíso</span
                >
              </div>
              <div class="flex items-start gap-2">
                <span
                  class="material-symbols-outlined text-tertiary-dark text-[18px] shrink-0 mt-0.5"
                  >schedule</span
                >
                <span class="font-numeric text-numeric"
                  >Horário de balança: Seg - Sex: 07:00 às 17:30</span
                >
              </div>
            </div>
          </div>

          <!-- Fast SLA Commitment Badge -->
          <div
            class="p-space-lg rounded-xl bg-dark-surface text-dark-text-base border border-dark-stroke shadow-md flex flex-col gap-space-xs"
          >
            <div class="flex items-center gap-space-sm text-tertiary-light">
              <span class="material-symbols-outlined text-[24px]">bolt</span>
              <span class="font-label text-label uppercase tracking-widest"
                >SLA de Retorno Rápido</span
              >
            </div>
            <h4 class="font-title text-title text-dark-text-strong">Retornamos em poucas horas</h4>
            <p class="font-body text-body-sm text-dark-text-muted">
              Nossa mesa de originação analisa as características do lote e faz a primeira devolução
              de precificação com agilidade para não travar a sua escala.
            </p>
            <div class="pt-space-xs flex items-center gap-3">
              <a
                class="inline-flex items-center gap-2 font-numeric text-numeric text-whatsapp hover:underline font-semibold"
                :href="whatsappDeskLink"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span class="material-symbols-outlined text-[18px]">chat</span>
                <span>Chamar no WhatsApp: {{ formattedPhone }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
