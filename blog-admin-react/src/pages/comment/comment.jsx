import React, { Component } from 'react'
import {
  Button,
  Card,
  Image,
  message,
  Modal,
  Select,
  Switch,
  Table
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { formateDate } from '../../utils/format'
import UpdateForm from './update-form'
import {
  reqArticleList,
  reqCommentList,
  reqDeleteComment,
  reqUpdateComment
} from '../../request'

const { Option } = Select

export default class Comment extends Component {
  state = {
    list: [],
    loading: false,
    total: 0,
    blogs: [],
    pageSize: 10,
    showUpdate: false
  }

  // 表格数据初始化
  initColumns = () => {
    this.columns = [
      {
        title: '序号',
        key: 'index',
        width: 80,
        align: 'center',
        render: (item, record, index) => index + 1
      },
      {
        title: '评论者',
        key: 'name',
        width: 100,
        ellipsis: true,
        dataIndex: 'name'
      },
      {
        title: '评论者头像',
        key: 'avatar',
        dataIndex: 'avatar',
        width: 120,
        align: 'center',
        render: (url) => <Image src={url} height={40} preview={false} />
      },
      {
        title: '内容',
        key: 'content',
        dataIndex: 'content',
        width: '200px'
      },
      {
        title: '邮箱',
        key: 'email',
        width: 175,
        ellipsis: true,
        dataIndex: 'email'
      },
      {
        title: '回复人',
        key: 'to_whom',
        dataIndex: 'to_whom',
        width: 100,
        ellipsis: true
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
          ></Switch>
        )
      },
      {
        title: '创建时间',
        key: 'date',
        dataIndex: 'date',
        width: 165,
        render: (date) => formateDate(date)
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (item) => (
          <>
            <Button
              type="primary"
              style={{ fontSize: 12, marginRight: 10 }}
              icon={<EditOutlined />}
              onClick={() => this.showUpdateEdit(item)}
            >
              编辑
            </Button>

            <Button
              type="primary"
              style={{ fontSize: 12 }}
              danger
              icon={<DeleteOutlined />}
              onClick={() => this.delCommentReply(item.type, item._id)}
            >
              删除
            </Button>
          </>
        )
      }
    ]
  }

  // 留言列表
  getCommentList = async (pageNum, aid) => {
    const { pageSize } = this.state
    // 发送请求前，显示loading
    this.setState({ loading: true })
    const result = await reqCommentList({ pageNum, pageSize, aid })
    // 在请求完成后，隐藏 Loading
    this.setState({ loading: false })

    if (result.status === 1) {
      const { list, total } = result.data
      this.setState({ list, total })
    }
  }

  // 博客列表
  getBlogList = async () => {
    const result = await reqArticleList()

    if (result.status === 1) {
      const { list } = result.data
      this.setState({ blogs: list })
    }
  }

  // 搜索
  onFinish = async (val) => {
    this.getCommentList(1, val.aid)
  }

  // 删除评论
  delCommentReply = (type, id) => {
    Modal.confirm({
      title: '是否删除该评论？',
      okText: '删除',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await reqDeleteComment(id)
          const { msg } = result
          if (result.status === 1) {
            message.success(msg)
            this.getCommentList(1)
          } else {
            message.error(msg)
          }
        } catch (err) {
          const res = err.response

          if (res.status === 401) {
            message.error(res.data.msg)
          }
        }
      }
    })
  }

  // 修改 评论 / 回复 可见性
  updateVisible = async (id, visible) => {
    try {
      const result = await reqUpdateComment({ id, visible })
      const { msg } = result
      if (result.status === 1) {
        message.success(msg)
      } else {
        message.error(msg)
      }
    } catch (err) {
      const res = err.response
      if (res.status === 401) {
        message.error(res.data.msg)
      }
    }
  }

  // 保存回复的评论id
  showUpdateEdit = (comment) => {
    this.comment = comment
    this.setState({ showUpdate: true })
  }

  // 编辑评论
  update = () => {
    const id = this.comment._id

    this.form.current
      .validateFields()
      .then(async (value) => {
        try {
          const result = await reqUpdateComment({ id, ...value })
          const { msg } = result

          // 关闭回复框 重置表单
          this.setState({ showUpdate: false })
          this.form.current.resetFields()

          if (result.status === 1) {
            message.success(msg)
            this.getCommentList(1)
          } else {
            message.error(msg)
          }
        } catch (err) {
          const res = err.response
          if (res.status === 401) {
            message.error(res.data.msg)
          }
          // 关闭回复框 重置表单
          this.setState({ showUpdate: false })
          this.form.current.resetFields()
        }
      })
      .catch()
  }

  componentDidMount () {
    this.initColumns()
    this.getCommentList(1)
    this.getBlogList()
  }

  render () {
    const { list, loading, total, blogs, showUpdate, pageSize } = this.state
    const comment = this.comment || {
      name: '',
      email: '',
      avatar: '',
      content: ''
    }

    return (
      <Card title="评论列表">
        <Select
          style={{ width: 300, marginBottom: 20 }}
          placeholder="选择文章"
          allowClear={true}
          onClear={() => this.getCommentList(1)}
          onSelect={(id) => this.getCommentList(1, id)}
        >
          {blogs.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.title}
            </Option>
          ))}
        </Select>

        <Table
          loading={loading}
          rowKey="_id"
          bordered
          columns={this.columns}
          dataSource={list}
          pagination={{
            total,
            pageSize,
            onChange: (page) => this.getCommentList(page)
          }}
        ></Table>

        <Modal
          visible={showUpdate}
          title="回复评论"
          okText="确认"
          cancelText="取消"
          onCancel={() => this.setState({ showUpdate: false })}
          onOk={this.update}
        >
          <UpdateForm
            setForm={(form) => {
              this.form = form
            }}
            comment={comment}
          />
        </Modal>
      </Card>
    )
  }
}
