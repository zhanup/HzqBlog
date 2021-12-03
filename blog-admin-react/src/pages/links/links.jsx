import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Button, Image, Modal, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { reqLinkList, reqAddLink, reqDeleteLink, reqUpdateLink } from '../../request'
import { formateDate } from '../../utils/format'

import AddForm from './add-form'
import UpdateForm from './update-form'

export default function Links () {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [links, setLinks] = useState({ _id: '', name: '', url: '', icon: '', desc: '' })
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
            style={{ fontSize: 12 }}
            type="primary"
            className="mr10"
            size="middle"
            icon={ <EditOutlined /> }
            onClick={() => showUpdateLink(item)}
          >编辑</Button>

          <Button
            style={{ fontSize: 12 }}
            type="primary"
            danger
            size="middle"
            icon={ <DeleteOutlined /> }
            onClick={() => { deleteLink(item._id, index) }}
          >删除</Button>
        </>
      )
    }
  ]

  // 获取标签列表
  const getLinkList = async (pageNum) => {
    // 保存当前分页
    setPageNum(pageNum)
    // 发送请求前，显示loading
    setLoading(true)
    const res = await reqLinkList(pageNum, pageSize)
    // 在请求完成后，隐藏 Loading
    setLoading(false)
    const { list, total } = res.data
    setList(list)
    setTotal(total)
  }

  // 删除标签
  const deleteLink = async (id, index) => {
    Modal.confirm({
      title: '是否删除该友链？',
      okText: '确认',
      cancelText: '取消',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const res = await reqDeleteLink(id)
        message.success(res.msg)
        if (index === 0 && pageNum > 1) {
          setPageNum(pageNum => pageNum - 1)
        }
        getLinkList(pageNum)
      }
    })
  }

  // 添加标签
  const addLink = () => {
    addRef.current.validateFields()
      .then(async (val) => {
        const res = await reqAddLink(val)
        // 重置表单 关闭modal
        addRef.current.resetFields()
        setShowAdd(false)
        message.success(res.msg)
        // 重新获取列表数据
        getLinkList(pageNum)
      })
      .catch()
  }

  // 更新标签
  const updateLink = () => {
    updateRef.current.validateFields()
      .then(async (values) => {
        const id = links._id
        const res = await reqUpdateLink({ id, ...values })

        // 重置表单数据 关闭编辑框
        updateRef.current.resetFields()
        setShowUpdate(false)
        message.success(res.msg)
        getLinkList(this.pageNum)
      })
      .catch()
  }

  // 保存友链信息
  const showUpdateLink = (links) => {
    setLinks(links)
    setShowUpdate(true)
  }

  useEffect(() => {
    getLinkList(1)
  }, [])

  return (
    <Card className="links" title="友链列表">
      <div style={{ marginBottom: 20 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setShowAdd(true)}
        >
          添加友链
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        bordered
        pagination={{
          total,
          pageSize,
          onChange: getLinkList
        }}
        rowKey="_id"
      >
      </Table>

      <Modal
        title="添加友链"
        visible={showAdd}
        okText="确认"
        cancelText="取消"
        onCancel={() => setShowAdd(false)}
        onOk={addLink}
      >
        <AddForm ref={addRef} />
      </Modal>

      <Modal
        title="更新友链"
        visible={showUpdate}
        okText="确认"
        cancelText="取消"
        onCancel={() => setShowUpdate(false)}
        onOk={updateLink}
      >
        <UpdateForm ref={updateRef} links={links} />
      </Modal>
    </Card>
  )
}
