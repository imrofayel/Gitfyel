<template>
  <div class="flex flex-col rounded-xl pt-4">

    <div class="flex justify-between py-3 items-center">
      <div><div class="inline-flex items-center">
        <label
          class="relative flex cursor-pointer items-center rounded-full p-3"
          for="borders"
          data-ripple-dark="true"
        >
          <input
            id="borders"
            type="checkbox"
            v-model="showBorders"
            class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#1e1f22] before:opacity-0 before:transition-opacity checked:border-[#1e1f22] checked:bg-[#1e1f22] checked:before:bg-[#1e1f22] hover:before:opacity-10"
          />
          <span class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label class="cursor-pointer" for="borders">
          Borders
        </label>
      </div>

      <div class="inline-flex items-center ml-3.5">
        <label class="flex items-center cursor-pointer relative" for="privateCommits">
          <input type="checkbox"
            class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#1e1f22] before:opacity-0 before:transition-opacity checked:border-[#1e1f22] checked:bg-[#1e1f22] checked:before:bg-[#1e1f22] hover:before:opacity-10"
            id="privateCommits"
            v-model="showPrivateCommits"
          />
          <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
              stroke="currentColor" stroke-width="1">
              <path fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"></path>
            </svg>
          </span>
        </label>
        <label class="cursor-pointer ml-3" for="privateCommits">
          Private Commits
        </label>
      </div></div>

      <Menu as="div" class="text-left">
        <MenuButton
          class="bg-[#1e1f22] text-white rounded-full px-2.5 py-1 flex items-center transition-transform duration-100 active:scale-952"
        >
          <span class="roboto-mono px-1.5 py-1 outline-none focus:ring-0 text-base">{{ selectedTheme || 'Select Theme' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 24 24" class="items-center flex justify-center">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="m6 9l6 6l6-6" />
          </svg>
        </MenuButton>
        
        <transition enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
          <MenuItems
            class="z-10 absolute right-[50px] sm:right-[130px] mt-4 origin-top-right divide-y divide-gray-100 rounded-xl dark:border-none bg-white shadow-inner border overflow-hidden max-h-60 overflow-y-auto dropdown-menu roboto-mono"
          >
            <div>
              <div>
                <MenuItem v-for="theme in themes" :key="theme" v-slot="{ active }">
                  <button
                    :class="[
                      'block roboto-mono w-full px-4 pr-20 py-2 text-left'
                    ]"
                    @click="selectTheme(theme)"
                  >
                    {{ theme }}
                  </button>
                </MenuItem>
              </div>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <div class="flex flex-wrap">
      <div v-for="(stat, key) in computedStats" :key="key" class="flex">
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
import { computed, ref } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

const userBucket = useUserBucket();
const { userName } = storeToRefs(userBucket);

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
});

const selectedTheme = ref('default');
const showBorders = ref(true);
const showPrivateCommits = ref(true);

const themes = [
  'Default', 'Dark', 'Radical', 'Merko', 'Gruvbox', 'Tokyonight', 'One Dark', 'Cobalt', 'Synthwave', 'High Contrast', 'Dracula', 'Prussian', 'Monokai', 'Vue', 'Vue Dark', 'Shades of Purple', 'Night Owl', 'Buefy', 'Blue-Green', 'Algolia', 'Great Gatsby', 'Bear', 'Solarized Dark', 'Solarized Light', 'Chartreuse Dark', 'Nord', 'Gotham', 'Material Palenight', 'Graywhite', 'Vision Friendly Dark', 'Ayu Mirage', 'Midnight Purple', 'Calm', 'Flag India', 'Omni', 'React', 'Jolly', 'Maroongold', 'Yeblu', 'Blurberry', 'Slateorange', 'Kacho Ga', 'Outrun'
];

function addImage(url: string) {
  if (url && props.editor) {
    props.editor.chain().focus().setImage({ src: url }).run()
  }
}

function selectTheme(theme: string) {
  selectedTheme.value = theme;
}

interface Stat {
  link: string;
  alt: string;
  onClick: () => void;
}

interface ComputedStats {
  rank: Stat;
  streak: Stat;
  languages: Stat;
}

const computedStats = computed<ComputedStats>(() => {
  const formattedTheme = selectedTheme.value.split(' ').join('-').toLowerCase();
  const hideBorder = !showBorders.value;
  const countPrivate = showPrivateCommits.value;
  return {
    rank: {
      link: `https://github-readme-stats.vercel.app/api?username=${userName.value}&theme=${formattedTheme}&show_icons=true&hide_border=${hideBorder}&count_private=${countPrivate}`,
      alt: 'GitHub Stats',
      onClick: () => {
        addImage(`https://github-readme-stats.vercel.app/api?username=${userName.value}&theme=${formattedTheme}&show_icons=true&hide_border=${hideBorder}&count_private=${countPrivate}`);
      },
    },
    streak: {
      link: `https://github-readme-streak-stats.herokuapp.com/?user=${userName.value}&theme=${formattedTheme}&hide_border=${hideBorder}`,
      alt: 'GitHub Streak Stats',
      onClick: () => {
        addImage(`https://github-readme-streak-stats.herokuapp.com/?user=${userName.value}&theme=${formattedTheme}&hide_border=${hideBorder}`);
      },
    },
    languages: {
      link: `https://github-readme-stats.vercel.app/api/top-langs/?username=${userName.value}&theme=${formattedTheme}&show_icons=true&hide_border=${hideBorder}&layout=compact`,
      alt: 'GitHub Top Languages',
      onClick: () => {
        addImage(`https://github-readme-stats.vercel.app/api/top-langs/?username=${userName.value}&theme=${formattedTheme}&show_icons=true&hide_border=${hideBorder}&layout=compact`);
      },
    },
  };
});
</script>

<style>

/* Styles remain unchanged */
.dropdown-menu {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.dropdown-menu::-webkit-scrollbar {
  width: 0px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0);
}

.dropdown-menu::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}

</style>
