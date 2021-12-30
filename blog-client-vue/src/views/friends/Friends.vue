<template>
  <div class="bg-cover">
    <div class="container">
      <h1 class="blog-title">友链</h1>
    </div>
  </div>
  <div class="friends">
    <div class="container box-shadow">
      <div class="info">
        <h3 class="header">申请友链须知：</h3>
        <ul class="list">
          <li>
            <p>
              1、本站与技术类写作类、生活类、情感类、兴趣类等各类博客互换友链，且具有原创高质量文章、经常更新的站优先。
            </p>
          </li>
          <li>
            <p>2、不与含有色情、暴力、政治敏感或其他法律法规禁止的网站互换。</p>
          </li>
          <li>
            <p>3、申请链接前请先添加本博链接，通过留言板页面留言或邮件告知。</p>
          </li>
          <li>
            <p>
              4、请提供网站名称、网站链接、网站描述（12字以内）、网站图标或头像。
            </p>
          </li>
          <li>
            <p>
              5、本站会定期对所有友链进行检查，如果发现一月内不能访问或者六个月内没有内容更新可能会取消该友链。
            </p>
          </li>
        </ul>
        <h3 class="header">我的博客资料：</h3>
        <ul class="list">
          <li>
            <p>名称：在路上</p>
          </li>
          <li>
            <p>简介：承认自己的无知,乃是开启智慧的大门</p>
          </li>
          <li>
            <p>
              地址：
              <a :href="localUrl" target="_blank" rel="noopener"
                >{{localUrl}}</a
              >
            </p>
          </li>
          <li>
            <p>
              头像：
              <a
                :href="`${localUrl}/img/avatar.jpg`"
                target="_blank"
                rel="noopener"
                >{{localUrl + '/img/avatar.jpg'}}</a
              >
            </p>
          </li>
        </ul>
      </div>
      <hr class="divide" />
      <div class="links">
        <a
          class="card"
          v-for="link in state.list"
          :key="link._id"
          :href="link.url"
          target="_blank"
          :style="{ backgroundColor: getColor() }"
        >
          <div class="image">
            <img :src="link.icon" :alt="link.name" />
          </div>
          <div class="content">
            <div class="name">{{ link.name }}</div>
            <div class="desc">{{ link.desc }}</div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import http from '../../utils/http'
import { Link, ResponseData } from '../../types'

const state = reactive({
  list: [] as Array<Link>
})

const localUrl = import.meta.env.VITE_LOCAL_URL

// 获取友链数据
const getLinks = async (): Promise<void> => {
  const res: ResponseData<Link> = await http.get('/link/list')
  state.list = res.list
}

// 随机获取颜色
const getColor = (): string => {
  const red = Math.round(Math.random() * 256)
  const green = Math.round(Math.random() * 256)
  const blue = Math.round(Math.random() * 256)
  return `rgb(${red},${green},${blue})`
}

onMounted(() => {
  getLinks()
})
</script>
<style lang="less" scoped>
.bg-cover {
  background-image: url(/img/bg5.jpg);
}

.friends {
  .container {
    width: 95%;
    max-width: 1000px;
    margin: 0 auto 20px;
    margin-top: -60px;
    padding: 40px;
    background-color: var(--board-bg-color);
    border-radius: 10px;
    position: relative;
  }

  .links {
    min-height: 200px;
    display: flex;
    flex-wrap: wrap;

    .card {
      width: calc(33.33% - 20px);
      margin: 10px;
      border-radius: 5px;
      background-color: rgb(52, 152, 219);
      display: flex;
      flex-direction: column;

      .image {
        width: 70px;
        margin: 10px auto 0;

        img {
          width: 70px;
          height: 70px;
          border-radius: 100%;
        }
      }

      .content {
        padding: 10px 14px;
        text-align: center;

        .name {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #fff;
        }

        .desc {
          font-size: 14.5px;
          line-height: 1.5;
          color: #fff;
        }
      }
    }
  }

  .info {
    font-size: 16px;

    .header {
      margin-top: 0;
      margin-bottom: 10px;
      color: var(--text-color);
      font-size: 16px;
      font-weight: bold;
    }

    .list {
      list-style: none;
      padding-left: 20px;

      p {
        margin-top: 0;
        margin-bottom: 10px;
        word-break: break-all;
      }

      li {
        line-height: 1.5;
      }
    }

    a {
      color: var(--link-color);

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .friends {
    .container {
      padding: 40px 30px 20px 32px;
    }

    .links {
      .card {
        width: calc(50% - 20px);
      }
    }
  }
}

@media screen and (max-width: 602px) {
  .friends {
    .container {
      padding: 40px 15px 20px 18px;
    }

    .links {
      .card {
        margin: 10px 0 !important;
        width: 100% !important;
      }
    }
  }
}
</style>
