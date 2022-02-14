<template>
  <header class="navbar">
    <nav
      class="navbar-wrapper"
      :class="isTransparent && !isShow ? 'transparent' : ''"
    >
      <div class="container">
        <h3 class="logo-container">
          <router-link to="/">Hzq's Blog</router-link>
        </h3>

        <button class="navbar-toggler" @click="showNav">
          <i
            class="iconfont"
            :class="isShow ? 'icon-off-search' : 'icon-menu2'"
          ></i>
        </button>

        <ul class="nav-list" :class="isShow ? 'show' : ''">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="isShow = false"
              >首页</router-link
            >
          </li>

          <li class="nav-item">
            <el-dropdown trigger="click">
              <span class="nav-link"
                >分类
                <i class="iconfont icon-arrowdown"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="cate in state.categories"
                    :key="cate._id"
                  >
                    <router-link
                      :to="`/category/${cate.name}`"
                      @click="isShow = false"
                      >{{ cate.name }}</router-link
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>

          <li class="nav-item">
            <router-link to="/archives" class="nav-link" @click="isShow = false"
              >归档</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/friends" class="nav-link" @click="isShow = false"
              >友链</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/contact" class="nav-link" @click="isShow = false"
              >留言</router-link
            >
          </li>

          <li class="nav-item">
            <router-link to="/about" class="nav-link" @click="isShow = false"
              >关于</router-link
            >
          </li>

          <li class="nav-item">
            <span class="nav-link search" @click="showDialog">
              <i class="iconfont icon-nav-search"></i>
            </span>
          </li>

          <li class="nav-item">
            <span class="nav-link theme" @click="switchTheme">
              <i
                class="iconfont"
                :class="isDark ? 'icon-light' : 'icon-dark'"
              ></i>
            </span>
          </li>
        </ul>
      </div>
    </nav>
    <SearchModal :dialogVisible="dialogVisible" @close="closeDialog" />
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import SearchModal from '../searchModal/SearchModal.vue'
import http from '../../utils/http'
import { Category, ResponseData } from '../../types'

defineProps({ isTransparent: Boolean })
const dialogVisible = ref<boolean>(false)
const isDark = ref<boolean>(false)
const isShow = ref<boolean>(false)
const state = reactive({
  categories: {} as any
})

// 显示搜索框
const showDialog = (): void => {
  dialogVisible.value = true
}

// 关闭搜索框
const closeDialog = (): void => {
  dialogVisible.value = false
}

const getCategory = async (): Promise<void> => {
  const res: ResponseData<Category> = await http.get('/category/list')
  state.categories = res.list
}

// 切换主题
const switchTheme = (): void => {
  const scheme = document.documentElement.getAttribute('data-color-scheme')
  if (scheme === 'dark') {
    document.documentElement.setAttribute('data-color-scheme', 'light')
    isDark.value = false
  } else {
    document.documentElement.setAttribute('data-color-scheme', 'dark')
    isDark.value = true
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
    opacity: 0.9;
    background-color: var(--navbar-bg-color);

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-container {
      padding: 0;
      margin: 0;
      height: 64px;
      line-height: 64px;
      font-weight: 400;

      a {
        color: #48dbfb;
        font-weight: 700;
        font-size: 18px;
      }
    }

    .nav-list {
      padding: 0;
      margin: 0;
      list-style: none;
      cursor: pointer;

      &::after {
        content: '';
        display: block;
        clear: both;
      }

      .nav-item {
        position: relative;
        float: left;

        &:nth-child(-n + 6):not(&:nth-child(2)) {
          &:hover {
            &::after {
              display: block;
            }
          }
          &::after {
            display: none;
            content: '';
            position: absolute;
            top: 26px;
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
      outline: none;
      cursor: pointer;

      &:focus {
        outline: none;
      }

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
