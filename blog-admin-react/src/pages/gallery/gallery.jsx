import React, { useState, useEffect } from 'react'
import { message, Modal, Spin, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { reqDeleteImg, reqImgList } from '../../request'
import Macy from 'macy'
import { copyToClipboard } from '../../utils'
import storageUtils from '../../utils/storageUtils'
import './gallery.less'

const { Dragger } = Upload

export default function Gallery () {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const user = storageUtils.getUser()
  const uploadUrl = process.env.NODE_ENV === 'development' ? '/manage/img/upload' : 'http://1.15.112.209:5000/manage/img/upload'

  // Macy插件配置
  const getMacy = () => {
    const masonry = new Macy({
      container: '.waterfall',
      trueOrder: false,
      waitForImages: false,
      margin: 10,
      columns: 5,
      breakAt: {
        1200: 5,
        940: 4,
        520: 3,
        400: 2
      }
    })
    masonry.reInit()
  }

  // 图片列表
  const getImgList = async () => {
    // 发送请求前，显示loading
    setLoading(true)
    const res = await reqImgList()
    // 在请求完成后，隐藏 Loading
    setLoading(false)
    const { list } = res.data
    setList(list)
    getMacy()
  }

  // 上传图片
  const uploadImg = (info) => {
    const { status } = info.file

    if (status === 'done') {
      message.success('上传成功')
      getImgList()
    } else if (status === 'error') {
      message.error('上传失败')
    }
  }

  // 删除照片
  const deleteImg = async (name) => {
    Modal.confirm({
      title: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteImg(name)
        message.success(res.msg)
        getImgList()
      }
    })
  }

  // 复制带粘贴板
  const copy = (url) => {
    const temp = copyToClipboard(url)
    if (temp) {
      message.success('内容已复制到剪切板')
    } else {
      message.error('复制失败')
    }
  }

  useEffect(() => {
    getImgList()
  }, [])

  return (
    <div className="gallery">
      <div className="upload">
        <Dragger
            className="dragger"
            name="image"
            accept="image/*"
            action={uploadUrl}
            onChange={uploadImg}
            headers={{ Authorization: user.token }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p>将文件拖到到此，或 <em>点击上传</em></p>
        </Dragger>
      </div>

      <Spin spinning={loading}>
        <div className="waterfall">
          {
            list.map(item => (
              <div className="card" key={item._id}>
                <div className="cover">
                  <img src={item.url} alt="img" />
                </div>
                <div className="name">
                  <p>{item.name}</p>
                </div>
                <div className="menus">
                  <p data-title="复制" onClick={() => copy(item.url)}/>
                  <p data-title="删除" onClick={() => deleteImg(item.name)}/>
                </div>
              </div>
            ))
          }
        </div>
      </Spin>
    </div>
  )
}
