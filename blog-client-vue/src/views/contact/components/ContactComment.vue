<template>
  <Comment
    class="box-shadow"
    :comments="comments"
    :total="total"
    :current-page="pageNum"
    :load-bottom="loadBottom"
    @comment="handleComment"
    @reply="handleComment"
    @more-click="loadMore"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Comment from '@/components/comment/Comment.vue'
import { getContactComments, addComment } from '@/api/comment'
import { Comments } from '@/types'


const aid = ref('')
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loadBottom = ref(false)
const comments = ref<Comments[]>([])

const _getComments = async () => {
  const {
    data: { data }
  } = await getContactComments(pageNum.value, pageSize.value)
  comments.value = data.list
  aid.value = data.aid
  total.value = data.total
}

const loadMore = async (currentPage: number) => {
  pageNum.value = currentPage
  loadBottom.value = true
  const {
    data: { data }
  } = await getContactComments(pageNum.value, pageSize.value)
  loadBottom.value = false
  comments.value = [...comments.value, ...data.list]
}

const handleComment = async (args) => {
  await addComment({ aid: aid.value, ...args })
  pageNum.value = 1
  _getComments()
}

onMounted(() => {
  _getComments()
})
</script>

<style scoped lang="less">
.comment {
  padding: 40px 20px;
  border-radius: 10px;
  background-color: var(--board-bg-color);
}
</style>
