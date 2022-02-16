<template>
  <page-header :index="5" :show-title="true" title="留言" />

  <div class="contact">
    <div class="container">
      <contact-board />
      <contact-comment />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import ContactBoard from './components/ContactBoard.vue'
import ContactComment from './components/ContactComment.vue'
</script>

<style lang="less" scoped>
.contact {
  .container {
    width: 95%;
    max-width: 1000px;
    margin: 0 auto 20px;
  }
}
</style>
