<template>
  <div
    class="bg-cover"
    :style="{ backgroundImage: `url(${state.detail.img_url})` }"
  >
    <div class="container">
      <h2 class="blog-title">{{ state.detail.title }}</h2>
    </div>
  </div>
  <div class="detail">
    <div class="main-content" :class="isFull ? 'full-content' : ''">
      <div class="artDetail box-shadow">
        <div class="article-info">
          <div class="tag-cate">
            <div class="article-tag">
              <span
                class="tag"
                v-for="tag of state.detail.tags"
                :key="tag._id"
                >{{ tag.name }}</span
              >
            </div>
            <div class="post-cate">
              <router-link class="cate" :to="`/category/${cateName}`">{{
                cateName
              }}</router-link>
            </div>
          </div>
          <div class="post-info">
            <span class="info-break-policy">
              <i class="iconfont icon-calendar2"></i>
              {{ formatDate(state.detail.date) }}
            </span>
            <span class="info-break-policy">
              <i class="iconfont icon-eye"></i>
              阅读次数：{{ state.detail.views }}
            </span>
          </div>
        </div>
        <hr class="divide clearfix" />
        <div class="article-content">
          <div class="article-desc">{{ state.detail.desc }}</div>
          <div class="markdown-body" v-highlight v-html="state.content"></div>
          <hr class="divide" />
          <Reprint name="在路上" :url="url" />
        </div>
      </div>

      <Comment
        class="box-shadow"
        :comments="state.comments"
        :total="state.total"
        :current-page="state.pageNum"
        :load-bottom="state.loadBottom"
        @comment="handleComment"
        @reply="handleReply"
        @more-click="loadMore"
      />
    </div>
    <div class="toc-aside" :style="{ display: isFull ? 'none' : 'block' }">
      <div class="toc-title">
        <i class="iconfont icon-list-alt"></i>&nbsp;&nbsp;目录
      </div>
      <div class="toc-content toc"></div>
    </div>
  </div>
  <FullButton @full-click="fullClick" />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'
import Comment from '../../components/comment/Comment.vue'
import FullButton from './FullButton.vue'
import Reprint from './Reprint.vue'
import http from '../../utils/http'
import { Article, Comments, ResponseData } from '../../types'
import { getCommentList } from '../../utils/api'
import marked from 'marked'

const route = useRoute()
const isFull = ref<boolean>(false)
const state = reactive({
  aid: '',
  pageNum: 1,
  pageSize: 10,
  total: 0,
  loadBottom: false,
  comments: [] as Array<Comments>,
  content: '',
  detail: {} as Article
})

// 初始化目录
const tocbotInit = (): void => {
  // eslint-disable-next-line
  tocbot.init({
    tocSelector: '.toc-content',
    contentSelector: '.markdown-body',
    headingSelector: 'h1, h2, h3',
    hasInnerContainers: true,
    headingsOffset: 80,
    scrollSmoothOffset: -80
  })
}

// 内容全屏
const fullClick = (): void => {
  isFull.value = !isFull.value
}

// 文章链接
const url = computed<string>(() => {
  return `${import.meta.env.VITE_LOCAL_URL}/detail/${route.params.id}`
})

// 获取文章详情
const getArticleDetail = async (): Promise<void> => {
  const id = route.params.id
  const res: Article = await http.get(`/article/detail?id=${id}`)
  state.detail = res
  state.aid = res._id
  state.content = marked(res.content)
  getComments()
  nextTick(() => tocbotInit())
}

// 获取评论列表
const getComments = async (): Promise<void> => {
  const { aid, pageNum, pageSize } = state
  const res: ResponseData<Comments> = await getCommentList(
    aid,
    pageNum,
    pageSize
  )
  state.comments = res.list
  state.total = res.total
}

// 格式化时间
const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

// 提交评论
const handleComment = async (param: any): Promise<void> => {
  await http({
    url: '/comment/add',
    method: 'POST',
    data: { aid: state.aid, ...param }
  })
  getComments()
}

// 回复评论
const handleReply = async (param: any): Promise<void> => {
  await http({
    url: '/comment/add',
    method: 'POST',
    data: { aid: state.aid, ...param }
  })
  getComments()
}

// 加载更多评论
const loadMore = async (param: any): Promise<void> => {
  state.pageNum = param
  state.loadBottom = true
  const { aid, pageNum, pageSize } = state
  const res: ResponseData<Comments> = await getCommentList(
    aid,
    pageNum,
    pageSize
  )
  state.loadBottom = false
  state.comments = [...state.comments, ...res.list]
}

// 分类名称
const cateName = computed(() => {
  return state.detail.category ? state.detail.category.name : '未分类'
})

onMounted(() => {
  getArticleDetail()
})

onBeforeUnmount(() => {
  // eslint-disable-next-line
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
  }

  .toc-aside {
    float: right;
    width: 25%;
    padding-left: 50px;
    position: -webkit-sticky;
    position: sticky;
    top: 52px;

    .toc-title {
      margin: 35px 0 15px 0;
      font-size: 18px;
      padding-left: 20px;
      font-weight: bold;
      line-height: 24px;
      color: #34495e;

      .iconfont {
        font-size: 18px;
        vertical-align: -1px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .detail {
    .main-content {
      width: 100%;
    }

    .toc-aside {
      display: none !important;
    }

    .artDetail {
      .article-content {
        padding: 0 30px 20px 32px;
      }
    }
  }
}

@media screen and (max-width: 602px) {
  .detail {
    .artDetail {
      .article-content {
        padding: 0 15px 20px 18px;
      }
    }
  }
}
</style>
