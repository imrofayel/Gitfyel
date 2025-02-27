// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-10-06',
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxtjs/color-mode'],

  runtimeConfig: {
    public: {
      githubToken: process.env.GITHUB_TOKEN,
      geminiApiKey: process.env.GEMINI_API_KEY
    }
  }
})