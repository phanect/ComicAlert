export default {
  components: true,

  buildModules: [
    "@nuxt/typescript-build",
  ],

  modules: [
    "@nuxtjs/pwa",
  ],

  pwa: {
    manifest: {
      lang: "ja",
    }
  },
}
