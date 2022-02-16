<template>
  <div class="article-info">
    <div class="tag-cate">
      <div class="article-tag">
        <span class="tag" v-for="tag of articleDetail.tags" :key="tag._id">{{
          tag.name
        }}</span>
      </div>
      <div class="post-cate">
        <router-link class="cate" :to="`/category/${categoryName}`">{{
          categoryName
        }}</router-link>
      </div>
    </div>
    <div class="post-info">
      <span class="info-break-policy">
        <i class="iconfont icon-calendar2"></i>
        {{ formatDate(articleDetail.date) }}
      </span>
      <span class="info-break-policy">
        <i class="iconfont icon-eye"></i>
        阅读次数：{{ articleDetail.views }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Article } from '@/types'

const props = defineProps({
  articleDetail: {
    type: Object as PropType<Article>,
    default: () => {}
  }
})

// 格式化时间
const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// 分类名称
const categoryName = computed(() => {
  return props.articleDetail.category
    ? props.articleDetail.category.name
    : '未分类'
})
</script>

<style scoped lang="less">
.article-info {
  padding: 15px 28px 0 20px;

  .tag-cate {
    padding-bottom: 15px;
    margin-bottom: 10px;
    display: flex;

    .article-tag {
      flex: 1;

      .tag {
        display: inline-block;
        font-size: 14.5px;
        font-weight: 400;
        height: 22px;
        line-height: 22px;
        color: var(--tag-text-color);
        border-radius: 15px;
        margin-right: 5px;
        margin-bottom: 2px;
        padding: 0 12px;
        background-color: #000;
        cursor: pointer;
      }
    }
    .post-cate {
      flex: 1;

      .cate {
        float: right;
        font-size: 14.5px;
        color: var(--link-color);
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }

      .iconfont {
        padding-right: 2px;
        vertical-align: -1px;
      }
    }
  }

  .post-info {
    font-size: 14.5px;
    color: var(--sec-text-color);
    padding-bottom: 20px;
    .info-break-policy {
      // display: inline-block;
      margin-bottom: 8px;
      margin-right: 15px;
      word-break: keep-all;
      float: left;

      .iconfont {
        font-size: 13px;
        padding-right: 2px;
      }
    }
  }
}
</style>
