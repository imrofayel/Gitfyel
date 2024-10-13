<template>

  <div class="w-[80%] flex justify-between">

    <div>
      <div class="inline-flex items-center bg-white border border-gray-200 border-opacity-50 rounded-2xl overflow-hidden roboto-mono">
        <template v-if="isEditing">
          <input v-model="editedUsername" @keyup.enter="saveUsername" type="text"
            class="px-3 p-1 roboto-mono bg-white outline-none w-[150px] focus:ring-0 text-base" placeholder=""
            ref="usernameInput">
          <button @click="saveUsername" class="p-1 px-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24" class="text-[#1e1f22]">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 6L9 17l-5-5" />
            </svg>
          </button>
        </template>
        <template v-else>
          <span class="roboto-mono px-3 py-1 text-base select-none">{{ username || 'GitHub' }}</span>
          <button @click="startEditing" class="p-1 px-2 text-[#1e1f22]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
        </template>
      </div>
    </div>

    <div class="flex space-x-2">

      <button @click="exportMarkdown" class="relative">
            <div class="bg-[#1e1f22] text-white rounded-2xl px-2.5 py-1 flex items-center transition-transform duration-100 active:scale-95 space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m7-7l-7 7l-7-7"/></svg>
              <span>Save</span>
            </div>
          </button>

          <button @click="copyToClipboard" class="relative">
            <div class="bg-[#1e1f22] text-white rounded-2xl px-2.5 py-1 flex items-center transition-transform duration-100 active:scale-95">
              <span>Copy</span>
            </div>
          </button>
    </div>

  </div>

  <div class="flex w-[80%]">
    <Badges :editor="editor as Editor" />
  </div>

  <div class="bg-white backdrop-blur-xl shadow-inner border mt-[10px] rounded-lg w-[80%] overflow-hidden">

    <div class="flex justify-between">

      <div class="p-3"><svg xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm20 0h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg></div>

      <div class="flex">

        <Menu :editor="editor as any" :bubble="true" />

      </div>

    </div>

    <bubble-menu :editor="editor as Editor" :tippy-options="{ duration: 100 }" v-if="editor">

      <div class="flex overflow-hidden dark:border-none bg-[#fbfbfb] border backdrop-blur-xl rounded-xl">

        <Menu :editor="editor as any" :bubble="false" />

      </div>
    </bubble-menu>

    <EditorContent :editor="editor as any" class="overflow-auto px-4 relative -top-4" />

<div
        class="bg-[#fbfbfb] border-t dark:border-none dark:bg-[#2d3d33] p-1.5 px-3 flex justify-between items-center fixed bottom-0 w-full select-none"
        v-if="editor">
        <div class="flex space-x-4">

          <div class="flex space-x-4" v-if="!editor.can().deleteTable()">

            <div @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
              class="bg-white dark:text-white/90 hover:dark:bg-[#1f2b24] dark:bg-[#1f2920] dark:border-transparent backdrop-blur-lg border border-gray-200 flex px-3 p-1 rounded-2xl justify-center items-center cursor-pointer">
              Insert Table
            </div>

          </div>

          <!-- Row Manipulation -->

          <div class="flex space-x-2" v-if="editor.can().deleteTable()">

            <div
              class="bg-[#ffffff] text-base dark:bg-[#1f2920] dark:border-transparent backdrop-blur-xl flex px-3 p-1 rounded-xl justify-center items-center dark:text-white/90 border-gray-100 border cursor-pointer space-x-2">

              <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">

                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" class="text-red-600">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M5 12h14" />
                </svg>

              </button>

              <span class="inline">Row</span>

              <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">

                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M5 12h14m-7-7v14" />
                </svg>

              </button>

            </div>

            <!-- Column Manipulation -->

            <div class="flex space-x-2" v-if="editor.can().deleteTable()">

              <div
                class="bg-[#ffffff] text-base dark:bg-[#1f2920] dark:border-transparent backdrop-blur-xl flex px-3 p-1 rounded-xl justify-center items-center border-gray-100 border dark:text-white/90 cursor-pointer space-x-2">

                <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24" class="text-red-600">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M5 12h14" />
                  </svg>

                </button>

                <span class="inline">Column</span>


                <button @click="editor.chain().focus().addColumnAfter().run()"
                  :disabled="!editor.can().addColumnAfter()">

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M5 12h14m-7-7v14" />
                  </svg>

                </button>

              </div>
            </div>

            <div @click="editor.chain().focus().deleteTable().run()"
              class="text-base hover:bg-[#a61111] bg-[#b91010] dark:hover:bg-[#c10c0cd0] dark:bg-[#860d0dcd] dark:border-transparent border-gray-100 border backdrop-blur-xl flex px-3 p-1 rounded-xl justify-center items-center text-white cursor-pointer">
              Delete</div>

          </div>

        </div></div>

  </div>

  <div class="flex w-[80%]">
    <Stats :editor="editor as Editor" />
  </div>

  <StaticBadges :editor="editor as Editor"/>

