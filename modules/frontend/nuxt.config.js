export default {
  components: true,
  target: "server",
  modern: "client",

  head: {
    title: "Comic Stand",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Comic Stand は、無料の Web コミックを集めた漫画ポータルサイトです。" },
    ],
  },

  modules: [
    "@nuxtjs/pwa",
  ],

  pwa: {
    manifest: {
      lang: "ja",
    },
  },
};
