<template>
  <div class="bg-cover">
    <div class="container">
      <h1 class="blog-title">留言</h1>
    </div>
  </div>
  <div class="contact">
    <div class="container">
      <div class="board box-shadow">
        <p>
          如果对本博客有任何建议或者疑问，欢迎在页面下方留言。但请不要发送包括但不限于以下的违禁内容：
        </p>
        <ul>
          <li><p>1、无意义发言</p></li>
          <li><p>2、脏话、粗话</p></li>
          <li><p>3、广告推广</p></li>
          <li><p>4、政治类讨论</p></li>
        </ul>
        <p>另外申请友链的同学还请先添加本站的链接再留言哦。</p>
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
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import Comment from '../../components/Comment.vue'
import http from '../../utils/http'
import { Comments, ResponseData } from '../../types'

const state = reactive({
  aid: '',
  total: 0,
  pageNum: 1,
  pageSize: 10,
  loadBottom: false,
  comments: [] as Array<Comments>
})

// 初始留言数据
const getComments = async (): Promise<void> => {
  const res: ResponseData<Comments> = await http({
    url: '/contact/list',
    params: {
      pageNum: 1,
      pageSize: state.pageSize
    }
  })
  state.comments = res.list
  state.total = res.total
  state.aid = res.aid
}

// 留言
const handleComment = async (param: any): Promise<void> => {
  await http({
    url: '/comment/add',
    data: { aid: state.aid, ...param },
    method: 'POST'
  })
  getComments()
}

// 回复评论
const handleReply = async (param: any): Promise<void> => {
  await http({
    url: '/comment/add',
    data: { aid: state.aid, ...param },
    method: 'POST'
  })
  getComments()
}

// 加载更多评论
const loadMore = async (param: any): Promise<void> => {
  state.pageNum = param
  state.loadBottom = true
  const res: ResponseData<Comments> = await http({
    url: '/comment/list',
    params: {
      article_id: state.aid,
      pageSize: 10,
      pageNum: state.pageNum
    }
  })
  state.loadBottom = false
  state.comments = [...state.comments, ...res.list]
}

onMounted(() => {
  getComments()
})
</script>

<style lang="less" scoped>
.bg-cover {
  background-image: url(/img/bg6.jpg);
}
.contact {
  .container {
    width: 95%;
    max-width: 1000px;
    margin: 0 auto 20px;
  }

  .board {
    margin-top: -60px;
    margin-bottom: 20px;
    border-radius: 10px;
    position: relative;
    padding: 40px 40px 40px 60px;
    transition: padding 0.5s ease-in-out;
    background-color: var(--board-bg-color);
    font-size: 16px;

    .title {
      margin: 0 0 10px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }

    p {
      margin: 0 0 10px;
    }

    ul {
      list-style: none;
      padding-left: 20px;
    }
  }

  .comment {
    padding: 40px 20px;
    border-radius: 10px;
    background-color: var(--board-bg-color);
  }
}

@media screen and (max-width: 601px) {
  .contact {
    .board {
      padding-right: 20px;
      padding-left: 30px;
    }
  }
}
</style>
