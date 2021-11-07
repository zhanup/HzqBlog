<template>
  <div class="bg-cover">
    <div class="container">
      <p class="blog-desc">生活不会惯着你，想要不被抛弃，必须自己争气</p>
    </div>
  </div>
  <div class="home">
    <div class="article-list">
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

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import ArticleWaterfall from '../../components/ArticleWaterfall.vue';
import Pagination from '../../components/Pagination.vue';
import { scrollToTop } from '../../utils/utils';
import { Article, ResponseData } from '../../types';
import { getHomeArticles } from '../../utils/api';

const state = reactive({
  pageNum: 1,
  pageSize: 6,
  total: 0,
  list: [] as Array<Article>
})

const getArticleList = async (pageNum: number): Promise<void> => {
  const pageSize = state.pageSize;
  const res: ResponseData<Article> = await getHomeArticles(pageNum, pageSize)
  state.list = res.list
  state.total = res.total;
}

// 分页
const currentChange = (param: any): void => {
  scrollToTop()
  state.pageNum = param
  getArticleList(param)
}

onMounted(() => {
  getArticleList(1)
})
</script>


<style lang="less" scoped>
.bg-cover {
  height: 100vh;

  .container {
    margin-top: 0;
  }
}
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
