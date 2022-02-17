<template>
  <page-header :index="2" :show-title="true" title="归档" />

  <div class="archives">
    <div class="container">
      <archives-tag />
      <archives-list />
    </div>
  </div>
</template>

<script lang="ts" setup>
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import ArchivesTag from './components/ArchivesTag.vue'
import ArchivesList from './components/ArchivesList.vue'
</script>

<style lang="less" scoped>
.archives {
  .container {
    width: 95%;
    max-width: 1000px;
    position: relative;
    margin: -60px auto 20px;
    transition: padding 0.5s ease-in-out;
  }
}
</style>
