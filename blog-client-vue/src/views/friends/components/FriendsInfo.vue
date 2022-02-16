<template>
  <div class="info">
    <h3 class="header">申请友链须知：</h3>
    <ul class="list">
      <li>
        <p>
          1、本站与技术类写作类、生活类、情感类、兴趣类等各类博客互换友链，且具有原创高质量文章、经常更新的站优先。
        </p>
      </li>
      <li>
        <p>2、不与含有色情、暴力、政治敏感或其他法律法规禁止的网站互换。</p>
      </li>
      <li>
        <p>3、申请链接前请先添加本博链接，通过留言板页面留言或邮件告知。</p>
      </li>
      <li>
        <p>
          4、请提供网站名称、网站链接、网站描述（12字以内）、网站图标或头像。
        </p>
      </li>
      <li>
        <p>
          5、本站会定期对所有友链进行检查，如果发现一月内不能访问或者六个月内没有内容更新可能会取消该友链。
        </p>
      </li>
    </ul>
    <h3 class="header">我的博客资料：</h3>
    <ul class="list">
      <li>
        <p>名称：在路上</p>
      </li>
      <li>
        <p>简介：承认自己的无知,乃是开启智慧的大门</p>
      </li>
      <li>
        <p>
          地址：
          <a :href="localUrl" target="_blank" rel="noopener">{{ localUrl }}</a>
        </p>
      </li>
      <li>
        <p>
          头像：
          <a
            :href="`${localUrl}/img/avatar.jpg`"
            target="_blank"
            rel="noopener"
            >{{ localUrl + '/img/avatar.jpg' }}</a
          >
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const localUrl = import.meta.env.VITE_LOCAL_URL
</script>

<style scoped lang="less">
.info {
  font-size: 16px;

  .header {
    margin-top: 0;
    margin-bottom: 10px;
    color: var(--text-color);
    font-size: 16px;
    font-weight: bold;
  }

  .list {
    list-style: none;
    padding-left: 20px;

    p {
      margin-top: 0;
      margin-bottom: 10px;
      word-break: break-all;
    }

    li {
      line-height: 1.5;
    }
  }

  a {
    color: var(--link-color);

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
