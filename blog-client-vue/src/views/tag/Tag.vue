<template>
  <page-header :index="3" :show-title="true" :title="title" />

  <div class="tags">
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
import { reactive, computed, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import ArticleWaterfall from '../../components/articleWaterfall/ArticleWaterfall.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import { scrollToTop } from '../../utils/utils'
import { Article, ResponseData } from '../../types'
import { getTagArticles } from '../../utils/api'

const route = useRoute()
const state = reactive({
  pageNum: 1,
  pageSize: 6,
  total: 0,
  list: [] as Array<Article>
})

const getArticleList = async (
  pageNum: number,
  name: string | string[] = route.params.name
): Promise<void> => {
  const { pageSize } = state
  const res: ResponseData<Article> = await getTagArticles(
    name,
    pageNum,
    pageSize
  )
  state.list = res.list
  state.total = res.total
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
  getArticleList(1, to.params.name)
})

onMounted(() => {
  getArticleList(1)
})
</script>

<style lang="less" scoped>
.tags {
  .container {
    max-width: 1130px;
    min-height: 300px;
    margin: 20px auto 0;
  }
}
</style>
