<template>
  <div class="page-header" :style="style" v-background="img">
    <div class="container">
      <h2 class="title" v-if="showTitle">{{ title }}</h2>
      <p class="saying" v-if="showSaying">生如夏花之绚烂, 死如秋叶之静美</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps({
  imgUrl: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 60
  },
  index: {
    type: Number,
    default: -1
  },
  title: {
    type: String,
    default: ''
  },
  saying: {
    type: String,
    default: ''
  },
  showTitle: {
    type: Boolean,
    default: false
  },
  showSaying: {
    type: Boolean,
    default: false
  }
})

const pictures = [
  'https://s2.loli.net/2022/02/14/gDpGSfd61CQItaq.jpg',
  'https://s2.loli.net/2022/02/14/mWwNX6MfsIqYeST.jpg',
  'https://s2.loli.net/2022/02/14/DNYkpSr9djwHKqu.jpg',
  'https://s2.loli.net/2022/02/14/eNqyEguClj8vYsP.jpg',
  'https://s2.loli.net/2022/02/14/q1horucnPDQmCB7.jpg',
  'https://s2.loli.net/2022/02/14/SIERNcx2obqJCAw.jpg',
  'https://s2.loli.net/2022/02/14/kOSXfw5GYN42v3x.jpg'
]

const style = computed(() => ({
  height: props.height + 'vh'
}))

const img = computed(() => {
  const { index, imgUrl } = toRefs(props)
  return index.value !== -1 ? pictures[index.value] : imgUrl.value
})

const vBackground = (el, binding) => {
  el.style.backgroundImage = `url(${binding.value})`
  // const img = new Image()
  // img.src = binding.value
  // img.onload = () => {
  //   console.log('load')
  //   el.style.backgroundImage = `url(${binding.value})`
  // }
}
</script>

<style scoped lang="less">
[data-color-scheme='dark'] .page-header {
  opacity: 0.8;
}

.page-header {
  position: relative;
  height: 60vh;
  width: 100%;
  padding: 0;
  border: 0;
  overflow: hidden;
  background-color: #eee;
  background-position: center center;
  background-size: cover;
  user-select: none;

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    max-width: 1125px;
    transform: translate(-50%, -50%);
  }

  .title {
    padding: 0;
    margin: 0;
    font-size: 32px;
    line-height: 1.5;
    margin-bottom: 12px;
    font-weight: bold;
    text-align: center;
    color: #eee;
    font-family: 楷体;
    margin-top: -30px;
  }

  .saying {
    padding: 0;
    margin: 0;
    font-size: 18px;
    text-align: center;
    color: #eee;
    font-family: 楷体;
  }
}
</style>
