<template>
  <div class="comment">
    <div class="v" data-class="v">
      <v-panel @submit="onSubmit" />
      <v-count :total="total" v-if="showComments" />
      <v-cards v-if="showComments" :comments="comments" @reply="openDialog" />

      <div class="vload-bottom text-center" v-show="loadBottom">
        <i
          class="vspinner iconfont icon-load"
          style="width: auto; height: auto"
        />
      </div>
      <div class="vempty" v-if="comments.length === 0">来发评论吧~</div>
      <v-page v-if="showPage" v-bind="$attrs" />
    </div>

    <reply-modal
      @close="closeDialog"
      @reply="onReply"
      :visible="replyVisible"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType, toRefs } from 'vue'
import VPanel from './components/VPanel.vue'
import VCount from './components/VCount.vue'
import VCards from './components/VCards.vue'
import VPage from './components/VPage.vue'
import ReplyModal from '../replyModal/ReplyModal.vue'
import { Comments } from '../../types'

interface Comment {
  name: string
  email: string
  content: string
}

const props = defineProps({
  comments: {
    type: Array as PropType<Array<Comments>>,
    default: () => []
  },
  currentPage: {
    type: Number,
    default: 1
  },
  total: {
    type: Number,
    default: 0
  },
  loadBottom: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['comment', 'reply'])

const replyVisible = ref<boolean>(false)
const to_whom = ref<string>('')
const cid = ref<string>('')

const showComments = computed(() => {
  return props.comments.length > 0
})

const showPage = computed(() => {
  const { comments, total, loadBottom } = toRefs(props)
  return (
    comments.value.length > 0 &&
    comments.value.length < total.value &&
    !loadBottom.value
  )
})

// 打开回复框
const openDialog = ({ id, name }) => {
  replyVisible.value = true
  cid.value = id
  to_whom.value = name
}

// 关闭回复框
const closeDialog = () => {
  replyVisible.value = false
}

// 提交评论
const onSubmit = (comment: Comment) => {
  emit('comment', comment)
}

// 提交回复
const onReply = (args) => {
  emit('reply', {
    cid: cid.value,
    to_whom: to_whom.value,
    ...args
  })
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: var(--board-bg-color);
  padding: 20px;
  transition: padding 0.5s ease-in-out;
  border-radius: 10px;
}

.v[data-class='v'] * {
  box-sizing: border-box;
  line-height: 1.75;
}

.text-center {
  text-align: center;
}

.vspinner {
  width: 22px;
  height: 22px;
  display: inline-block;
  border: 6pxdouble #a0a0a0;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin 1s infinite linear;
  position: relative;
  vertical-align: middle;
  margin: 0 5px;
}

.v[data-class='v'] {
  font-size: 16px;
  text-align: left;

  .vload-bottom {
    .iconfont {
      font-size: 24px;
    }
  }

  .vempty {
    padding: 20px;
    text-align: center;
    color: #555;
    overflow: auto;
  }
}

@media screen and (max-width: 601px) {
  .comment {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
