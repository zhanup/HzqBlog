<template>
  <div class="paging">
    <div class="container">
      <div>
        <span class="prev-btn" :class="prevDisabled" @click="prevClick">
          <i class="iconfont icon-arrowleft"></i>
        </span>
      </div>
      <div>
        <span class="page-info">{{currentPage}} / {{pageCount}}</span>
      </div>
      <div>
        <span class="next-btn" :class="nextDisabled" @click="nextClick">
          <i class="iconfont icon-arrowright"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 5
  },
  total: {
    type: Number,
    default: 5
  }
})
const emit = defineEmits(['prev-click', 'next-click'])

const pageCount = computed(() => {
  const { pageSize, total } = props

  let count = Math.floor(total / pageSize);
  if (total % pageSize > 0) {
    count += 1;
  }
  return count;
})

const prevDisabled = computed(() => (
  props.currentPage === 1 ? 'disabled' : ''
))

const nextDisabled = computed(() => (
  props.currentPage === pageCount.value ? 'disabled' : ''
))

const prevClick = (): void => {
  const { currentPage } = props

  if (currentPage > 1) {
    emit('prev-click', currentPage - 1)
  }
}

const nextClick = () :void => {
  const { currentPage } = props
  if (currentPage < pageCount.value) {
    emit('next-click', currentPage + 1)
  }
}
</script>

<style lang="less" scoped>
.paging {
  margin: 0 auto 15px;
  user-select: none;

  .container {
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: space-between;
  }

  .disabled {
    background-color: #ccc !important;
    cursor: default !important;
    color: #9F9F9F !important;
    box-shadow: none !important;
  }

  .page-info {
    font-size: 16px;
    color: var(--text-color);
  }

  .prev-btn,
  .next-btn {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 3px 3px 0 rgb(0 0 0 / 14%), 0 1px 7px 0 rgb(0 0 0 / 12%), 0 3px 1px -1px rgb(0 0 0 / 20%);
    background-color: var(--btn-bg-color);
    color: #fff;

    &:hover {
      color: #000;
    }

    .iconfont {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>