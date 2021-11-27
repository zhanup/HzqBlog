<template>
  <div class="reprint">
    <div class="reprint__author">
      <span class="reprint-meta">
        <i class="iconfont icon-user"></i>
        文章作者:
      </span>
      <span class="reprint-info">
        <a href="/about" rel="external nofollow noreferrer">{{ name }}</a>
      </span>
    </div>
    <div class="reprint__type">
      <span class="reprint-meta">
        <i class="iconfont icon-link-fill"></i>
        文章链接:
      </span>
      <span class="reprint-info">
        <a :href="url">{{ url }}</a>
      </span>
    </div>
    <div class="reprint__notice">
      <span class="reprint-meta">
        <i class="iconfont icon-copyright"></i>
        版权声明:
      </span>
      <span class="reprint-info">
        本博客所有文章除特別声明外，均采用
        <a
          href="https://creativecommons.org/licenses/by/4.0/deed.zh"
          rel="external nofollow noreferrer"
          target="_blank"
          >CC BY 4.0</a
        >
        许可协议。转载请注明来源
        <a href="/about" target="_blank">{{ name }}</a
        >！
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line
defineProps({
  name: String,
  url: String
})
</script>

<style lang="less" scoped>
.reprint {
  margin: 15px 0 6px;
  padding: 8px 12px;
  border: 1px solid #eee;
  line-height: 2;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px 0 rgb(232 237 250 / 60%),
      0 4px 8px 0 rgb(232 237 250 / 50%);
  }

  .reprint-meta {
    font-weight: bold;
  }

  .reprint-info {
    word-break: break-all;
    line-height: 2;

    a {
      color: var(--link-color);
    }
  }
}
</style>
