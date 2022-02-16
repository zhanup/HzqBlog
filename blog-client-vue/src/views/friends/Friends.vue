<template>
  <page-header :index="4" :show-title="true" title="友链" />

  <div class="friends">
    <div class="container box-shadow">
      <friend-info />
      <hr class="divide" />
      <friends-list :list="list" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import PageHeader from '../../components/pageHeader/PageHeader.vue'
import FriendInfo from './components/FriendsInfo.vue'
import FriendsList from './components/FriendsList.vue'
import { useLinkStore } from '@/store/link'
import { Link } from '../../types'

const link = useLinkStore()
const list = computed<Link[]>(() => link.list)

onMounted(() => {
  link.getLinks()
})
</script>
<style lang="less" scoped>
.friends {
  .container {
    width: 95%;
    max-width: 1000px;
    margin: 0 auto 20px;
    margin-top: -60px;
    padding: 40px;
    background-color: var(--board-bg-color);
    border-radius: 10px;
    position: relative;
  }
}

@media screen and (max-width: 992px) {
  .friends {
    .container {
      padding: 40px 30px 20px 32px;
    }
  }
}

@media screen and (max-width: 602px) {
  .friends {
    .container {
      padding: 40px 15px 20px 18px;
    }
  }
}
</style>
