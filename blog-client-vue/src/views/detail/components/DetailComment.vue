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
import { ref, toRefs, watch } from 'vue'
import Comment from '@/components/comment/Comment.vue'
import { getCommentList, addComment } from '@/api/comment'
import { Comments } from '@/types'

const props = defineProps({
  aid: {
    type: String,
    default: ''
  }
})

const { aid } = toRefs(props)
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const loadBottom = ref(false)
const comments = ref<Comments[]>([])

const _getCommentList = async () => {
  const {
    data: { data }
  } = await getCommentList(aid.value, pageNum.value, pageSize.value)
  comments.value = data.list
  total.value = data.total
}

const loadMore = async (currentPage: number) => {
  pageNum.value = currentPage
  loadBottom.value = true
  const {
    data: { data }
  } = await getCommentList(aid.value, pageNum.value, pageSize.value)
  loadBottom.value = false
  comments.value = [...comments.value, ...data.list]
}

const handleComment = async (args) => {
  await addComment({ aid: aid.value, ...args })
  pageNum.value = 1
  _getCommentList()
}

watch(aid, () => {
  _getCommentList()
})
</script>
