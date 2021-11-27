<template>
  <div class="reply">
    <el-dialog
      :model-value="replyVisible"
      :show-close="false"
      @close="closeDialog"
      custom-class="reply-modal"
    >
      <div class="v" data-class="v">
        <div class="vpanel">
          <div class="vwrap">
            <div class="vheader">
              <input
                class="vinput"
                v-model="reply.name"
                name="nick"
                type="text"
                placeholder="昵称"
              />
              <input
                class="vinput"
                v-model="reply.email"
                name="email"
                type="email"
                placeholder="邮箱"
              />
            </div>

            <div class="vedit">
              <textarea
                class="veditor vinput"
                v-model="reply.content"
              ></textarea>
            </div>

            <div class="vrow">
              <div class="vcol">
                <span title="表情" class="vicon" @click="emojiShow">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="16172"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z"
                      p-id="16173"
                    />
                    <path
                      d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z"
                      p-id="16174"
                    />
                    <path
                      d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z"
                      p-id="16175"
                    />
                    <path
                      d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z"
                      p-id="16176"
                    />
                  </svg>
                </span>
              </div>
              <div class="vcol text-right">
                <button class="vsubmit vbtn" @click="onSubmit">提交</button>
              </div>
            </div>

            <div class="vemojis" v-show="emojiVisible">
              <i
                v-for="item of emojiDataSource"
                :key="item.name"
                :name="item.name"
                :title="item.name"
                @click="insertEmoji(item.content)"
                >{{ item.content }}</i
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import emojiDataSource from '../assets/data/emoji.json'

// eslint-disable-next-line
defineProps({
  replyVisible: Boolean
})

// eslint-disable-next-line
const emit = defineEmits(['reply', 'close'])
const emojiVisible = ref<boolean>(false)
const reply = reactive({
  name: '',
  email: '',
  content: ''
})

// 关闭 Dialog
const closeDialog = (): void => {
  emit('close')
}

// 控制表情包面板
const emojiShow = (): void => {
  emojiVisible.value = !emojiVisible.value
}

// 向文本框插入表情
const insertEmoji = (emoji: string): void => {
  reply.content += emoji
}

// 体检回复
const onSubmit = (): void => {
  const { name, email, content } = reply
  if (name.trim() === '') {
    ElMessage.error('请输入昵称')
  } else if (email.trim() === '') {
    ElMessage.error('请输入邮箱')
  } else if (!/^\w+@[0-9a-z]+.[a-z]{2,5}$/.test(email.trim())) {
    ElMessage.error('邮箱格式有误')
  } else if (content.trim() === '') {
    ElMessage.error('请输入内容')
  } else {
    emit('reply', reply)
    emit('close')
    reply.content = ''
  }
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

  .vwrap {
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    position: relative;
    padding: 10px;

    .vinput {
      width: 50%;
      border-bottom: 1px dashed #dedede;
      background: transparent;
    }

    .vedit {
      position: relative;
      padding-top: 10px;

      .veditor {
        overflow: hidden;
        overflow-wrap: break-word;
        resize: none;
        border: none;
      }
    }

    .vemojis {
      /* display: none; */
      font-size: 18px;
      max-height: 145px;
      overflow: auto;
      padding-bottom: 10px;
      box-shadow: 0 0 1px #f0f0f0;

      i {
        font-style: normal;
        padding: 7px 0;
        width: 38px;
        cursor: pointer;
        text-align: center;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }

  .vinput {
    border: none;
    resize: none;
    outline: none;
    padding: 10px 5px;
    max-width: 100%;
    font-size: 12.5px;

    &:focus {
      border-bottom-color: #eb5055;
    }
  }

  .veditor {
    width: 100% !important;
    min-height: 122px;
    font-size: 12.5px;
    background: transparent;
    resize: vertical;
    transition: all 0.25s ease;
    color: var(--text-color);
  }

  .vrow {
    font-size: 0;
    padding: 10px 0;

    .vcol {
      width: 50%;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
    }
  }

  .text-right {
    text-align: right;
  }

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

  .vicon {
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    // fill: #555;
    fill: var(--text-color);
    vertical-align: middle;
  }
}
</style>
