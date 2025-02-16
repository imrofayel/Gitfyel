<template>

    <AppHeader/>
    
    <slot />

</template>

<script lang="ts" setup>

import { onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>

onMounted(() => {
  mode.value = 'light' // Set the theme to light mode
})

useHead({
  title: 'GitHub Readme Generator',
  meta: [
    { name: 'description', content: 'Create beautiful GitHub profiles easily with rich text editing, badges and stats.' },
    { name: 'keywords', content: 'GitHub, stats, badges, developer, profile, readme' },
    { property: 'og:title', content: 'GitHub Readme Generator' },
    { property: 'og:description', content: 'Create beautiful GitHub profiles easily with rich text editing, badges and stats.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://gitfyel.vercel.app/' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'GitHub Readme Generator' },
    { name: 'twitter:description', content: 'Create beautiful GitHub profiles easily with rich text editing, badges and stats.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://gitfyel.vercel.app/' },
  ],
})



</script>

<style>

</style>