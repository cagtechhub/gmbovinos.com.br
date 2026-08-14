<script setup lang="ts">
const DEFAULT_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3711.2913709424433!2d-45.4830883!3d-21.535459400000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ca8d3973a83c9b%3A0x1cee0e6762772380!2sFazenda%20Para%C3%ADso%20-%20Varginha!5e0!3m2!1spt-BR!2sbr!4v1777071671981!5m2!1spt-BR!2sbr'

const config = useRuntimeConfig()
const apiBase = useApiBase()
const mapsEmbedUrl = computed(
  () => String(config.public.mapsEmbedUrl || '').trim() || DEFAULT_MAPS_EMBED_URL
)

const { sectionByKey } = useSiteSections()
const payload = computed(() => sectionByKey('cta')?.payload)

const eyebrow = computed(() => payload.value?.eyebrow || 'Fale com a equipe')
const headline = computed(
  () => payload.value?.headline || 'Quer comprar, vender ou tirar dúvidas?'
)
const body = computed(() => payload.value?.body || '')

const form = reactive({
  nome: '',
  email: '',
  assunto: '',
  descricao: '',
})

const result = ref<{ success: boolean; data: unknown }>()
const loading = ref(false)

const isSentOK = computed(() => result.value?.success)

async function handleSubmit() {
  loading.value = true

  try {
    await $fetch(`${apiBase.value}/contacts`, {
      method: 'POST',
      body: {
        fullName: form.nome,
        email: form.email,
        subject: form.assunto,
        message: form.descricao,
      },
    })

    result.value = {
      success: true,
      data: null,
    }
    form.nome = ''
    form.email = ''
    form.assunto = ''
    form.descricao = ''
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
    class="section-band section-band--surface my-0 px-6 py-20 md:py-24 lg:px-10"
  >
    <div class="relative mx-auto w-full max-w-7xl">
      <div class="*:text-center w-full">
        <p class="section-eyebrow justify-center">{{ eyebrow }}</p>
        <h2 class="section-title mb-4 mt-4">
          {{ headline }}
        </h2>
        <p class="section-lead mb-10">
          <template v-if="body">{{ body }}</template>
          <template v-else>
            Fale sobre <b class="text-primary-700">compra ou venda de gado</b>, avaliação de lote ou
            <b class="text-primary-700">engorda e manejo</b> no campo.
            <br />Retornamos em poucas horas com os próximos passos.
          </template>
        </p>
      </div>
      <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div class="w-full overflow-hidden border border-gray-300/80">
            <iframe
              title="Localização GM Bovinos no mapa"
              :src="mapsEmbedUrl"
              width="100%"
              height="540"
              style="border: 0"
              allow="fullscreen; geolocation"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              credentialless
            ></iframe>
          </div>
        </div>

        <div class="landing-card card-accent-top p-6 md:p-8">
          <h3 class="mb-5 text-2xl font-semibold tracking-tight text-gray-900">
            Envie uma mensagem
          </h3>

          <Transition name="fade" mode="out-in">
            <p v-if="isSentOK" class="py-4 px-0 text-start text-lg font-medium text-gray-900">
              <span>Mensagem enviada com sucesso!</span>
              <br />
              <span class="font-normal text-gray-600"> Entraremos em contato em breve. </span>
            </p>

            <form v-else class="space-y-4" @submit.prevent="handleSubmit">
              <div>
                <label for="cta-nome" class="mb-1 block text-sm font-medium text-gray-900">
                  Nome
                </label>
                <input
                  id="cta-nome"
                  v-model="form.nome"
                  type="text"
                  required
                  autocomplete="name"
                  placeholder="Seu nome"
                  class="w-full border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label for="cta-email" class="mb-1 block text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  id="cta-email"
                  v-model="form.email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="seu@email.com"
                  class="w-full border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label for="cta-assunto" class="mb-1 block text-sm font-medium text-gray-900">
                  Assunto
                </label>
                <input
                  id="cta-assunto"
                  v-model="form.assunto"
                  type="text"
                  required
                  placeholder="Ex.: Engorda de gado"
                  class="w-full border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <div>
                <label for="cta-descricao" class="mb-1 block text-sm font-medium text-gray-900">
                  Descrição
                </label>
                <textarea
                  id="cta-descricao"
                  v-model="form.descricao"
                  required
                  rows="3"
                  placeholder="Conte um pouco sobre o que precisa…"
                  class="w-full resize-none border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="btn-landing btn-landing--solid w-full !min-w-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ loading ? 'Enviando…' : 'Enviar mensagem' }}
              </button>
            </form>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
