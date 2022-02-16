<template>
  <div class="links">
    <a
      class="card"
      v-for="link in list"
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
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Link } from '@/types'

defineProps({
  list: {
    type: Array as PropType<Link[]>,
    default: () => []
  }
})

// 随机获取颜色
const getColor = () => {
  const red = Math.round(Math.random() * 256)
  const green = Math.round(Math.random() * 256)
  const blue = Math.round(Math.random() * 256)
  return `rgb(${red},${green},${blue})`
}
</script>

<style scoped lang="less">
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

@media screen and (max-width: 992px) {
  .links {
    .card {
      width: calc(50% - 20px);
    }
  }
}

@media screen and (max-width: 602px) {
  .links {
    .card {
      margin: 10px 0;
      width: 100%;
    }
  }
}
</style>
