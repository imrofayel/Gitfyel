<template>
  <div class="flex flex-col items-center">

    <!-- Headline Section -->

    <div
      class="space-y-6 w-full p-8 flex flex-col items-center pt-12">

      <a href="https://github.com/imrofayel/Gitfyel" target="_blank"><div class="bg-white rounded-full text-lg px-3 py-1 border shadow-inner flex items-center">A project by Adam Rofayel&ThinSpace;

        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" class="inline"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10M7 17L17 7"/></svg>

      </div></a>

      <div class="text-5xl px-4 relative">
        GitHub Profile Readme Generator
      </div>

    </div>

    <Richeditor/>

  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.shadow-inner {
  box-shadow: inset 0 -1px 1px 0 #d7d7d7;
}
</style>
