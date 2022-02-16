<template>
  <div class="article-content">
    <div class="article-desc">{{ articleDetail.desc }}</div>
    <div class="markdown-body" id="article-body" v-highlight v-html="content"></div>
    <hr class="divide" />
    <Reprint name="在路上" :url="url" />
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Reprint from './Reprint.vue'
import marked from 'marked'
import { Article } from '@/types'

const props = defineProps({
  articleDetail: {
    type: Object as PropType<Article>,
    default: () => {}
  }
})

const route = useRoute()
const content = ref('')

// 文章链接
const url = computed<string>(() => {
  return `${import.meta.env.VITE_LOCAL_URL}/detail/${route.params.id}`
})

watch(
  () => props.articleDetail,
  () => {
    content.value = marked(props.articleDetail.content)
  }
)
</script>

<style scoped lang="less">
.article-content {
  padding: 0 50px 20px 50px;
  background-color: var(--board-bg-color);
  color: var(--text-color);
  border-radius: 10px;

  .article-desc {
    position: relative;
    padding: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    border: initial;
    color: var(--text-color);
    border-left: 5px solid #42b983;
    background-color: var(--desc-bg-color);
    border-radius: 3px;
    font-size: 16px;
    line-height: 1.85rem;
  }
}

@media screen and (max-width: 992px) {
  .article-content {
    padding: 0 30px 20px 32px;
  }
}

@media screen and (max-width: 602px) {
  .article-content {
    padding: 0 15px 20px 18px;
  }
}
</style>
