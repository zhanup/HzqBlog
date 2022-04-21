<template>
  <page-header :index="1" :showTitle="true" :title="title" />
  <div class="category">
    <div class="container">
      <ArticleWaterfall :list="state.list" />
      <Pagination
        v-if="state.total > state.pageSize"
        :current-page="state.pageNum"
        :page-size="state.pageSize"
        :total="state.total"
        @prev-click="currentChange"
        @next-click="currentChange"
      />
      <el-empty v-if="state.list.length === 0" description="No Data"></el-empty>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import ArticleWaterfall from '../../components/articleWaterfall/ArticleWaterfall.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import { getArticleListByCategory } from '@/api/article'
import { scrollToTop } from '../../utils/utils'
import { Article } from '../../types'

const route = useRoute()
const state = reactive({
  pageNum: 1,
  pageSize: 6,
  total: 0,
  list: [] as Array<Article>
})

const getArticleList = async (pageNum: number, name = route.params.name as string) => {
  const { pageSize } = state
  const { data } = await getArticleListByCategory(name, pageNum, pageSize)
  state.list = data.data.list
  state.total = data.data.total
}

const currentChange = (param: any) => {
  scrollToTop()
  state.pageNum = param
  getArticleList(param)
}

const title = computed(() => {
  return route.params.name as string
})

// 路由更新钩子
onBeforeRouteUpdate((to, form) => {
  getArticleList(1, to.params.name as string)
})

onMounted(() => {
  getArticleList(1)
})
</script>

<style lang="less" scoped>
.category {
  .container {
    max-width: 1130px;
    min-height: 300px;
    margin: 20px auto 0;
  }
}
</style>
