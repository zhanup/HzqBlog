<template>
  <div>
    <el-dialog
      :model-value="dialogVisible"
      @close="closeDialog"
      :show-close="false"
      width="80%"
      custom-class="search-modal"
    >
      <template v-slot:title>
        <span class="title">
          <i class="iconfont icon-nav-search"></i>
          搜索
        </span>
        <input
          type="search"
          class="search-input"
          placeholder="请输入搜索的关键字"
          v-model="state.title"
          @input="handleInput"
        />
      </template>

      <ul class="result-list">
        <li class="result-item" v-for="item of state.list" :key="item._id">
          <router-link @click="closeDialog" :to="`/detail/${item._id}`">{{
            item.title
          }}</router-link>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import http from '../../utils/http'
import { debounce } from '../../utils/utils'
import { Article, ResponseData } from '../../types/index'

// eslint-disable-next-line
defineProps({
  dialogVisible: Boolean
})

// eslint-disable-next-line
const emit = defineEmits(['close'])
const state = reactive({
  title: '',
  list: [] as Array<Article>
})

// 搜索
const handleSearch = async (): Promise<void> => {
  const title = state.title
  if (title.trim() === '') {
    state.list = []
  } else {
    const res: ResponseData<Article> = await http({
      url: '/article/search',
      params: { title }
    })
    state.list = res.list
  }
}

const handleInput = debounce(handleSearch, 500)

// 关闭 Dialog
const closeDialog = (): void => {
  emit('close')
  state.title = ''
  state.list = []
}
</script>

<style lang="less" scoped>
.search-modal {
  opacity: 0;

  .title {
    font-size: 20px;

    i {
      font-size: 20px;
    }
  }

  .search-input {
    display: block;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--text-color);
    border-radius: 0;
    outline: none;
    height: 45px;
    width: 100%;
    font-size: 14px;
    margin: 0 0 8px 0;
    padding: 0;
    box-shadow: none;
    box-sizing: content-box;
    transition: box-shadow 0.3s, border 0.3s;
    color: var(--text-color);

    &::-webkit-input-placeholder {
      color: var(--sec-text-color);
    }

    &:focus {
      border-bottom: 1px solid #26a69a;
      box-shadow: 0 1px 0 0 #26a69a;
    }
  }

  .result-list {
    padding: 0;
    margin: 0;
    list-style: none;

    .result-item {
      border-bottom: 1px solid #e5e5e5;
      padding: 15px 0 5px 0;

      a {
        font-size: 20px;
        color: #42b983;
      }
    }
  }
}
</style>
