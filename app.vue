<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script>

import { onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'

import { inject } from '@vercel/analytics';
 
inject();

const mode = useColorMode() // Ref<'dark' | 'light'>

onMounted(() => {
  mode.value = 'dark' // Set the theme to light mode
})

</script>

<style>
</style>