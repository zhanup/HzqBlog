<template>
  <page-header :index="2" :show-title="true" title="归档" />
  
  <div class="archives">
    <div class="container">
      <div class="tags-card box-shadow">
        <div class="chips">
          <router-link
            v-for="(item, index) in state.tags"
            :key="item._id"
            :to="`/tags/${item.name}`"
          >
            <span
              class="chip"
              :style="{ backgroundColor: color[index % 12] }"
              >{{ item.name }}</span
            >
          </router-link>
        </div>
      </div>

      <div class="archives-card box-shadow">
        <div class="card" v-for="value in state.archives" :key="value[0]">
          <h3 class="year">{{ value[0] }}年</h3>
          <div class="brick" v-for="item of value[1]" :key="item._id">
            <router-link class="item" :to="`/detail/${item._id}`">
              <span class="title f-thide">{{ item.title }}</span>
              <span class="time">{{ dayjs(item.date).format('MM-DD') }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import http from '../../utils/http'
import dayjs from 'dayjs'
import { Tag, Archives, ResponseData, Article } from '../../types'
import PageHeader from '../../components/pageHeader/PageHeader.vue'

const state = reactive({
  tags: [] as Array<Tag>,
  archives: new Map<string, Array<Article>>()
})

const color: string[] = [
  '#f9ebea',
  '#f5eef8',
  '#d5f5e3',
  '#e8f8f5',
  '#f8f9f9',
  '#82e0aa',
  '#d7bde2',
  '#a3e4d7',
  '#85c1e9',
  '#f8c471',
  '#f9e79f',
  '#fffff'
]

const getYear = (date: any): number => {
  return new Date(date).getFullYear()
}

const sort = (obj: any): Map<string, Array<Article>> => {
  const keys = Object.keys(obj).sort((a, b) => getYear(b) - getYear(a))
  const result: Map<string, Array<Article>> = new Map()
  keys.forEach((o) => {
    result.set(o, obj[o])
  })
  return result
}

const getTags = async (): Promise<void> => {
  const res: ResponseData<Tag> = await http.get('/tag/list')
  state.tags = res.list
}

const getArchives = async (): Promise<void> => {
  const res: Archives = await http.get('/article/archive')
  state.archives = sort(res)
}

onMounted(() => {
  getTags()
  getArchives()
})
</script>

<style lang="less" scoped>
.archives {
  .container {
    width: 95%;
    max-width: 1000px;
    position: relative;
    margin: -60px auto 20px;
    transition: padding 0.5s ease-in-out;
  }

  .tags-card {
    padding: 40px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: var(--board-bg-color);

    .header {
      margin: 0 0 10px;
      color: var(--text-color);
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }

    .chips {
      margin: 15px auto 10px;
      max-width: 850px;
      text-align: center;
    }

    .chip {
      margin: 10px 10px;
      padding: 19px 14px;
      display: inline-block;
      line-height: 0;
      font-size: 14.5px;
      font-weight: 500;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 3px 5px rgb(0 0 0 / 12%);
      transition: 0.3s ease-out;
      color: #34495e;

      &:hover {
        color: #fff;
        background: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
      }
    }
  }

  .archives-card {
    padding: 40px;
    border-radius: 10px;
    background-color: var(--board-bg-color);

    .header {
      margin: 0 0 20px;
      color: var(--text-color);
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }
  }

  .card {
    margin-bottom: 30px;
    .year {
      padding-bottom: 10px;
      margin: 0;
      color: var(--text-color);
      font-size: 18px;
      font-weight: bold;
    }
    .brick {
      margin-bottom: 10px;

      .item {
        display: flex;
        justify-content: space-between;

        .title {
          flex: 4;
          font-size: 14.5px;
        }

        .time {
          flex: 1;
          text-align: right;
          color: var(--sec-text-color);
          font-size: 14.5px;
        }
      }

      a {
        display: block;
        padding: 10px 5px;
        margin-left: 15px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

[data-color-scheme='dark'] .archives {
  .chip {
    opacity: 0.8;
  }
}

@media screen and (max-width: 601px) {
  .archives {
    .tags-card {
      padding: 20px;
    }

    .archives-card {
      padding: 20px;
    }
  }
}
</style>
