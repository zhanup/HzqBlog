<template>
  <footer class="footer">
    <div class="container">
      <p class="copyright">
        Copyright © {{ vintage }} Hzq's Blog，All rights reserved.
      </p>
      <p>
        本站所有内容遵循
        <a
          rel="license"
          target="_blank"
          href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans"
          >CC BY-NC 4.0 协议</a
        >，转载须注明署名和出处，且不可用于商业用途。若与其他同步平台协议冲突，以本网站为准
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const vintage = computed<string>(() => {
  const year = dayjs().format('YYYY')
  return year === '2021' ? '2021' : `2021 - ${year}`
})
</script>

<style lang="less" scoped>
.footer {
  padding-top: 25px;
  padding-bottom: 1px;
  text-align: center;
  color: var(--navbar-text-color);
  background-color: var(--navbar-bg-color);
  opacity: 0.8;

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto 20px;

    p {
      font-size: 14.5px;
      margin: 0;
      margin-bottom: 10px;
    }

    a {
      color: var(--link-color);
    }
  }
}
</style>
