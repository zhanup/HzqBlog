import React, { Component } from 'react'
import { Card, Input, Button, Table, Tag, Image, Switch, Modal, message  } from 'antd'
import { SearchOutlined, SyncOutlined, EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import { reqArticleList, reqDeleteArticle, reqUpdateArticle, reqSearchArticle, reqDownloadhArticle } from '../../request'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { formateDate } from '../../utils/format'

export default class Blogs extends Component {
  state = {
    list: [],
    total: 0,
    pageSize: 5,
    loading: false
  }

  inpRef = React.createRef()

  // 设置表格信息
  initColumns = () => {
    this.columns = [
      {
        title: '序号',
        key: 'index',
        width: 80,
        align: 'center',
        render: (text, record, index) => index + 1
      },
      {
        title: '文章标题',
        dataIndex: 'title',
        key: 'title',
        width: 220,
        ellipsis: true
      },
      {
        title: '文章封面',
        dataIndex: 'img_url',
        key: 'img_url',
        width: 120,
        align: 'center',
        render: (text) => <Image height={40} preview={false} src={text} />
      },
      {
        title: '分类',
        dataIndex: 'category',
        key: 'category',
        width: 120,
        align: 'center',
        render: item => <Tag color="processing">{item ? item.name : '其他'}</Tag>
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => (
          tags.map((tag) => (
            <Tag key={tag._id} color="processing">{tag.name}</Tag>
          ))
        )
      },
      {
        title: '类型',
        key: 'origin',
        dataIndex: 'origin',
        width: 80,
        align: 'center',
        render: text => <Tag color={text === 0 ? 'success' : 'error'}>{text === 0 ? '原创' : '转载'}</Tag>
      },
      {
        title: '可见性',
        dataIndex: 'visible',
        key: 'visible',
        width: 100,
        align: 'center',
        render: (text, record) => (
          <Switch
            defaultChecked={text}
            onChange={(visible) => this.updateVisible(record._id, visible)}
          >
          </Switch>
        )
      },
      {
        title: '创建时间',
        key: 'date',
        dataIndex: 'date',
        width: 165,
        render: text => formateDate(text)
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (item) => (
          <>
            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              className="mr10" 
              size="middle"
              icon={<EditOutlined />}
              onClick={() => this.props.history.push('/blogs/edit', {id: item._id})}
            >
              编辑
            </Button>
            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              danger 
              size="middle"
              icon={<DeleteOutlined />}
              onClick={() => this.deleteArticle(item._id)}
            >
              删除
            </Button>
          </>
        )
      }
    ]
  }
  
  // 文章列表
  getArticleList = async (pageNum) => {
    // 保存当前页码
    this.pageNum = pageNum
    // 发送请求前，显示loading
    this.setState({loading: true})
    
    const { pageSize } = this.state
    const result = await reqArticleList(pageNum, pageSize)

    // 在请求完成后，隐藏 Loading
    this.setState({loading: false})

    if (result.status === 1) {
      const { list, total } = result.data
      this.setState({list, total})
    }
  }

  // 删除文章
  deleteArticle = (id) => {
    Modal.confirm({
      title: '是否删除该文章？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await reqDeleteArticle(id)
          const { msg } = result
          if (result.status === 1) {
            message.success(msg)
            this.getArticleList(this.pageNum)
          } else {
            message.error(msg)
          }
        } catch(err) {
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

  // 搜索文章
  searchArticle = async() => {
    const title = this.inpRef.current.state.value
    const result = await reqSearchArticle(title)

    if (result.status === 1) {
      this.title = title
      const { list } = result.data
      this.setState({list})
    }
  }

  // 保存数据
  downloadArticle = async () => {
    const res = await reqDownloadhArticle()
    if (res.status === 1) {
      const zip  = new JSZip()
      const { list } = res.data
      list.forEach(item => {
        zip.file(`${item.title}.md`, item.content)
      })

      // 下载
      zip.generateAsync({type: 'blob'}).then((content) => {
        saveAs(content, "articles.zip")
      })
    } else {
      message.error('下载失败')
    }
  }

  // 重置表格数据
  reset = () => {
    this.title = ''
    this.getArticleList(1)
  }

  // 改变可见性
  updateVisible = async(id, visible) => {
    try {
      const result = await reqUpdateArticle({id, visible})
      const { msg } = result
      if (result.status === 1) {
        message.success(msg)
      } else {
        message.error(msg)
      }
    } catch(err) {
      const res = err.response
      if (res.status === 401) {
        message.error(res.data.msg)
      } else {
        message.error('服务器错误')
      }
    }    
  }

  componentDidMount() {
    this.initColumns()
    this.getArticleList(1)
  }
  
  render() {
    const { list, total, pageSize, loading } = this.state

    return (
      <Card className="article" title="文章列表">
        <div style={{marginBottom: 20}}>
          <Input 
            style={{width: 300, marginRight: 10}} 
            placeholder="文章标题" 
            ref={this.inpRef}
          />
          <Button 
            style={{marginRight: 10}} 
            icon={<SearchOutlined />} 
            type="primary"
            onClick={this.searchArticle}
          >
            搜索
          </Button>
          <Button 
            icon={<SyncOutlined />} 
            type="primary"
            onClick={this.reset}
          >
            重置
          </Button>

          <Button 
            style={{float: 'right'}} 
            icon={<DownloadOutlined />} 
            type="primary"
            onClick={this.downloadArticle}
          >
            保存数据
          </Button>
        </div>

        <Table
          loading={loading}
          rowKey="_id"
          bordered
          columns={this.columns}
          dataSource={list}
          pagination={this.title ? false : {
            pageSize,
            total,
            onChange: this.getArticleList
          }}
        >
        </Table>
      </Card>
    )
  }
}
