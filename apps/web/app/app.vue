<script setup lang="ts">
import { useSiteSeoHead } from '~/composables/useSiteSeoHead'

useSiteSeoHead()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
