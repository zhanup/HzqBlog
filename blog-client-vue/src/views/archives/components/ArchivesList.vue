<template>
  <div class="archives-card box-shadow">
    <div class="card" v-for="index in archivesIndex" :key="index">
      <h3 class="year">{{ index }}年</h3>
      <div class="brick" v-for="item of archives[index]" :key="item._id">
        <router-link class="item" :to="`/detail/${item._id}`">
          <span class="title f-thide">{{ item.title }}</span>
          <span class="time">{{ dayjs(item.date).format('MM-DD') }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { getArchives } from '@/api/article'
import { Archives } from '@/types'

const archives = ref<Archives>({})
const archivesIndex = ref<string[]>([])

const _getArchives = async () => {
  const { data: { data } } = await getArchives()
  
  archives.value = data
  archivesIndex.value = Object.keys(data).sort((a, b) => Number(b) - Number(a))
}


onMounted(() => {
  _getArchives()
})
</script>

<style scoped lang="less">
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

@media screen and (max-width: 601px) {
  .archives-card {
    padding: 20px;
  }
}
</style>
