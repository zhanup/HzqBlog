<template>
  <div class="reply">
    <el-dialog
      :model-value="visible"
      :show-close="false"
      @close="closeDialog"
      custom-class="reply-modal"
    >
      <div class="v" data-class="v">
        <v-panel @submit="reply" />
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import VPanel from '../comment/components/VPanel.vue'

interface Comment {
  name: string
  email: string
  content: string
}

defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'reply', comment: Comment): void
  (e: 'close'): void
}>()

// 关闭 Dialog
const closeDialog = (): void => {
  emit('close')
}

const reply = (comment: Comment) => {
  emit('reply', comment)
  emit('close')
}
</script>

<style lang="less" scoped>
.reply {
  .el-dialog {
    &:deep(.el-dialog__header) {
      display: none;
    }
  }
}
.v[data-class='v'] * {
  box-sizing: border-box;
  line-height: 1.75;
}

.v[data-class='v'] {
  font-size: 16px;
  text-align: left;
}
</style>
