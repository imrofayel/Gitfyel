<template>

  <div class="w-full flex justify-center bg-black p-2 text-white">Update GitHub User to see your stats.</div>

  <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
    
    <slot />

    <AppFooter/>

    </div>

</template>

<script lang="ts" setup>

import { onMounted } from 'vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode() // Ref<'dark' | 'light'>

onMounted(() => {
  mode.value = 'light' // Set the theme to light mode
})

</script>

<style>

</style>