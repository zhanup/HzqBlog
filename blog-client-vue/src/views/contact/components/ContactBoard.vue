<template>
  <div class="board box-shadow">
    <p>
      如果对本博客有任何建议或者疑问，欢迎在页面下方留言。但请不要发送包括但不限于以下的违禁内容：
    </p>
    <ul>
      <li><p>1、无意义发言</p></li>
      <li><p>2、脏话、粗话</p></li>
      <li><p>3、广告推广</p></li>
      <li><p>4、政治类讨论</p></li>
    </ul>
    <p>另外申请友链的同学还请先添加本站的链接再留言哦。</p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.board {
  margin-top: -60px;
  margin-bottom: 20px;
  border-radius: 10px;
  position: relative;
  padding: 40px 40px 40px 60px;
  transition: padding 0.5s ease-in-out;
  background-color: var(--board-bg-color);
  font-size: 16px;

  .title {
    margin: 0 0 10px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }

  p {
    margin: 0 0 10px;
  }

  ul {
    list-style: none;
    padding-left: 20px;
  }
}

@media screen and (max-width: 601px) {
  .contact {
    .board {
      padding-right: 20px;
      padding-left: 30px;
    }
  }
}
</style>
