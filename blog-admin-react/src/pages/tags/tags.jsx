import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, Form, Input, message, Modal, Table } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'

import {
  reqAddTag,
  reqDeleteTag,
  reqTagList,
  reqUpdateTag
} from '../../request'

import { formateDate } from '../../utils/format'
import UpdateForm from './update-form'

export default function Tags () {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [tag, setTag] = useState({ name: '' })
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
      title: '名称',
      key: 'name',
      dataIndex: 'name'
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
      render: (item, record, index) => (
        <>
          <Button
            style={{ fontSize: 12 }}
            type="primary"
            className="mr10"
            size="middle"
            icon={<EditOutlined />}
            onClick={() => showUpdateTag(item)}
          >
            编辑
          </Button>

          <Button
            style={{ fontSize: 12 }}
            type="primary"
            danger
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => deleteTag(item._id, index)}
          >
            删除
          </Button>
        </>
      )
    }
  ]

  // 获取标签列表
  const getTagList = async (pageNum) => {
    setPageNum(pageNum)
    setLoading(true)
    const res = await reqTagList(pageNum, pageSize)
    const { list, total } = res.data
    setLoading(false)
    setList(list)
    setTotal(total)
  }

  // 添加标签
  const addTag = async () => {
    // 表单校验
    addRef.current.validateFields()
      .then(async (val) => {
        const res = await reqAddTag(val.name)
        // 清空表单 关闭modal
        addRef.current.resetFields()
        setShowAdd(false)
        message.success(res.msg)
        getTagList(pageNum)
      })
      .catch()
  }

  // 删除标签
  const deleteTag = (id, index) => {
    Modal.confirm({
      title: '是否删除该标签？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteTag(id)
        if (index === 0 && pageNum > 1) {
          setPageNum(pageNum => pageNum - 1)
        }
        message.success(res.msg)
        getTagList(pageNum)
      }
    })
  }

  // 更新标签
  const updateTag = () => {
    updateRef.current.validateFields()
      .then(async (val) => {
        const id = tag._id
        const res = await reqUpdateTag(id, val.name)
        // 重置表单 关闭modal
        updateRef.current.resetFields()
        setShowUpdate(false)
        message.success(res.msg)
        getTagList(pageNum)
      })
      .catch()
  }

  // 保存要更新的tag
  const showUpdateTag = (tag) => {
    setTag(tag)
    setShowUpdate(true)
  }

  useEffect(() => {
    getTagList()
  }, [])

  return (
    <Card title="标签列表">
      <div style={{ marginBottom: 20 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setShowAdd(true)}
        >
          添加标签
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
          onChange: getTagList
        }}
      ></Table>

      <Modal
        visible={showAdd}
        title="添加标签"
        cancelText="取消"
        okText="确认"
        onCancel={() => setShowAdd(false)}
        onOk={addTag}
      >
        <Form ref={addRef}>
          <Form.Item
            label="标签名称"
            name="name"
            rules={[{ required: true, message: '必须输入标签名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={showUpdate}
        title="编辑标签"
        cancelText="取消"
        okText="确认"
        onCancel={() => setShowUpdate(false)}
        onOk={updateTag}
      >
        <UpdateForm
          ref={updateRef}
          tagName={tag.name}
        />
      </Modal>
    </Card>
  )
}
