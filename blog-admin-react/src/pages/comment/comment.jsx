import React, { useState, useRef, useEffect } from 'react'
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

function Comment () {
  const [list, setList] = useState([])
  const [blogs, setBlogs] = useState([])
  const [total, setTotal] = useState(0)
  const [showUpdate, setShowUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState({
    _id: '',
    name: '',
    email: '',
    avatar: '',
    content: ''
  })
  const pageSize = 10
  const updateRef = useRef()

  // 表格数据初始化
  const columns = [
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
          onChange={(visible) => updateVisible(record._id, visible)}
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
            onClick={() => showUpdateEdit(item)}
          >
            编辑
          </Button>

          <Button
            type="primary"
            style={{ fontSize: 12 }}
            danger
            icon={<DeleteOutlined />}
            onClick={() => delCommentReply(item._id)}
          >
            删除
          </Button>
        </>
      )
    }
  ]

  // 留言列表
  const getCommentList = async (pageNum, aid) => {
    // 发送请求前，显示loading
    setLoading(true)
    const res = await reqCommentList({ pageNum, pageSize, aid })
    // 在请求完成后，隐藏 Loading
    setLoading(false)
    const { list, total } = res.data
    setList(list)
    setTotal(total)
  }

  // 博客列表
  const getBlogList = async () => {
    const res = await reqArticleList()
    setBlogs(res.data.list)
  }

  // 删除评论
  const delCommentReply = (id) => {
    Modal.confirm({
      title: '是否删除该评论？',
      okText: '删除',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteComment(id)
        message.success(res.msg)
        getCommentList(1)
      }
    })
  }

  // 修改 评论 / 回复 可见性
  const updateVisible = async (id, visible) => {
    const res = await reqUpdateComment({ id, visible })
    message.success(res.msg)
  }

  // 保存回复的评论id
  const showUpdateEdit = (comment) => {
    setComment(comment)
    setShowUpdate(true)
  }

  // 编辑评论
  const update = () => {
    const id = comment._id
    updateRef.current.validateFields()
      .then(async (value) => {
        const res = await reqUpdateComment({ id, ...value })
        // 关闭回复框 重置表单
        setShowUpdate(false)
        updateRef.current.resetFields()
        message.success(res.msg)
        getCommentList(1)
      })
      .catch()
  }

  useEffect(() => {
    getCommentList(1)
    getBlogList()
  }, [])

  return (
    <Card title="评论列表">
      <Select
        style={{ width: 300, marginBottom: 20 }}
        placeholder="选择文章"
        allowClear={true}
        onClear={() => getCommentList(1)}
        onSelect={(id) => getCommentList(1, id)}
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
        columns={columns}
        dataSource={list}
        pagination={{
          total,
          pageSize,
          onChange: (page) => getCommentList(page)
        }}
      ></Table>

      <Modal
        visible={showUpdate}
        title="回复评论"
        okText="确认"
        cancelText="取消"
        onCancel={() => setShowUpdate(false)}
        onOk={update}
      >
        <UpdateForm
          ref={updateRef}
          comment={comment}
        />
      </Modal>
    </Card>
  )
}

export default Comment
