<template>
      <div class="flex space-x-4 p-2 px-3 border border-t-0 border-r-0 bg-[#fbfbfb]" v-if="$props.editor" :class="$props.bubble ? 'rounded-bl-xl' : 'rounded-xl'">
        
        <!-- Bold -->
        <button @click="$props.editor!.chain().focus().toggleBold().run()"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"/></svg></button>

        <!-- Italic -->
        <button @click="$props.editor!.chain().focus().toggleItalic().run()"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 4h-9m4 16H5M15 4L9 20"/></svg></button>

        <!-- Strikethrough -->
        <button @click="$props.editor!.chain().focus().toggleStrike().run()"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6m-2-8h16"/></svg></button>

        <!-- Code -->
        <button @click="$props.editor!.chain().focus().toggleCode().run()"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 18l6-6l-6-6M8 6l-6 6l6 6"/></svg></button>

        <!-- Link -->
        <svg xmlns="http://www.w3.org/2000/svg" width="19" viewBox="0 0 24 24" v-if="$props.bubble"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></g></svg>

        <!-- Bullet List -->
        <button @click="$props.editor!.chain().focus().toggleBulletList().run()" v-if="bubble"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></button>

        <!-- Numbered List -->
        <button @click="$props.editor!.chain().focus().toggleOrderedList().run()" v-if="$props.bubble"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6h11m-11 6h11m-11 6h11M4 6h1v4m-1 0h2m0 8H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg></button>

        <!-- Image -->
        <button @click="addImage" v-if="$props.bubble" id="image"><svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></g></svg></button>

        <!-- Mention -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" v-if="$props.bubble"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></g></svg>

      
      </div>
</template>

<script lang="ts" setup>

import { Editor } from '@tiptap/vue-3';

function addImage() {

  const url = prompt("Enter image url: ");

  if (url && props.editor) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
}

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },

  bubble: {
    type: Boolean,
  }
});

</script>

<style>

</style>