<template>
  <div class="article">
    <div class="card box-shadow">
      <router-link :to="`/detail/${article?._id}`">
        <div class="card-image">
          <img v-lazy="article?.img_url" alt="img" />
          <span class="card-title">{{ article?.title }}</span>
        </div>
      </router-link>
      <div class="card-content">
        <div class="summary f-thide3">{{ article?.desc }}</div>
        <div class="publish-info">
          <span class="publish-date">
            <i class="iconfont icon-schedule"></i>
            {{ formatDate(article.date) }}
          </span>
          <router-link
            class="publish-author"
            :to="`/category/${
              article.category ? article.category.name : '未分类'
            }`"
            >{{
              article.category ? article.category.name : '未分类'
            }}</router-link
          >
        </div>
      </div>
      <div class="card-action">
        <router-link
          v-for="(tag, index) of article?.tags"
          :key="index"
          :to="`/tags/${tag.name}`"
        >
          <span class="chip">{{ tag.name }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Article } from '../../types'

defineProps({
  article: {
    type: Object as PropType<Article>,
    default: () => {}
  }
})

const formatDate = (date: string) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
</script>

<style scoped lang="less">
.card {
  background-color: var(--board-bg-color);
  border-radius: 8px;
  overflow: hidden;

  .card-image {
    position: relative;

    img {
      display: block;
      border-radius: 5px 5px 0 0;
      position: relative;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 220px;
      filter: brightness(0.7);
    }

    .card-title {
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      max-width: 100%;
      padding: 24px;
      font-size: 24px;
      font-weight: 300;
    }
  }

  .card-content {
    padding: 15px 15px 12px 18px;
    border-radius: 0 0 2px 2px;

    .summary {
      font-size: 14.5px;
      padding-bottom: 2px;
      margin-bottom: 6px;
      word-break: break-all;
      overflow: hidden;
      position: relative;
      line-height: 20px;
      max-height: 60px;
      text-align: justify;
      margin-right: -10px;
      padding-right: 10px;
    }

    .publish-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .publish-date {
      font-size: 14.5px;
      color: var(--sec-text-color);

      .iconfont {
        font-size: 12px;
        font-weight: 700;
        vertical-align: 1px;
      }
    }

    .publish-author {
      font-size: 14.5px;
      color: var(--sec-text-color);

      &:hover {
        font-weight: bold;
        color: var(--link-color);
        text-decoration: underline;
      }
      .iconfont {
        font-size: 13px;
      }
    }
  }

  .card-action {
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    position: relative;
    padding: 10px 15px 10px 18px;
    border-radius: 0 0 8px 8px !important;

    .chip {
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
      margin-right: 5px;
      margin-bottom: 2px;
      padding: 0 12px;
      font-size: 12px;
      font-weight: 400;
      height: 25px;
      line-height: 24px;
      background-color: #3a3f3d;
      color: var(--tag-text-color);
      border-radius: 15px;
    }
  }
}
</style>
