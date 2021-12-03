import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, Form, Input, message, Modal, Table } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'

import {
  reqAddCategory,
  reqCategoryList,
  reqDeleteCategory,
  reqUpdateCategory
} from '../../request'

import { formateDate } from '../../utils/format'
import UpdateForm from './update-form'

export default function Category () {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageNum, setPageNum] = useState(1)
  const [category, setCategory] = useState({ _id: '', name: '' })

  const pageSize = 5
  const addRef = useRef()
  const updateRef = useRef()

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
            onClick={() => showUpdateCategory(item)}
          >
            编辑
          </Button>

          <Button
            style={{ fontSize: 12 }}
            type="primary"
            danger
            size="middle"
            icon={<DeleteOutlined />}
            onClick={() => deleteCategory(item._id, index)}
          >
            删除
          </Button>
        </>
      )
    }
  ]

  // 获取分类列表
  const getCategoryList = async (pageNum) => {
    // 保存当前页码
    setPageNum(pageNum)
    // 发送请求前，显示loading
    setLoading(true)
    const res = await reqCategoryList(pageNum, pageSize)
    const { list, total } = res.data
    // 在请求完成后，隐藏 Loading
    setLoading(false)
    setList(list)
    setTotal(total)
  }

  // 添加分类
  const addCategory = async () => {
    // 表单校验
    addRef.current.validateFields()
      .then(async (v) => {
        const res = await reqAddCategory(v.name)
        // 重置表单、关闭Modal框
        addRef.current.resetFields()
        setShowAdd(false)
        message.success(res.msg)
        getCategoryList(pageNum)
      })
      .catch()
  }

  // 删除分类
  const deleteCategory = (id, index) => {
    Modal.confirm({
      title: '是否删除改分类？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const res = await reqDeleteCategory(id)
        message.success(res.msg)
        if (index === 0 && pageNum > 1) {
          setPageNum(pageNum => pageNum - 1)
        }
        getCategoryList(pageNum)
      }
    })
  }

  // 更新分类
  const updateCategory = () => {
    updateRef.current
      .validateFields()
      .then(async (val) => {
        const res = await reqUpdateCategory(category._id, val.name)
        // 重置表单、关闭Modal框
        setShowUpdate(false)
        message.success(res.msg)
        updateRef.current.resetFields()
        getCategoryList(pageNum)
      })
      .catch(() => {})
  }

  // 保存要更新的分类
  const showUpdateCategory = (category) => {
    setCategory(category)
    setShowUpdate(true)
  }

  useEffect(() => {
    getCategoryList(1)
  }, [])

  return (
    <Card title="分类列表">
      <div style={{ marginBottom: 20 }}>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => { setShowAdd(true) }}
        >
          添加分类
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
          onChange: getCategoryList
        }}
      ></Table>

      <Modal
        visible={showAdd}
        title="添加分类"
        cancelText="取消"
        okText="确认"
        onCancel={() => { setShowAdd(false) }}
        onOk={addCategory}
      >
        <Form ref={addRef}>
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: '必须输入分类名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={showUpdate}
        title="编辑分类"
        cancelText="取消"
        okText="确认"
        onCancel={() => { setShowUpdate(false) }}
        onOk={updateCategory}
      >
        <UpdateForm
          ref={updateRef}
          categoryName={category.name}
        />
      </Modal>
    </Card>
  )
}
