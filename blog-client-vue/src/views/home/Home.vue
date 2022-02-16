<template>
  <page-header :index="0" :height="100" :showSaying="true" saying="生如夏花之绚烂, 死如秋叶之静美" />
  <div class="home">
    <div class="article-list">
      <ArticleWaterfall :list="list" />
      <Pagination
        v-if="total > pageSize"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="total"
        @prev-click="currentChange"
        @next-click="currentChange"
      />
      <el-empty v-if="list.length === 0" description="No Data"></el-empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import ArticleWaterfall from '../../components/articleWaterfall/ArticleWaterfall.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import { scrollToTop } from '../../utils/utils'
import { Article } from '../../types'
import { getArticleList } from '@/api/article'

const pageNum = ref(1)
const pageSize = ref(18)
const total = ref(0)
const list = ref<Article[]>([])

const _getArticleList = async (pageNum: number) => {
  const { data } = await getArticleList(pageNum, pageSize.value)
  list.value = data.data.list
  total.value = data.data.total
}

// 分页
const currentChange = (page: number) => {
  scrollToTop()
  pageNum.value = page
  _getArticleList(page)
}

onMounted(() => {
  _getArticleList(1)
})
</script>

<style lang="less" scoped>
.home {
  .article-list {
    max-width: 1125px;
    width: 90%;
    margin: 20px auto 10px;
  }
}

@media screen and (max-width: 601px) {
  .home {
    .article-list {
      width: 95%;
    }
  }
}
</style>
