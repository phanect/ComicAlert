<script>
export default {
  async asyncData() {
    return {
      favs: [
        {
          url: "https://comic.mag-garden.co.jp/psychoss2/",
          title: "PSYCHO-PASS サイコパス Sinners of the System Case.2 First Guardian",
          thumbnailURL:"https://comic.mag-garden.co.jp/wordpress/wp-content/uploads/psychoss2-thumb.jpg",
          concluded:false,
          episodes:[
            {
              title:"第1話",
              pcURL:"/assets/files/psychoss2190215/HTML5/pc.html",
              mobileURL:"/assets/files/psychoss2190215/HTML5/sd.html",
              publishedAt:"2019-02-16T09:52:15.169Z",
              expiresAt:null,
            },
          ],
        },
        {
          url:"https://comic.mag-garden.co.jp/graveyard/",
          title:"グレイヴヤードの捩じくれた家",
          thumbnailURL:"https://comic.mag-garden.co.jp/wordpress/wp-content/uploads/graveyard-thumb.jpg",
          concluded:false,
          episodes:[
            {
              title:"第2話",
              pcURL:"/assets/files/graveyard190210/HTML5/pc.html",
              mobileURL:"/assets/files/graveyard190210/HTML5/sd.html",
              publishedAt:"2019-02-16T09:52:17.333Z",
              expiresAt:null,
            },
            {
              title:"第1話",
              pcURL:"/assets/files/graveyard190110/HTML5/pc.html",
              mobileURL:"/assets/files/graveyard190110/HTML5/sd.html",
              publishedAt:"2019-02-16T09:52:17.333Z",
              expiresAt:null,
            },
          ],
        },
      ],
    };
  },
}
</script>

<template>
  <main>
    <comic-list title="お気に入り" :comics="favs" />
    <comic-list title="新連載・読切" :comics="favs" />
    <comic-list title="更新" :comics="favs" />
  </main>
</template>