</template>

<script lang="ts" setup>

import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3';
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Markdown } from 'tiptap-markdown';

import { Mention } from '../extensions/mention'

import Image from '@tiptap/extension-image'

import { ImageResize } from '../extensions/ImageResize';

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight'

import { useUserBucket } from '~/stores/user';

const userBucket = useUserBucket();

const username = ref('')

watch(username, (newValue) => {
  userBucket.updateUsername(newValue)
})

const editedUsername = ref('')
const isEditing = ref(false)
const usernameInput = ref(null)

const startEditing = () => {
  editedUsername.value = username.value
  isEditing.value = true
}

const saveUsername = () => {
  username.value = editedUsername.value
  isEditing.value = false
}

// create a lowlight instance
const lowlight = createLowlight(all)

const editor = ref<Editor | null>(null);

onMounted(() => {
  editor.value = new Editor({
    content: 'Begin!',

    editable: true,

    editorProps: {
      attributes: {
        class: 'dark:text-white/90 leading-loose text-[17px] min-h-[150px] w-full h-full overflow-auto border-none bg-transparent placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      },
    },
    extensions: [
      Table.configure({ resizable: true }),
      Superscript,
      Image,
      ImageResize,
      SubScript,
      Link,
      TableRow,
      TableHeader,
      TableCell,
      ListItem,
      StarterKit,
      Markdown,
      Mention.configure({
        HTMLAttributes: {
          class: 'githubmention',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
  });
});
onBeforeUnmount(() => {
  editor.value?.destroy();
});

const exportMarkdown = () => {
  if (editor.value) {
    const markdownContent = editor.value.storage.markdown.getMarkdown();

    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${username.value + ' ' + 'Readme' || 'GitHub Readme'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  } else { }
};

const copyToClipboard = () => {
  if (editor.value) {
    const markdownContent = editor.value.storage.markdown.getMarkdown();
    navigator.clipboard.writeText(markdownContent)
      .then(() => {
      })
      .catch((err) => {
        console.error('Failed to copy content: ', err);
      });
  }
};


</script>

<style>
.shadow-inner {
  box-shadow: inset 0 -1px 1px 0 #d7d7d7;
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    width: 100px;

    &.ProseMirror-selectednode {
      outline: 3px solid var(--purple);
    }
  }
}

/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  pre {
    border-radius: 0.8rem;
    font-family: 'Roboto Mono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;
    @apply bg-gray-50 dark:bg-[#2d3d33] inline-block px-8 pl-5;

    ::spelling-error {
      text-decoration: none;
    }

    ::grammar-error {
      text-decoration: none;
    }

    code {
      background: none;
      color: inherit;
      font-size: 1.1rem;
      padding: 0;
      font-family: 'Roboto Mono', monospace;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      @apply text-[#616161] dark:text-[#616161];
      /* Same color for both themes */
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      @apply text-[#d32f2f] dark:text-[#f98181];
      /* Darker red for light theme */
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      @apply text-[#e65100] dark:text-[#fbbc88];
      /* Darker orange for light theme */
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      @apply text-[#33691e] dark:text-[#b9f18d];
      /* Darker green for light theme */
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-title,
    .hljs-section {
      @apply text-[#f9a825] dark:text-[#faf594];
      /* Slightly darker yellow for light theme */
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      @apply text-[#0277bd] dark:text-[#70cff8];
      /* Darker blue for light theme */
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-emphasis {
      font-style: italic;
      font-family: 'Roboto Mono', monospace;
    }

    .hljs-strong {
      font-weight: 700;
      font-family: 'Roboto Mono', monospace;
    }
  }
}

/* Basic editor styles */
.tiptap {

  /* First child margin */
  :first-child {
    margin-top: 0;
  }

  /* Table-specific styling */
  table {
    @apply border-collapse w-full table-fixed overflow-hidden m-0;

    td,
    th {
      @apply border box-border min-w-[1em] p-2 align-top relative;

      /* Adding transparent borders */
      @apply border-black/10 dark:border-white/20;

      /* Ensure child elements have no bottom margin */
      >* {
        @apply mb-0;
      }
    }

    th {
      @apply font-normal text-left;

      /* Light and dark mode for table header */
      @apply bg-gray-50 dark:bg-[#1f2920];
    }

    /* Selected cell styling */
    .selectedCell:after {
      content: "";
      @apply absolute top-0 left-0 right-0 bottom-0 z-10 pointer-events-none;

      /* Light and dark mode for selected cell */
      @apply bg-gray-100 dark:bg-[#182021];
    }

  }

  /* Table wrapper for horizontal scroll */
  .tableWrapper {
    @apply my-6 overflow-x-auto border-opacity-60;
  }

  /* Resize cursor */
  &.resize-cursor {
    @apply cursor-ew-resize;
  }
}

h1 {
  font-size: 2rem;
  margin: 1rem 0;
}

h2 {
  font-size: 1.75rem;
  margin: 0.75rem 0;
}

h3 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

h4 {
  font-size: 1.25rem;
  margin: 0.25rem 0;
}

ul,
ol {
  margin-left: 1.5rem;
  padding-left: 1rem;
}

ul {
  list-style-type: disc;
}

ol {
  list-style-type: decimal;
}

li {
  margin: 0.5rem 0;
}

.task-list-item {
  display: flex;
  align-items: center;
}

.task-list-item input {
  margin-right: 0.5rem;
}

blockquote {
  border-left: 4px solid #ddd;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
}

mark {
  @apply bg-[#fcfada] text-amber-400 dark:bg-[#757142] dark:text-amber-100;
  border-radius: 0.4rem;
  padding: 0.1rem 0.3rem;
}

code {
  font-family: 'Roboto Mono';
  font-size: 18px;
  border-radius: 0.6rem;
  padding: 0.1rem 0.3rem;

  @apply bg-gray-200/70 dark:bg-[#516b53] dark:text-white/80 text-black/80
}

/* Color swatches */
.tiptap .color {
  white-space: nowrap;
}

.tiptap .color::before {
  background-color: var(--color);
  /* border: 1px solid rgba(128, 128, 128, 0.3); */
  border-radius: 8px;
  content: " ";
  display: inline-block;
  height: 1em;
  margin-bottom: 0.15em;
  margin-right: 0.3em;
  vertical-align: middle;
  width: 1em;
}

.tiptap p.is-editor-empty:first-child::before {
  color: #cdcdcd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
  font-size: x-large;
  position: relative;
  top: -6px;
}

/* Task list specific styles */
ul[data-type="taskList"] {
  list-style: none;
  margin-left: 14px;
  padding: 0;
}

ul[data-type="taskList"] li {
  align-items: center;
  display: flex;
  margin-bottom: 0.5rem;
  /* Optional: Add space between tasks */
}

ul[data-type="taskList"] li>label {
  display: flex;
  align-items: center;
  user-select: none;
}

ul[data-type="taskList"] label>input[type="checkbox"] {
  cursor: pointer;
  appearance: none;
  /* Remove default appearance */
  width: 20px;
  height: 20px;
  border: 2px solid #eaeaea;
  /* Border to match background */
  border-radius: 8px;
  /* Rounded corners */
  margin-right: 0.5rem;
  /* Space between checkbox and text */
  position: relative;
}

ul[data-type="taskList"] label>input[type="checkbox"]:checked {
  background-color: #00bcf0;
  border-color: #00bcf0;
}

ul[data-type="taskList"] label>input[type="checkbox"]:checked::after {
  content: '✔';
  /* Checkmark symbol */
  color: white;
  font-size: 14px;
  display: block;
  text-align: center;
  line-height: 18px;
}

ul[data-type="taskList"] label>div {
  flex: 1 1 auto;
}

[data-type="emoji"] {
  img {
    height: 1.2em;
    width: 1.2em;
  }

  @apply inline-block relative top-1
}

.tiptap {
  display: flex;
  flex-direction: column;
  margin: 1em 0;
}

.tiptap .ProseMirror {
  outline: none !important;
  padding: 1em 2px;
}

.tiptap .ProseMirror .search-result {
  background-color: rgba(255, 217, 0, 0.5);
}

.tiptap .ProseMirror .search-result-current {
  background-color: rgba(13, 255, 0, 0.5);
}
</style>