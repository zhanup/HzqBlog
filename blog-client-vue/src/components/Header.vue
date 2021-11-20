<template>
  <header class="navbar">
    <nav class="navbar-wrapper" :class="(isTransparent && !isShow) ? 'transparent' : ''">
      <div class="container">
        <h3 class="logo-container">
          <router-link tag="h3" to="/">Hzq's Blog</router-link>
        </h3>

        <button class="navbar-toggler" @click="showNav">
          <i class="iconfont" :class="isShow ? 'icon-off-search' : 'icon-menu2'"></i>
        </button>

        <ul class="nav-list" :class="isShow ? 'show' : ''">
          <li class="nav-item" @click="isShow = false">
            <router-link to="/" class="nav-link">首页</router-link>
          </li>

          <li class="nav-item dropdown">
            <span
              class="nav-link dropdown-link"
              @click="isOpen = !isOpen"
              tabindex="0"
              @blur="isOpen = false"
            >
              分类
              <i class="iconfont icon-arrowdown"></i>
            </span>
            <ul class="dropdown-menu" :style="{ display: isOpen ? 'block' : 'none' }">
              <li class="dropdown-item" v-for="cate in state.categories" :key="cate._id">
                <router-link
                  :to="`/category/${cate.name}`"
                  @mousedown="jumpTo(cate.name)"
                >{{ cate.name }}</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item" @click="isShow = false">
            <router-link to="/archives" class="nav-link">归档</router-link>
          </li>

          <li class="nav-item" @click="isShow = false">
            <router-link to="/friends" class="nav-link">友链</router-link>
          </li>

          <li class="nav-item" @click="isShow = false">
            <router-link to="/contact" class="nav-link">留言</router-link>
          </li>

          <li class="nav-item" @click="isShow = false">
            <router-link to="/about" class="nav-link">关于</router-link>
          </li>

          <li class="nav-item">
            <span class="nav-link search" @click="showDialog">
              <i class="iconfont icon-nav-search"></i>
            </span>
          </li>

          <li class="nav-item">
            <span class="nav-link theme" @click="switchTheme">
              <i class="iconfont" :class="isDark ? 'icon-light' : 'icon-dark'"></i>
            </span>
          </li>
        </ul>
      </div>
      <SearchModal :dialogVisible="dialogVisible" @close="closeDialog" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import SearchModal from './SearchModal.vue'
import http from '../utils/http'
import { Category, ResponseData } from '../types'

defineProps({ isTransparent: Boolean })
const router = useRouter()
const dialogVisible = ref<boolean>(false)
const isOpen = ref<boolean>(false)
const isDark = ref<boolean>(false)
const isShow = ref<boolean>(false)
const state = reactive({
  categories: {} as any
})

// 显示搜索框
const showDialog = (): void => {
  dialogVisible.value = true;
}

// 关闭搜索框
const closeDialog = (): void => {
  dialogVisible.value = false;
}

const getCategory = async (): Promise<void> => {
  const res: ResponseData<Category> = await http.get('/category/list')
  state.categories = res.list
}

// 切换主题
const switchTheme = (): void => {
  const scheme = document.documentElement.getAttribute('data-user-color-scheme')
  if (scheme === 'dark') {
    document.documentElement.setAttribute('data-user-color-scheme', 'light')
    isDark.value = false;
  }
  else {
    document.documentElement.setAttribute('data-user-color-scheme', 'dark')
    isDark.value = true;
  }
}

// 控制导航栏显示
const showNav = (): void => {
  if (isShow.value === true) {
    isShow.value = false
  } else {
    isShow.value = true
  }
}

const jumpTo = (name: string) => {
  isShow.value = false
  router.push(`/category/${name}`)
}

onMounted(() => {
  getCategory()
})
</script>

<style lang="less" scoped>
.navbar {
  user-select: none;

  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 64px;
    background-color: var(--navbar-bg-color);

    .container {
      max-width: 1200px;
      line-height: 64px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
    }

    .logo-container {
      padding: 0;
      margin: 0;
      height: 64px;
      line-height: 64px;
      font-weight: 400;

      a {
        color: var(--navbar-text-color);
        font-weight: 700;
        font-size: 18px;
      }
    }

    .nav-list {
      padding: 0;
      margin: 0;
      list-style: none;

      &::after {
        content: " ";
        display: block;
        clear: both;
      }

      .nav-item {
        float: left;
        position: relative;

        &:nth-child(-n + 5) {
          &:hover {
            &::after {
              display: block;
            }
          }
          &::after {
            display: none;
            content: "";
            position: absolute;
            top: 50px;
            left: calc(50% - 25px);
            width: 50px;
            height: 2px;
            background-color: #ff6666;
          }
        }
      }
      .nav-link {
        font-size: 14.5px;
        font-weight: 700;
        padding: 0 15px;
        display: inline-block;
        color: var(--navbar-text-color);
        transition: color 0.2s, background-color 0.2s;

        .icon-arrowdown {
          font-size: 14px;
          font-weight: bold;
        }
      }

      .search {
        cursor: pointer;
        i {
          font-size: 16px;
          color: var(--navbar-text-color);
        }
      }

      .theme {
        cursor: pointer;
        i {
          font-size: 18px;
          color: var(--navbar-text-color);
        }
      }
    }

    .navbar-toggler {
      display: none;
      padding: 0;
      margin: 0;
      background: none;
      border: none;
      height: 64px;
      line-height: 64px;
      cursor: pointer;

      i {
        color: var(--navbar-text-color);
        font-size: 24px;
      }
    }
  }
}
.show {
  display: block !important;
}

.transparent {
  background-color: transparent !important;
}

.dropdown {
  position: relative;
  &:hover {
    .dropdown-menu {
      display: block;
    }
  }
  .dropdown-menu {
    // display: none;
    position: absolute;
    top: 70px;
    left: -10px;
    border-radius: 10px;
    padding: 10px 0;
    list-style: none;
    background-color: var(--navbar-bg-color);

    .dropdown-item {
      min-width: 100px;
      padding: 0 20px;
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      line-height: 36px;
      text-align: center;
      color: var(--navbar-text-color);
      position: relative;

      &:hover {
        &::after {
          display: block;
        }
      }

      &::after {
        display: none;
        content: "";
        position: absolute;
        top: 32px;
        left: calc(50% - 35%);
        width: 70%;
        height: 0;
        border-bottom: 2px solid #ff6666;
      }

      a {
        color: var(--navbar-text-color);
      }
    }
  }
}

@media screen and (max-width: 980px) {
  .navbar {
    .nav-list {
      display: none;
      position: absolute;
      width: 100%;
      top: 64px;
      left: 0;
      padding: 0;
      background-color: var(--navbar-bg-color);

      .nav-item {
        float: none !important;
        line-height: 24px;
        border-bottom: 1px solid #3d3e3f;

        &:nth-child(-n + 5) {
          &:hover {
            &::after {
              display: none !important;
            }
          }
        }

        .nav-link {
          display: block;
          padding: 5px 20px;
        }
      }
    }

    .navbar-toggler {
      display: block !important;
    }
  }

  .dropdown {
    .dropdown-menu {
      max-width: 100px;
      position: fixed;
      top: 131px;
      left: 70%;
    }
  }
}
</style>