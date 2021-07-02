<template>
  <div>
    <h2 className="list-title">
      {{ title }}
    </h2>
    <div>
      <figure v-for="comic in comics" :key="comic.title" class="comic">
        <img
          :src="comic.thumbnailURL"
          :alt="comic.title"
          class="thumbnail"
          decoding="async"
        >
        <figcaption>{{ comic.title }}</figcaption>
        <div class="latest-episode">
          {{ comic.episodes[0].title }}<br>
          {{ new Date(comic.episodes[0].publishedAt).toLocaleDateString("ja-JP") }} 更新
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    comics: Array,
  },
};
</script>

<style lang="scss" scoped>
$thumbnail-size: 120px;

.list-title {
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
}

.comic {
  display: grid;
  grid-template-rows: $thumbnail-size / 2;
  grid-template-columns: $thumbnail-size 1fr;
  gap: 15px;

  padding: 10px;

  border-style: solid;
  border-bottom-width: 1px;
  border-color: #c0c0c0;

  &:first-child {
    border-top-width: 1px;
  }

  & > .thumbnail {
    grid-row: 1/3;
    grid-column: 1/2;

    width: $thumbnail-size;
    height: $thumbnail-size;

    box-shadow: 5px 5px 5px 0px #e5e5e5;
  }

  & > figcaption {
    grid-row: 1/2;
    grid-column: 2/3;

    font-size: 1.125em;
    font-weight: bold;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > .latest-episode {
    grid-row: 2/3;
    grid-column: 2/3;

    font-size: 1em;
  }
}
</style>
