<script setup lang="ts">
const defaultEtapas = [
  {
    subtitulo: 'Etapa Inicial',
    badge: 'INPUT: DADOS DO LOTE',
    titulo: 'Diagnóstico & Alinhamento',
    texto:
      'Levantamento de quantidade, padrão genético, peso médio estimado, localização geográfica e expectativas de prazo e valor para precificação precisa.',
  },
  {
    subtitulo: 'Auditoria de Campo',
    badge: 'AUDITORIA: ESCORE & PESO',
    titulo: 'Vistoria Técnica & Pesagem',
    texto:
      'Avaliação presencial minuciosa ou por laudo técnico detalhado do rebanho no pasto ou curral, com aferição de escore corporal e sanidade.',
  },
  {
    subtitulo: 'Formalização',
    badge: 'JURÍDICO: CONTRATO FIRMADO',
    titulo: 'Estruturação do Negócio',
    texto:
      'Minuta contratual cristalina, garantia de balança pública ou de fazenda, condições de frete e prazos de liquidação previamente acordados.',
  },
  {
    subtitulo: 'Execução & Saída',
    badge: 'STATUS: LIQUIDAÇÃO OK',
    titulo: 'Embarque & Fechamento',
    texto:
      'Acompanhamento presencial do carregamento, emissão e conferência de GTA e liquidação financeira pontual e segura com comprovante imediato.',
  },
]

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('como_funciona')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Metodologia Operacional')
const headline = computed(
  () => payload.value?.headline || 'Transparência do primeiro contato ao fechamento do lote.'
)
const body = computed(
  () =>
    payload.value?.body ||
    'Eliminamos o atrito e a informalidade tradicional através de um fluxo estruturado com métricas zootécnicas, pesagem aferida e segurança documental irrestrita.'
)

const etapas = computed(() => {
  const steps = payload.value?.steps
  if (steps?.length) {
    return steps.map((step, idx) => ({
      subtitulo: defaultEtapas[idx]?.subtitulo || `Etapa 0${idx + 1}`,
      badge: defaultEtapas[idx]?.badge || 'FASE OPERACIONAL',
      titulo: step.title,
      texto: step.description,
    }))
  }
  return defaultEtapas
})
</script>

<template>
  <section
    id="como-funciona"
    class="w-full bg-surface-container-low py-space-section-mobile md:py-space-section scroll-mt-20"
    itemscope
    itemtype="https://schema.org/HowTo"
  >
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-lg">
        <div class="max-w-xl flex flex-col gap-space-xs">
          <div class="flex items-center gap-space-sm">
            <span class="inline-block w-8 h-[2px] bg-tertiary-dark" />
            <span class="font-label text-label text-tertiary-dark uppercase tracking-[0.24em]">
              {{ eyebrow }}
            </span>
          </div>
          <h2
            class="font-headline text-headline-mobile md:text-headline text-text-strong"
            itemprop="name"
          >
            {{ headline }}
          </h2>
        </div>
        <p class="font-body text-body text-text-base max-w-md" itemprop="description">
          {{ body }}
        </p>
      </div>

      <!-- 4-Step Linear Rail Grid -->
      <ol class="grid grid-cols-1 md:grid-cols-4 gap-gutter relative">
        <li
          v-for="(etapa, index) in etapas"
          :key="etapa.titulo"
          class="group relative bg-surface p-space-lg rounded-xl shadow-card border-t-2 border-tertiary-dark flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
          itemprop="step"
          itemscope
          itemtype="https://schema.org/HowToStep"
        >
          <meta itemprop="position" :content="String(index + 1)" />
          <div>
            <div
              class="flex items-center justify-between pb-space-md mb-space-md border-b border-stroke"
            >
              <span class="font-numeric text-title text-tertiary-dark font-semibold">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="font-badge-mono text-badge-mono text-text-muted uppercase">
                {{ etapa.subtitulo }}
              </span>
            </div>
            <h3 class="font-title text-title text-text-strong mb-space-sm" itemprop="name">
              {{ etapa.titulo }}
            </h3>
            <p class="font-body text-body-sm text-text-base" itemprop="text">
              {{ etapa.texto }}
            </p>
          </div>
          <div
            class="mt-space-lg pt-space-sm border-t border-surface-muted flex items-center justify-between font-badge-mono text-[11px]"
            :class="index === 3 ? 'text-field font-semibold' : 'text-text-muted'"
          >
            <span>{{ etapa.badge }}</span>
            <span
              class="material-symbols-outlined text-[16px]"
              :class="index === 3 ? 'text-field' : 'text-primary'"
            >
              {{ index === 3 ? 'check_circle' : 'arrow_forward' }}
            </span>
          </div>
        </li>
      </ol>

      <!-- Quantitative Process Guarantee Box -->
      <div
        class="mt-space-xl p-space-lg rounded-xl bg-surface-muted flex flex-col md:flex-row items-center justify-between gap-space-md border border-stroke"
      >
        <div class="flex items-center gap-space-md">
          <div
            class="w-12 h-12 rounded bg-surface flex items-center justify-center text-primary-container shadow-sm shrink-0"
          >
            <span class="material-symbols-outlined text-[26px]">verified</span>
          </div>
          <div>
            <h4 class="font-title text-body font-semibold text-text-strong">
              Auditoria Técnica e Conformidade Sanitária Integral
            </h4>
            <p class="font-body-sm text-body-sm text-text-muted">
              Todos os lotes contam com conferência de documentação do IMA/MAPA, vacinação em dia e
              rastreabilidade.
            </p>
          </div>
        </div>
        <a
          class="inline-flex items-center gap-2 font-label text-label text-primary hover:text-primary-hover uppercase tracking-widest whitespace-nowrap"
          href="#cta"
        >
          <span>Cadastrar Lote Agora</span>
          <span class="material-symbols-outlined text-[16px]">north_east</span>
        </a>
      </div>
    </div>
  </section>
</template>
