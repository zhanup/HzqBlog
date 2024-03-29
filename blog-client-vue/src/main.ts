import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
// import hljs from 'highlight.js'
import lazyPlugin from 'vue3-lazy'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import './assets/css/element.less'
// import 'highlight.js/styles/base16/dracula.css'

hljs.configure({ ignoreUnescapedHTML: true })

const app = createApp(App)

app.directive('highlight', (el) => {
  el.querySelectorAll('pre code').forEach((block: any) => {
    hljs.highlightElement(block)
  })
})

// 图片懒加载
lazyPlugin.install(app, {
  loading: '/img/default.gif',
  error: '/img/default.gif'
})

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')
