<template>
  <div class="vcount">
    <span class="vnum">{{ total }}</span
    >评论
  </div>
</template>

<script setup lang="ts">
defineProps({
  total: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped lang="less">
.vcount {
  padding: 5px;
  font-weight: 600;
  font-size: 20px;
}
</style>
