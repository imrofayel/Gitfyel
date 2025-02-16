<template>
  <div>
    <div class="flex space-x-2 text-[19px]">
      <button @click="analyzeProfile" :disabled="loading" class="relative">
        <div class="shadow-sm drop-shadow-sm border-gray-200/80 border rounded-2xl px-2.5 py-1 flex space-x-2">
          <span>Magic AI</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" v-if="loading">
            <g stroke="currentColor">
              <circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="2.5">
                <animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite" values="0 150;42 150;42 150;42 150" />
                <animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s"
                  keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1"
                  repeatCount="indefinite" values="0;-16;-59;-59" />
              </circle>
              <animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate"
                values="0 12 12;360 12 12" />
            </g>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Editor } from '@tiptap/vue-3';
import { useUserBucket } from '~/stores/user';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
});

const loading = ref(false);
const userBucket = useUserBucket();

async function analyzeProfile() {
  if (!userBucket.userName) {
    // Show error or notification that username is required
    return;
  }

  loading.value = true;
  try {
    const response = await $fetch(`/api/analyze?username=${encodeURIComponent(userBucket.userName)}`);
    
    // Add two newlines and the analysis to the editor
    if (props.editor) {
      const currentContent = props.editor.getHTML();
      props.editor.commands.setContent(currentContent + '\n\n' + response.analysis);
    }
  } catch (e: any) {
    console.error('Analysis error:', e);
    // Handle error - maybe show a notification
  } finally {
    loading.value = false;
  }
}
</script>

<style>

</style>