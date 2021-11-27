<template>
  <div class="toc-btn">
    <button class="full-btn" @click="fullClick">
      <i class="iconfont icon-list"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['full-click'])
const fullClick = (): void => {
  emit('full-click')
}
</script>

<style lang="less" scoped>
.toc-btn {
  position: fixed;
  right: 20px;
  bottom: 80px;

  .full-btn {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    outline: none;
    background-color: #26a69a;
    color: var(--navbar-text-color);
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
      0 1px 5px 0 rgb(0 0 0 / 20%);

    .iconfont {
      font-size: 20px;
      line-height: 40px;
    }
  }
}

@media screen and (max-width: 992px) {
  .toc-btn {
    display: none;
  }
}
</style>
