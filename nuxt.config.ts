// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/styles.css'],
  compatibilityDate: '2024-10-06',
  modules: ['@nuxt/content', '@nuxt/ui', '@pinia/nuxt'],
})