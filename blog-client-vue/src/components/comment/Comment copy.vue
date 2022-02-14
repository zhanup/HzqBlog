<template>
  <div class="comment">
    <div class="v" data-class="v">
      <div class="vpanel">
        <div class="vwrap">
          <div class="vheader">
            <input
              class="vinput"
              v-model="comment.name"
              name="nick"
              type="text"
              placeholder="昵称"
            />
            <input
              class="vinput"
              v-model="comment.email"
              name="email"
              type="email"
              placeholder="邮箱"
            />
          </div>

          <div class="vedit">
            <textarea
              class="veditor vinput"
              v-model="comment.content"
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
              <button class="vsubmit vbtn" @click="onComment">提交</button>
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

      <div class="vcount" v-show="comments.length > 0">
        <span class="vnum">{{ total }}</span
        >评论
      </div>

      <div class="vcards" v-show="comments.length > 0">
        <div class="vcard" v-for="item in comments" :key="item._id">
          <img class="vimg" :src="item.avatar" />
          <div class="vh">
            <div class="vhead">
              <span class="vnick">{{ item.name }}</span>
              <span class="vsys">{{ uaBrowser(item.ua) }}</span>
              <span class="vsys">{{ uaOS(item.ua) }}</span>
            </div>

            <div class="vmeta">
              <span class="vtime">{{ howLongBefore(item.date) }}</span>
              <span class="vat" @click="openDialog(item._id, item.name)"
                >回复</span
              >
            </div>

            <div class="vcontent">
              <p>{{ item.content }}</p>
            </div>

            <div class="vquote">
              <div class="vcard" v-for="reply of item.replies" :key="reply._id">
                <img class="vimg" :src="reply.avatar" />
                <div class="vh">
                  <div class="vhead">
                    <span class="vnick">{{ reply.name }}</span>
                    <span class="vsys">{{ uaBrowser(reply.ua) }}</span>
                    <span class="vsys">{{ uaOS(reply.ua) }}</span>
                  </div>

                  <div class="vmeta">
                    <span class="vtime">{{ howLongBefore(reply.date) }}</span>
                    <span class="vat" @click="openDialog(item._id, reply.name)"
                      >回复</span
                    >
                  </div>

                  <div class="vcontent">
                    <p>
                      <span class="vwhom">@{{ reply.to_whom }}，</span
                      >{{ reply.content }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vload-bottom text-center" v-show="loadBottom">
        <i
          class="vspinner iconfont icon-load"
          style="width: auto; height: auto"
        ></i>
      </div>
      <div class="vempty" v-show="comments.length === 0">来发评论吧~</div>
      <div
        class="vpage txt-center"
        v-show="comments.length > 0 && comments.length < total && !loadBottom"
      >
        <button class="vmore vbtn" @click="more">加载更多...</button>
      </div>
    </div>

    <ReplyPanel
      @close="closeDialog"
      @reply="onReply"
      :reply-visible="replyVisible"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, PropType } from 'vue'
import ReplyPanel from '../replyModal/ReplyModal.vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import UAParser from 'ua-parser-js'
import emojiDataSource from '../../assets/data/emoji.json'
import { Comments } from '../../types'

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

const emit = defineEmits(['comment', 'reply', 'more-click'])

const emojiVisible = ref<boolean>(false)
const replyVisible = ref<boolean>(false)

const to_whom = ref<string>('')
const cid = ref<string>('')
const comment = reactive({
  name: '',
  email: '',
  content: ''
})

const emojiShow = (): void => {
  emojiVisible.value = !emojiVisible.value
}

// 向内容插入表情
const insertEmoji = (emoji: string): void => {
  comment.content += emoji
}

// 打开回复框
const openDialog = (id: string, name: string): void => {
  replyVisible.value = true
  cid.value = id
  to_whom.value = name
}

// 关闭回复框
const closeDialog = (): void => {
  replyVisible.value = false
}

const uaBrowser = (ua: string): string => {
  const u = UAParser(ua)
  return `${u.browser.name} ${u.browser.version}`
}

const uaOS = (ua: string): string => {
  const u = UAParser(ua)
  return `${u.os.name} ${u.os.version}`
}

