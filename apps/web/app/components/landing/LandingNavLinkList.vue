<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { LandingNavLink } from '~/constants/landingNavLinks'

const props = withDefaults(
  defineProps<{
    links: LandingNavLink[]
    /** Barra clara (header “solid”) vs. texto claro (header sobre o hero). */
    theme: 'solid' | 'overlay'
    /** Linha única no desktop vs. coluna (drawer / mobile). */
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { orientation: 'horizontal' }
)

const emit = defineEmits<{
  navigate: []
}>()

/** Extrai o id da seção de `/#cta`, `#cta` ou `/`. */
function sectionIdFromHref(href: string): string | null {
  const hash = href.includes('#') ? href.slice(href.indexOf('#') + 1) : ''
  return hash || null
}

function isCta(link: LandingNavLink) {
  return sectionIdFromHref(link.href) === 'cta'
}

function headerScrollOffset(): number {
  const nav = document.querySelector('nav[aria-label="Principal"]')
  const navHeight = nav?.getBoundingClientRect().height ?? 88
  return navHeight + 20
}

function scrollToSection(link: LandingNavLink, event: MouseEvent) {
  const id = sectionIdFromHref(link.href)
  if (!id) return

  const onHome = import.meta.client && (window.location.pathname === '/' || window.location.pathname === '')
  if (!onHome) return

  event.preventDefault()
  emit('navigate')

  const target = document.getElementById(id)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - headerScrollOffset()
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })

  if (import.meta.client) {
    history.replaceState(null, '', `/#${id}`)
  }
}

const listClass = computed(() => {
  const base =
    props.orientation === 'horizontal'
      ? 'flex flex-wrap items-center gap-6 text-sm'
      : 'flex flex-col gap-1 text-base'
  if (props.theme === 'solid') {
    return props.orientation === 'horizontal' ? [base, 'text-gray-800'] : [base, 'text-gray-900']
  }
  return props.orientation === 'horizontal'
    ? [base, 'font-medium text-white/90']
    : [base, 'font-medium text-white']
})

const linkClass = (link: LandingNavLink) => {
  const base =
    props.orientation === 'vertical' ? 'block rounded-control px-3 py-3 transition' : 'transition'
  const solid =
    props.theme === 'solid'
      ? props.orientation === 'vertical'
        ? 'hover:bg-gray-100 hover:text-primary-500'
        : 'hover:text-primary-500'
      : ''
  const overlay =
    props.theme === 'overlay'
      ? props.orientation === 'vertical'
        ? 'hover:bg-white/10 hover:text-white'
        : 'hover:text-white'
      : ''
  const ctaH =
    props.theme === 'solid' && props.orientation === 'horizontal'
      ? 'font-semibold text-primary-500 hover:text-primary-700'
      : ''
  const ctaV =
    props.theme === 'solid' && props.orientation === 'vertical'
      ? 'mt-1 border-2 border-primary-500 px-3 py-3 text-center font-semibold text-primary-700 hover:bg-primary-500 hover:text-white'
      : ''
  const ctaOverlayH =
    props.theme === 'overlay' && props.orientation === 'horizontal'
      ? 'font-semibold text-white underline-offset-4 hover:underline'
      : ''
  const ctaOverlayV =
    props.theme === 'overlay' && props.orientation === 'vertical'
      ? 'mt-2 border-2 border-white px-3 py-3 text-center text-sm font-bold uppercase tracking-[0.18em] text-white hover:bg-white hover:text-gray-900'
      : ''
  const cta = isCta(link)
  return [
    base,
    solid,
    overlay,
    cta && ctaH,
    cta && ctaV,
    cta && ctaOverlayH,
    cta && ctaOverlayV,
    'relative',
  ]
}

const TRACKED_SECTION_IDS = ['como-funciona', 'atuacao', 'sobre-nos', 'gallery', 'cta'] as const

const activeSection = ref<string | null>(null)

const isItemActive = computed(() => {
  return (link: LandingNavLink) => activeSection.value === sectionIdFromHref(link.href)
})

function updateActiveSection() {
  if (!import.meta.client) return

  const offset = headerScrollOffset()
  const scrollLine = window.scrollY + offset + 8

  let current: string | null = null
  for (const id of TRACKED_SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.offsetTop
    if (scrollLine >= top) current = id
  }
  activeSection.value = current
}

let onScroll: (() => void) | null = null

onMounted(() => {
  if (!import.meta.client) return

  updateActiveSection()
  onScroll = () => updateActiveSection()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  if (!import.meta.client || !onScroll) return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <ul :class="listClass">
    <li
      v-for="link in links"
      :key="link.href"
      :class="
        orientation === 'vertical' && theme === 'overlay'
          ? 'border-b border-white/10 last:border-b-0'
          : ''
      "
    >
      <a :href="link.href" :class="linkClass(link)" @click="scrollToSection(link, $event)">
        {{ link.label }}
        <div
          v-if="isItemActive(link) && orientation === 'horizontal' && !isCta(link)"
          class="pointer-events-none absolute -bottom-2 left-0 right-0 flex justify-center"
          aria-hidden="true"
        >
          <span class="h-px w-5 origin-center bg-accent-500 transition-all duration-300" />
        </div>
      </a>
    </li>
  </ul>
</template>
