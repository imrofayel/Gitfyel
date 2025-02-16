<template>
  <div class="flex flex-col rounded-xl pt-4">
    <div class="flex flex-wrap">
      <div v-for="badge in computedBadges" :key="badge.alt" class="flex">
        <img 
          :src="badge.link" 
          :alt="badge.alt" 
          @click="badge.onClick"
          class="cursor-pointer pr-3 pb-4"
        >
      </div>
    </div>

    <div class="flex flex-wrap">
      <div v-for="badge in viewsBadge" :key="badge.alt" class="flex">
        <img 
          :src="badge.link" 
          :alt="badge.alt" 
          @click="badge.onClick"
          class="cursor-pointer pr-3 pb-4"
        >
      </div>
  </div></div>
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
    props.editor.chain().focus().setImage({ src: url }).run();
  }
}

// Use computed properties to dynamically update badges
const computedBadges = computed(() => ({
  gitHubFollowers: {
    link: `https://img.shields.io/github/followers/${userName.value}?label=follow&style=social`,
    alt: 'GitHub followers',
    onClick: () => {
      addImage(`https://img.shields.io/github/stars/${userName.value}`);
    },
  },

  gitHubStars: {
    link: `https://img.shields.io/github/stars/${userName.value}`,
    alt: 'GitHub stars',
    onClick: () => {
      addImage(`https://img.shields.io/github/stars/${userName.value}`);
    },
  },

  twitter: {
    link: `https://img.shields.io/twitter/follow/imrofayel?style=social`,
    alt: 'Twitter followers',
    onClick: () => {
      const user = prompt('Twitter Username:');
      addImage(`https://img.shields.io/twitter/follow/${user}?style=social`);
    },
  },

  npmDownloads: {
    link: `https://img.shields.io/npm/dw/vue`,
    alt: 'npm downloads',
    onClick: () => {
      const npmpackage = prompt('npm package name:');
      addImage(`https://img.shields.io/npm/dw/${npmpackage}`);
    },
  },

  badge: {
    link: `https://img.shields.io/badge/just%20the%20message-8A2BE2`,
    alt: 'plain text badge',
    onClick: () => {
      const text = prompt('Enter text you wanna display:');
      const color = prompt('Enter color of badge e.g., 8A2BE2:');
      addImage(`https://img.shields.io/badge/${text?.split(' ').join('%20')}-${color?.length == 0 ? '8A2BE2' : color}`);
    },
  },

  duobadge: {
    link: `https://img.shields.io/badge/any_text-you_like-blue`,
    alt: 'two text badge',
    onClick: () => {
      const text = prompt('Enter text in this format: any_text-you_like');
      const color = prompt('Enter color of badge e.g., 8A2BE2:');
      addImage(`https://img.shields.io/badge/${text}-${color?.length == 0 ? '8A2BE2' : color}`);
    },
  },

  awesome: {
    link: `https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg`,
    alt: 'awesome',
    onClick: () => {
      addImage(`https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg`);
    },
  }, 

}));

</script>

<style>
</style>