// 提交评论
const onComment = (): void => {
  const { name, email, content } = comment
  if (name.trim() === '') {
    ElMessage.error('请输入昵称')
  } else if (email.trim() === '') {
    ElMessage.error('请输入邮箱')
  } else if (!/^\w+@[0-9a-z]+.[a-z]{2,5}$/.test(email.trim())) {
    ElMessage.error('邮箱格式有误')
  } else if (content.trim() === '') {
    ElMessage.error('请输入内容')
  } else {
    emit('comment', comment)
    comment.content = ''
  }
}

// 显示多久之前评论，超过一年直接返回日期
const howLongBefore = (date: string): string => {
  const d1 = dayjs(date)
  const d2 = dayjs()

  if (d2.diff(d1, 'month') > 17) {
    return d1.format('YYYY-MM-DD')
  } else {
    dayjs.extend(relativeTime)
    return d1.from(d2)
  }
}

// 提交回复
const onReply = (param: any): void => {
  emit('reply', {
    cid: cid.value,
    to_whom: to_whom.value,
    ...param
  })
}

// 加载更多评论
const more = (): void => {
  if (props.comments.length < props.total) {
    emit('more-click', props.currentPage + 1)
  }
}
</script>

<style lang="less">
.v[data-class='v'] * {
  box-sizing: border-box;
  line-height: 1.75;
}

.text-right {
  text-align: right;
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
</style>

<style lang="less" scoped>
.comment {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: var(--board-bg-color);
  padding: 20px;
  transition: padding 0.5s ease-in-out;
  border-radius: 10px;
}
.v[data-class='v'] {
  font-size: 16px;
  text-align: left;

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

  .vicon {
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    // fill: #555;
    fill: var(--text-color);
    vertical-align: middle;
  }

  .vsys,
  .vtime {
    color: #b3b3b3;
  }

  .txt-center {
    text-align: center;
  }

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

  .vcount {
    padding: 5px;
    font-weight: 600;
    font-size: 20px;
  }

  .vcards {
    width: 100%;

    .vcard {
      padding-top: 20px;
      position: relative;
      display: block;

      &::after {
        content: '';
        display: block;
        clear: both;
      }

      .vimg {
        width: 50px;
        height: 50px;
        float: left;
        border-radius: 50%;
        margin-right: 12px;
        border: 1px solid #f5f5f5;
        padding: 2px;
      }

      .vh {
        overflow: hidden;
        padding-bottom: 0.5em;
        border-bottom: 1px dashed #f5f5f5;

        .vmeta {
          line-height: 1;
          position: relative;

          .vat {
            font-size: 13px;
            color: #ef2f11;
            cursor: pointer;
            float: right;
          }
        }

        .vtime {
          font-size: 12px;
          margin-right: 14px;
        }
      }

      &:last-child {
        .vh {
          border-bottom: none;
        }
      }

      .vhead {
        line-height: 1.5;
        margin-top: 0;

        .vnick {
          position: relative;
          font-size: 14.5px;
          margin-right: 14px;
          color: #1abc9c;
          text-decoration: none;
          display: inline-block;
        }

        .vsys {
          display: inline-block;
          padding: 3px 8px;
          font-size: 12px;
          border-radius: 3px;
          margin-right: 5px;
        }
      }

      .vcontent {
        word-wrap: break-word;
        word-break: break-all;
        font-size: 14.5px;
        line-height: 2;
        position: relative;
        margin-bottom: 12px;
        padding-top: 10px;

        p {
          margin-top: 0;
          margin-bottom: 16px;
        }

        .vwhom {
          font-size: 14.5px;
          color: #1abc9c;
          user-select: none;
        }
      }

      .vquote {
        padding-left: 16px;
        border-left: 1px dashed rgba(238, 238, 238, 0.5);

        .vimg {
          width: 35px;
          height: 35px;
        }
      }
    }
  }

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

  .vpage {
    .vmore {
      margin: 14px 0;
    }
  }
}

@media screen and (max-width: 601px) {
  .comment {
    padding-left: 10px;
    padding-right: 10px;
  }

  .v[data-class='v'] {
    .vsys {
      display: none !important;
    }
  }
}
</style>
