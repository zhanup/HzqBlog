<template>
  <article class="articles">
    <article-card
      class="article"
      v-for="article of list"
      :key="article._id"
      :article="article"
    />
  </article>
</template>

<script lang="ts" setup>
import { watch, PropType, nextTick } from 'vue'
import ArticleCard from './ArticleCard.vue'
import { Article } from '../../types'
import Macy from 'macy'

const props = defineProps({
  list: Array as PropType<Article[]>
})

// 瀑布流插件
const getMacy = () => {
  const masonry = new Macy({
    container: '.articles',
    trueOrder: false,
    waitForImages: false,
    margin: 20,
    columns: 3,
    breakAt: {
      1200: 3,
      940: 2,
      520: 1
    }
  })
  masonry.reInit()
}

watch(
  () => props.list,
  () => {
    nextTick(() => {
      getMacy()
    })
  }
)
</script>

<style lang="less" scoped>
.articles {
  transition: 0.3s ease-in-out;
}
</style>
