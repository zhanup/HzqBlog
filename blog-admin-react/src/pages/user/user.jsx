import React, { useState, useEffect, useRef } from 'react'
import { Card, Table, Button, Image, Tag, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { reqUserList, reqDeleteUser, reqAddUser, reqUpdateUser } from '../../request'
import { formateDate } from '../../utils/format'

import AddForm from './add-form'
import UpdateForm from './update-form'

export default function User () {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [user, setUser] = useState({ _id: '', name: '', email: '', type: 0 })
  const pageSize = 10
  const addRef = useRef()
  const updateRef = useRef()

  // 初始化表格
  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '用户名',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 120,
      align: 'center',
      render: text => <Image height={40} preview={false} src={text} />
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: text => <Tag color="processing">{text === 0 ? '管理员' : '游客'}</Tag>
    },
    {
      title: '邮箱',
      key: 'email',
      dataIndex: 'email'
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
            style={{ fontSize: 12 }}
            type="primary"
            className="mr10"
            size="middle"
            icon={<EditOutlined />}
            onClick={() => showUpdateUser(item)}
          >
            编辑
          </Button>
          <Button
            style={{ fontSize: 12 }}
            type="primary"
            danger
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => deleteUser(item._id)}
          >
            删除
          </Button>
        </>
      )
    }
  ]

  // 用户列表
  const getUserList = async (pageNum, pageSize) => {
    setPageNum(pageNum)
    setLoading(true)
    const res = await reqUserList(pageNum, pageSize)
    const { list, total } = res.data
    setLoading(false)
    setList(list)
    setTotal(total)
  }

  // 删除用户
  const deleteUser = async (id) => {
    Modal.confirm({
      title: '是否删除该用户？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteUser(id)
        message.success(res.msg)
        getUserList(1)
      }
    })
  }

  // 添加标签
  const addUser = () => {
    addRef.current.validateFields()
      .then(async (value) => {
        const res = await reqAddUser(value)
        // 重置表单 关闭modal
        addRef.current.resetFields()
        setShowAdd(false)
        message.success(res.msg)
        // 重新获取列表数据
        getUserList(pageNum)
      })
      .catch()
  }

  // 保存用户信息
  const showUpdateUser = (user) => {
    setUser(user)
    setShowUpdate(true)
  }

  // 更新用户
  const updateUser = () => {
    updateRef.current.validateFields()
      .then(async (value) => {
        const id = user._id
        const res = await reqUpdateUser({ id, ...value })
        // 重置表单数据 关闭编辑框
        updateRef.current.resetFields()
        setShowUpdate(false)
        message.success(res.msg)
        getUserList(pageNum)
      })
      .catch()
  }

  useEffect(() => {
    getUserList(1)
  }, [])

  return (
    <Card title="用户管理">
    <div style={{ marginBottom: 20 }}>
      <Button
        icon={ <PlusOutlined /> }
        type="primary"
        onClick={() => setShowAdd(true)}
      >
        添加用户
      </Button>
    </div>

    <Table
      loading={loading}
      bordered
      rowKey="_id"
      columns={columns}
      dataSource={list}
      pagination={{
        pageSize,
        total,
        onChange: page => getUserList(page)
      }}
    ></Table>

    <Modal
      title="添加用户"
      visible={showAdd}
      okText="确认"
      cancelText="取消"
      onCancel={() => setShowAdd(false)}
      onOk={addUser}
    >
      <AddForm ref={addRef} />
    </Modal>

    <Modal
      title="更新用户"
      visible={showUpdate}
      okText="确认"
      cancelText="取消"
      onCancel={() => setShowUpdate(false)}
      onOk={updateUser}
    >
      <UpdateForm ref={updateRef} user={ user } />
    </Modal>
  </Card>
  )
}
