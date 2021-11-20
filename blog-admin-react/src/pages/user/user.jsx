import React, { Component } from 'react'
import { Card, Table, Button, Image, Tag, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { reqUserList, reqDeleteUser, reqAddUser, reqUpdateUser } from '../../request'
import { formateDate } from '../../utils/format'

import AddForm from './add-form'
import UpdateForm from './update-form'

class User extends Component {
  state = {
    list: [],
    total: 0,
    loading: false,
    pageSize: 10,
    showAdd: false,
    showUpdate: false
  }

  // 初始化表格
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
        title: '用户名',
        key: 'name',
        dataIndex: 'name',
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
        dataIndex: 'email',
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
              onClick={() => this.showUpdate(item)}
            >
              编辑
            </Button>
            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              danger 
              size="middle"
              icon={<DeleteOutlined />}
              onClick={() => this.deleteUser(item._id)}
            >
              删除
            </Button>
          </>
        )
      }
    ]
  }

  // 用户列表
  getUserList = async (pageNum, pageSize) => {
    this.pageNum = pageNum
    this.setState({ loading: true })
    const res = await reqUserList(pageNum, pageSize)
    this.setState({ loading: false })

    if (res.status === 1) {
      const { list, total } = res.data
      this.setState({ list, total })
    }
  }

  // 删除用户
  deleteUser = async (id) => {
    Modal.confirm({
      title: '是否删除该用户？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await reqDeleteUser(id)
          const { msg } = result

          if (result.status === 1) {
            message.success(msg)
            this.getUserList(1)
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

  // 添加标签
  addUser = () => {
    this.addRef.current.validateFields()
      .then(async (value) => {
        try {
          const result = await reqAddUser(value)
          const { msg } = result

          // 重置表单 关闭modal
          this.addRef.current.resetFields()
          this.setState({showAdd: false})

          if (result.status === 1) {
            message.success(msg)
            // 重新获取列表数据
            this.getUserList(this.pageNum)
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
          // 重置表单 关闭modal
          this.addRef.current.resetFields()
          this.setState({showAdd: false})
        }
      })
      .catch()
  }

  // 保存用户信息
  showUpdate = (user) => {
    this.user = user
    this.setState({showUpdate: true})
  }

  // 更新用户
  updateUser = () => {
    this.updateRef.current.validateFields()
      .then(async (value) => {
        try {
          const id = this.user._id
          const result = await reqUpdateUser({ id, ...value })
          const { msg } = result

          // 重置表单数据 关闭编辑框
          this.updateRef.current.resetFields()
          this.setState({showUpdate: false})

          if (result.status === 1) {
            message.success(msg)
            this.getUserList(this.pageNum)
          } else{
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
      })
      .catch()
  }

  componentDidMount() {
    this.initColumns()
    this.getUserList(1)
  }

  render() {
    const { loading, list, total, pageSize, showAdd, showUpdate } = this.state
    const user = this.user || { name: '', email: '', type: 0 }

    return (
      <Card title="用户管理">
      <div style={{marginBottom: 20}}>
        <Button 
          icon={ <PlusOutlined /> } 
          type="primary"
          onClick={() => this.setState({showAdd: true})}
        >
          添加用户
        </Button>
      </div>

      <Table
        loading={loading}
        bordered 
        rowKey="_id"
        columns={this.columns} 
        dataSource={list}
        pagination={{
          pageSize,
          total,
          onChange: page => this.getUserList(page)
        }}
      ></Table>

      <Modal
        title="添加用户"
        visible={showAdd}
        okText="确认"
        cancelText="取消"
        onCancel={() => this.setState({showAdd: false})}
        onOk={this.addUser}
      >
        <AddForm setForm={form => this.addRef = form} />
      </Modal>

      <Modal
        title="更新用户"
        visible={showUpdate}
        okText="确认"
        cancelText="取消"
        onCancel={() => this.setState({showUpdate: false})}
        onOk={this.updateUser}
      >
        <UpdateForm setForm={form => this.updateRef = form} user={user} />
      </Modal>
    </Card>
    )
  }
}

export default User