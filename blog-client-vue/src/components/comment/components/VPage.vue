<template>
  <div class="vpage text-center">
    <button class="vmore vbtn" @click="loadMore">加载更多...</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['moreClick'])

const loadMore = () => {
  emit('moreClick')
}
</script>

<style scoped lang="less">
.vbtn {
  transition-duration: 0.4s;
  text-align: center;
  color: #555;
  border: 1px solid #ededed;
  border-radius: 4px;
  display: inline-block;
  background: transparent;
  margin-bottom: 0;
  font-weight: 400;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 15px;
  font-size: 0.875em;
  line-height: 1.5;
  user-select: none;
  outline: none;

  &:hover {
    color: #3090e4;
    border-color: #3090e4;
  }
}

.vpage {
  text-align: center;

  .vmore {
    margin: 14px 0;
  }
}
</style>
