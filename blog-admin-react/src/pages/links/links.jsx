import React, { Component } from 'react'
import { Card, Table, Button, Image, Modal, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined  } from '@ant-design/icons'
import { reqLinkList, reqAddLink, reqDeleteLink, reqUpdateLink } from '../../request'
import { formateDate } from '../../utils/format'

import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Links extends Component {
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
        title: '站点名称',
        key: 'name',
        dataIndex: 'name',
        width: 180,
        ellipsis: true
      },
      {
        title: '站点图标',
        key: 'icon',
        dataIndex: 'icon',
        width: 120,
        align: 'center',
        render: icon => <Image src={icon} height={40} preview={false} />
      },
      {
        title: '站点描述',
        key: 'desc',
        dataIndex: 'desc',
        width: 250
      },
      {
        title: '站点网址',
        key: 'url',
        dataIndex: 'url',
        width: 250,
        ellipsis: true
      },
      {
        title: '创建时间',
        key: 'date',
        dataIndex: 'date',
        width: 165,
        render: date => formateDate(date)
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (item, record, index) => (
          <>
            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              className="mr10" 
              size="middle"
              icon={ <EditOutlined /> }
              onClick={() => this.showUpdateLink(item)}
            >编辑</Button>

            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              danger 
              size="middle"
              icon={ <DeleteOutlined /> }
              onClick={() => {this.deleteLink(item._id, index)}}
            >删除</Button>
          </>
        )
      }
    ]
  }

  // 获取标签列表
  getLinkList = async (pageNum) => {
    // 保存当前分页
    this.pageNum = pageNum
    // 发送请求前，显示loading
    this.setState({loading: true})

    const result = await reqLinkList(pageNum, this.state.pageSize)
    // 在请求完成后，隐藏 Loading
    this.setState({loading: false})
    
    if (result.status === 1) {
      const { list, total } = result.data
      this.setState({ list, total })
    }
  }

  // 删除标签
  deleteLink = async(id, index) => {
    Modal.confirm({
      title: '是否删除该友链？',
      okText: '确认',
      cancelText: '取消',
      icon: <ExclamationCircleOutlined />,
      onOk: async() => {
        try {
          const result = await reqDeleteLink(id)
          const { msg } = result

          if (result.status === 1) {
            message.success(msg)

            if (index === 0 && this.pageNum > 1) {
              this.pageNum = this.pageNum - 1
            }
            this.getLinkList(this.pageNum)
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
  addLink = () => {
    this.addRef.current.validateFields()
      .then(async (val) => {
        try {
          const result = await reqAddLink(val)
          const { msg } = result

          // 重置表单 关闭modal
          this.addRef.current.resetFields()
          this.setState({showAdd: false})

          if (result.status === 1) {
            message.success(msg)
            // 重新获取列表数据
            this.getLinkList(this.pageNum)
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

  // 更新标签
  updateLink = () => {
    this.updateRef.current.validateFields()
      .then(async (values) => {
        try {
          const id = this.links._id
          const { name, url, icon, desc } = values
          const result = await reqUpdateLink({ id, name, url, icon, desc })
          const { msg } = result

          // 重置表单数据 关闭编辑框
          this.updateRef.current.resetFields()
          this.setState({showUpdate: false})

          if (result.status === 1) {
            message.success(msg)
            this.getLinkList(this.pageNum)
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

  // 保存友链信息
  showUpdateLink = (links) => {
    this.links = links
    this.setState({ showUpdate: true })
  }

  componentDidMount() {
    this.initColumns()
    this.getLinkList(1)
  }

  render() {
    const { list, loading, total, pageSize, showAdd, showUpdate } = this.state
    const links = this.links || { name: '', url: '', icon: '', desc: '' }

    return (
      <Card className="links" title="友链列表">
        <div style={{marginBottom: 20}}>
          <Button 
            icon={<PlusOutlined />} 
            type="primary"
            onClick={() => this.setState({showAdd: true})}
          >
            添加友链
          </Button>
        </div>

        <Table
          loading={loading}
          columns={this.columns}
          dataSource={list}
          bordered
          pagination={{
            total,
            pageSize,
            onChange:  this.getLinkList
          }}
          rowKey="_id"
        >
        </Table>

        <Modal
          title="添加友链"
          visible={showAdd}
          okText="确认"
          cancelText="取消"
          onCancel={() => this.setState({showAdd: false})}
          onOk={this.addLink}
        >
          <AddForm setForm={form => this.addRef = form} />
        </Modal>

        <Modal
          title="更新友链"
          visible={showUpdate}
          okText="确认"
          cancelText="取消"
          onCancel={() => this.setState({showUpdate: false})}
          onOk={this.updateLink}
        >
          <UpdateForm setForm={form => this.updateRef = form} links={links} />
        </Modal>
      </Card>
    )
  }
}
