<script setup lang="ts">
import { formatPhone } from '~/utils/formatPhone'

const config = useRuntimeConfig()

const businessPhone = computed(() =>
  String(config.public.businessPhone || '35998421200').replace(/\D/g, '')
)
const contactEmail = computed(() =>
  String(config.public.contactEmail || 'contato@gmbovinos.com.br').trim()
)
const formattedPhone = computed(() => formatPhone(businessPhone.value, 'local'))
</script>

<template>
  <footer class="w-full bg-dark-canvas text-dark-text-base border-t border-dark-stroke">
    <div class="max-w-[1240px] mx-auto px-margin-mobile md:px-margin pt-space-2xl pb-space-xl">
      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-space-xl pb-space-xl border-b border-dark-stroke/60"
      >
        <!-- Col 1: Marca & Síntese -->
        <div class="md:col-span-5 flex flex-col gap-space-md">
          <div class="flex items-center gap-space-sm">
            <nuxt-img
              src="/img/logo-mono.png"
              alt="GM Bovinos Logo"
              width="192"
              height="74"
              class="h-8 w-auto object-contain invert"
            />
          </div>
          <p class="font-body text-body-sm text-dark-text-muted max-w-sm leading-relaxed">
            Intermediação qualificada, assessoria pecuária e comercialização de gado de corte com
            rigor zootécnico e transparência institucional.
          </p>
          <div
            class="flex items-center gap-space-xs text-dark-text-muted font-badge-mono text-badge-mono uppercase"
          >
            <span class="material-symbols-outlined text-tertiary-light text-[18px]"
              >location_on</span
            >
            <span>Varginha • Minas Gerais • Brasil</span>
          </div>
        </div>

        <!-- Col 2: Navegação -->
        <div class="md:col-span-4 flex flex-col gap-space-sm">
          <span class="font-label text-label text-tertiary-light uppercase tracking-[0.24em]">
            Navegação Direta
          </span>
          <div class="flex flex-col gap-space-xs font-body text-body-sm">
            <a
              class="text-dark-text-muted hover:text-dark-text-strong transition-colors"
              href="#como-funciona"
            >
              Como funciona
            </a>
            <a
              class="text-dark-text-muted hover:text-dark-text-strong transition-colors"
              href="#atuacao"
            >
              Atuação Comercial
            </a>
            <a
              class="text-dark-text-muted hover:text-dark-text-strong transition-colors"
              href="#gallery"
            >
              Galeria de Lotes
            </a>
            <a
              class="text-dark-text-muted hover:text-dark-text-strong transition-colors"
              href="#sobre-nos"
            >
              Sobre a GM Bovinos
            </a>
            <a
              class="text-dark-text-muted hover:text-dark-text-strong transition-colors"
              href="#cta"
            >
              Central de Negócios
            </a>
          </div>
        </div>

        <!-- Col 3: Desk Comercial -->
        <div class="md:col-span-3 flex flex-col gap-space-sm">
          <span class="font-label text-label text-tertiary-light uppercase tracking-[0.24em]">
            Desk Comercial
          </span>
          <div class="flex flex-col gap-space-xs font-body text-body-sm text-dark-text-muted">
            <div class="flex items-center gap-space-xs">
              <span class="material-symbols-outlined text-primary-fixed-dim text-[18px]">call</span>
              <span class="font-numeric text-numeric text-dark-text-strong">{{
                formattedPhone
              }}</span>
            </div>
            <div class="flex items-center gap-space-xs">
              <span class="material-symbols-outlined text-primary-fixed-dim text-[18px]">mail</span>
              <span>{{ contactEmail }}</span>
            </div>
            <div class="flex items-center gap-space-xs">
              <span class="material-symbols-outlined text-primary-fixed-dim text-[18px]"
                >schedule</span
              >
              <span class="font-numeric text-badge-mono">SEG - SEX: 07:30 - 18:00</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm font-badge-mono text-badge-mono text-dark-text-muted"
      >
        <p>© 2026 GM Bovinos. Todos os direitos reservados. gmbovinos.com.br</p>
        <p class="tracking-wider uppercase">Rigor Técnico • Liquidez no Campo</p>
      </div>
    </div>
  </footer>
</template>
