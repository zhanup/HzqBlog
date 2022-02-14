<template>
  <div class="vcards">
    <v-card
      v-for="c in comments"
      :key="c._id"
      :comment-detail="c"
      v-bind="$attrs"
    >
      <v-card
        v-for="r in c.replies"
        :key="r._id"
        :cid="c._id"
        :comment-detail="r"
        v-bind="$attrs"
      />
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import VCard from './VCard.vue'
import { Comments } from '../../../types'

defineProps({
  comments: {
    type: Array as PropType<Array<Comments>>,
    default: () => []
  }
})
</script>

<style scoped lang="less">
.vcards {
  width: 100%;
}
</style>
