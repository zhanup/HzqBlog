import React, { Component } from 'react'
import { message, Modal, Spin, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { reqDeleteImg, reqImgList } from '../../request'
import Macy from 'macy'
import { copyToClipboard } from '../../utils'
import storageUtils from '../../utils/storageUtils'
import './gallery.less'

const { Dragger } = Upload

export default class Gallery extends Component {
  state = {
    list: [],
    loading: false
  }

  // Macy插件配置
  getMacy = () => {
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
  getImgList = async () => {
    // 发送请求前，显示loading
    this.setState({ loading: true })
    const result = await reqImgList()
    // 在请求完成后，隐藏 Loading
    this.setState({ loading: false })

    if (result.status === 1) {
      const { list } = result.data
      this.setState({ list })
      this.getMacy()
    }
  }

  // 上传图片
  uploadImg = (info) => {
    const { status } = info.file

    if (status === 'done') {
      message.success('上传成功')
      this.getImgList()
    } else if (status === 'error') {
      message.error('上传失败')
    }
  }

  // 删除照片
  deleteImg = async (name) => {
    Modal.confirm({
      title: '确定要删除吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await reqDeleteImg(name)
          const { msg } = result

          if (result.status === 1) {
            message.success(msg)
            this.getImgList()
          } else {
            message.error(msg)
          }
        } catch (err) {
          const res = err.response
          if (res.status === 401) {
            message.error(res.data.msg)
          } else {
            message.error('服务器错误')
          }
        }
      }
    })
  }

  // 复制带粘贴板
  copy = (url) => {
    const temp = copyToClipboard(url)
    if (temp) {
      message.success('内容已复制到剪切板')
    } else {
      message.error('复制失败')
    }
  }

  componentDidMount () {
    this.getImgList()
  }

  render () {
    const { list, loading } = this.state
    const user = storageUtils.getUser()

    return (
      <div className="gallery">
        <div className="upload">
          <Dragger
              className="dragger"
              name="image"
              accept="image/*"
              // action="/manage/img/upload"
              action="http://1.15.112.209:5000/manage/img/upload"
              onChange={this.uploadImg}
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
                    <p data-title="复制" onClick={() => this.copy(item.url)}/>
                    <p data-title="删除" onClick={() => this.deleteImg(item.name)}/>
                  </div>
                </div>
              ))
            }
          </div>
        </Spin>
      </div>
    )
  }
}
