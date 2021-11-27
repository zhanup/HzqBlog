import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:name',
    name: 'Category',
    component: () =>
      import(
        /* webpackChunkName: "Category" */ '../views/category/Category.vue'
      )
  },
  {
    path: '/tags/:name',
    name: 'Tags',
    component: () =>
      import(/* webpackChunkName: "Tags" */ '../views/tag/Tag.vue')
  },
  {
    path: '/archives',
    name: 'Archives',
    component: () =>
      import(
        /* webpackChunkName: "Archives" */ '../views/archives/Archives.vue'
      )
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () =>
      import(/* webpackChunkName: "Friends" */ '../views/friends/Friends.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () =>
      import(/* webpackChunkName: "Contact" */ '../views/contact/Contact.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "aAbout" */ '../views/about/About.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () =>
      import(/* webpackChunkName: "Detail" */ '../views/detail/Detail.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // eslint-disable-next-line
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
