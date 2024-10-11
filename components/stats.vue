<template>
  <div class="flex flex-col rounded-xl pt-4">
    <div class="flex flex-wrap">
      <div v-for="stat in computedStats" :key="stat.alt" class="flex">
        <img 
          :src="stat.link" 
          :alt="stat.alt" 
          @click="stat.onClick"
          class="cursor-pointer pr-3 pb-4"
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3';
import { useUserBucket } from '~/stores/user';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const userBucket = useUserBucket();
const { userName } = storeToRefs(userBucket);

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
});

function addImage(url: string) {
  if (url && props.editor) {
    props.editor.chain().focus().setImage({ src: url }).run()
  }
}

// Use a computed property to dynamically update the stats based on userName
const computedStats = computed(() => ({
  rank: {
    link: `https://github-readme-stats.vercel.app/api?username=${userName.value}&theme=default&show_icons=true&hide_border=false&count_private=true`,
    alt: 'GitHub Top Languages',
    onClick: () => {
      addImage(`https://github-readme-stats.vercel.app/api?username=${userName.value}&theme=default&show_icons=true&hide_border=false&count_private=true`);
    },
  },
  streak: {
    link: `https://github-readme-streak-stats.herokuapp.com/?user=${userName.value}&theme=default&hide_border=false`,
    alt: 'GitHub Streak Stats',
    onClick: () => {
      addImage(`https://github-readme-streak-stats.herokuapp.com/?user=${userName.value}&theme=default&hide_border=false`);
    },
  },
  languages: {
    link: `https://github-readme-stats.vercel.app/api/top-langs/?username=${userName.value}&theme=default&show_icons=true&hide_border=false&layout=compact`,
    alt: 'GitHub Top Languages',
    onClick: () => {
      addImage(`https://github-readme-stats.vercel.app/api/top-langs/?username=${userName.value}&theme=default&show_icons=true&hide_border=false&layout=compact`);
    },
  },
}));
</script>

<style>
</style>
