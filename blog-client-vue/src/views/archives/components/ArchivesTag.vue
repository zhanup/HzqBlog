<template>
  <div class="tags-card box-shadow">
    <div class="chips">
      <router-link
        v-for="(item, index) in list"
        :key="item._id"
        :to="`/tags/${item.name}`"
      >
        <span class="chip" :style="{ backgroundColor: color[index % 12] }">{{
          item.name
        }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTagStore } from '@/store/tag'
import { Tag } from '@/types'

const tag = useTagStore()
const list = computed<Tag[]>(() => tag.list)

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

onMounted(() => {
  tag.getTags()
})
</script>

<style scoped lang="less">
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

[data-color-scheme='dark'] .chip {
  opacity: 0.8;
}

@media screen and (max-width: 601px) {
  .tags-card {
    padding: 20px;
  }
}
</style>
