import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import hljs from 'highlight.js';
import 'element-plus/dist/index.css'
import './assets/css/element.less'
import 'highlight.js/styles/base16/dracula.css'

hljs.configure({ ignoreUnescapedHTML: true })

const app = createApp(App)

app.directive('highlight', (el) => {
  el.querySelectorAll('pre code').forEach((block: any) => {
    hljs.highlightElement(block);
  })
})

app.use(ElementPlus)
app.use(router)
app.mount('#app')
