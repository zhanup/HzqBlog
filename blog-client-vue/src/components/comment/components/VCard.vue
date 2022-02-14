<template>
  <div class="vcard">
    <img class="vimg" :src="commentDetail.avatar" />
    <div class="vh">
      <div class="vhead">
        <span class="vnick">{{ commentDetail.name }}</span>
        <span class="vsys">{{ uaBrowser(commentDetail.ua) }}</span>
        <span class="vsys">{{ uaOS(commentDetail.ua) }}</span>
      </div>

      <div class="vmeta">
        <span class="vtime">{{ howLongBefore(commentDetail.date) }}</span>
        <span
          class="vat"
          @click="replyClick(commentDetail._id, commentDetail.name)"
          >回复</span
        >
      </div>

      <div class="vcontent">
        <p>
          <span v-if="commentDetail.to_whom" class="vwhom">
            @{{ commentDetail.to_whom }}，
          </span>
          {{ commentDetail.content }}
        </p>
      </div>

      <div class="vquote">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UAParser from 'ua-parser-js'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

interface CommentDetail {
  _id: string
  name: string
  content: string
  avatar: string
  date: string
  ua: string
  to_whom?: string
}

const props = defineProps<{
  commentDetail: CommentDetail,
  cid?: string
}>()

const emit = defineEmits<{
  (e: 'reply', { name }: { id: string; name: string }): void
}>()

const uaBrowser = (ua: string) => {
  const u = UAParser(ua)
  return `${u.browser.name} ${u.browser.version}`
}

const uaOS = (ua: string) => {
  const u = UAParser(ua)
  return `${u.os.name} ${u.os.version}`
}

// 显示多久之前评论，超过一年直接返回日期
const howLongBefore = (date: string) => {
  const d1 = dayjs(date)
  const d2 = dayjs()

  if (d2.diff(d1, 'month') > 17) {
    return d1.format('YYYY-MM-DD')
  } else {
    dayjs.extend(relativeTime)
    return d1.from(d2)
  }
}

// 回复
const replyClick = (id: string, name: string) => {
  const cid = props.cid ? props.cid : id
  emit('reply', { id: cid, name })
}
</script>

<style scoped lang="less">
.vsys,
.vtime {
  color: #b3b3b3;
}

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

    .vwhom {
      font-size: 14.5px;
      color: #1abc9c;
      user-select: none;
    }

    p {
      margin-top: 0;
      margin-bottom: 16px;
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
</style>
