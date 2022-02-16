<template>
  <page-header :index="3" :show-title="true" :title="tagName" />

  <div class="tags">
    <div class="container">
      <ArticleWaterfall :list="list" />
      <Pagination
        v-if="total > pageSize"
        :current-page="pageNum"
        :page-size="pageSize"
        :total="total"
        @prev-click="currentChange"
        @next-click="currentChange"
      />
      <el-empty v-if="list.length === 0" description="No Data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import PageHeader from '@/components/pageHeader/PageHeader.vue'
import ArticleWaterfall from '@/components/articleWaterfall/ArticleWaterfall.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { scrollToTop } from '../../utils/utils'
import { getArticlesByTag } from '@/api/article'
import { Article } from '../../types'

const route = useRoute()
const pageNum = ref(6)
const pageSize = ref(6)
const total = ref(0)
const list = ref<Article[]>([])
const tagName = computed(() => route.params.name as string)

const _getArticlesByTag = async (
  page: number,
  name: string = tagName.value
) => {
  const {
    data: { data }
  } = await getArticlesByTag(name, page, pageSize.value)
  total.value = data.total
  list.value = data.list
}

const currentChange = (currentPage: number) => {
  scrollToTop()
  pageNum.value = currentPage
  _getArticlesByTag(currentPage)
}

// 路由更新钩子
onBeforeRouteUpdate((to) => {
  const name = to.params.name as string
  _getArticlesByTag(1, name)
})

onMounted(() => {
  _getArticlesByTag(1)
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
