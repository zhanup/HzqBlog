<template>
  <page-header
    :img-url="detail.img_url"
    :title="detail.title"
    :showTitle="true"
  />
  <div class="detail">
    <div class="main-content" :class="isFull ? 'full-content' : ''">
      <div class="artDetail box-shadow">
        <detail-header :article-detail="detail" />
        <hr class="divide clearfix" />
        <detail-content :article-detail="detail" />
      </div>
      <detail-comment :aid="detail._id" />
    </div>
    <detail-aside v-show="!isFull" />
  </div>
  <FullButton @full-click="fullClick" />
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import DetailHeader from './components/DetailHeader.vue'
import DetailContent from './components/DetailContent.vue'
import DetailAside from './components/DetailAside.vue'
import DetailComment from './components/DetailComment.vue'
import FullButton from './components/FullButton.vue'
import { getArticleDetail } from '@/api/article'
import { Article } from '../../types'

const route = useRoute()
const isFull = ref<boolean>(false)
const detail = ref<Article>({} as Article)

// 初始化目录
const tocbotInit = (): void => {
  tocbot.init({
    tocSelector: '#toc-content',
    contentSelector: '#article-body',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    headingsOffset: 80,
    scrollSmoothOffset: -80
  })
}

// 内容全屏
const fullClick = () => {
  isFull.value = !isFull.value
}

// 获取文章详情
const _getArticleDetail = async () => {
  const id = route.params.id as string
  const {
    data: { data }
  } = await getArticleDetail(id)
  detail.value = data
  nextTick(() => tocbotInit())
}

onMounted(() => {
  _getArticleDetail()
})

onBeforeUnmount(() => {
  tocbot.destroy()
})
</script>

<style lang="less" scoped>
.detail {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  .main-content {
    float: left;
    width: 75%;
  }

  .full-content {
    width: 100%;
  }

  .artDetail {
    position: relative;
    margin-top: -60px;
    background-color: var(--board-bg-color);
    border-radius: 10px;
  }
}

@media screen and (max-width: 992px) {
  .main-content  {
    width: 100% !important;
  }
}
</style>
