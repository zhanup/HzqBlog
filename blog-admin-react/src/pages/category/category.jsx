import React, {Component} from 'react'
import {Button, Card, Form, Input, message, Modal, Table} from 'antd'
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {reqAddCategory, reqCategoryList, reqDeleteCategory, reqUpdateCategory} from '../../request'
import {formateDate} from '../../utils/format'
import {PAGE_SIZE} from '../../utils/constans'

import UpdateForm from './update-form';

export default class Category extends Component {
  state = {
    list: [],
    showAdd: false,
    showUpdate: false,
    total: 5,
    loading: false,
    pageSize: PAGE_SIZE
  }

  addRef = React.createRef()
  updateRef = React.createRef()

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
        title: '名称',
        key: 'name',
        dataIndex: 'name',
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
              icon={ <EditOutlined />  }
              onClick={() => this.showUpdateCategory(item)}
            >
              编辑
            </Button>

            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              danger 
              size="middle"
              icon={ <DeleteOutlined /> }
              onClick={() => this.deleteCategory(item._id, index)}
            >
              删除
            </Button>
          </>
        )
      }
    ]
  }

  // 获取分类列表
  getCategoryList = async (pageNum) => {
    this.pageNum = pageNum
    // 发送请求前，显示loading
    this.setState({ loading: true })
    const result = await reqCategoryList(pageNum, this.state.pageSize)
    // 在请求完成后，隐藏 Loading
    this.setState({ loading: false })
    
    if (result.status === 1) {
      const { list, total } = result.data
      this.setState({ list, total })
    }
  }

  // 添加分类
  addCategory = async () => {
    // 表单校验
    this.addRef.current.validateFields()
      .then(async (v) => {
        try {
          const result = await reqAddCategory(v.name)
          const { msg } = result
          // 重置表单、关闭Modal框
          this.addRef.current.resetFields()
          this.setState({ showAdd: false })
          
          if (result.status === 1) {
            message.success(msg)
            this.getCategoryList(this.pageNum)
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
          // 重置表单、关闭Modal框
          this.addRef.current.resetFields()
          this.setState({ showAdd: false })
        }
      })
      .catch()
  }

  // 删除分类
  deleteCategory = (id, index) => {
    Modal.confirm({
      title: '是否删除改分类？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await reqDeleteCategory(id)
          const { msg } = result
  
          if (result.status === 1) {
            message.success(msg)
            if (index === 0 && this.pageNum > 1) {
              this.pageNum = this.pageNum - 1
            }
            this.getCategoryList(this.pageNum);
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

  // 更新分类
  updateCategory = () => {
    this.updateRef.current.validateFields()
      .then(async (val) => {
        try {
          const id = this.category._id
          const result = await reqUpdateCategory(id, val.name)
          const { msg } = result
          
          // 重置表单、关闭Modal框
          this.setState({ showUpdate: false })
          this.updateRef.current.resetFields()
  
          if (result.status === 1) {
            message.success(msg);
            this.getCategoryList(this.pageNum)
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
          // 重置表单、关闭Modal框
          this.setState({ showUpdate: false })
          this.updateRef.current.resetFields()
        }
      })
      .catch(() => {})
  }

  // 保存要更新的分类
  showUpdateCategory = (category) => {
    this.category = category;
    this.setState({showUpdate: true})
  }

  componentDidMount() {
    this.initColumns()
    this.getCategoryList(1)
  }

  render() {
    const { list, total, loading, pageSize, showAdd, showUpdate } = this.state
    const category = this.category || { name: '' }

    return (
      <Card title="分类列表">
        <div style={{marginBottom: 20}}>
          <Button 
            icon={ <PlusOutlined /> } 
            type="primary"
            onClick={() => this.setState({ showAdd: true })}
          >
            添加分类
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
            onChange: this.getCategoryList
          }}
        >
        </Table>

        <Modal 
          visible={showAdd}
          title="添加分类"
          cancelText="取消"
          okText="确认"
          onCancel={() => this.setState({ showAdd: false })}
          onOk={this.addCategory}
        >
          <Form ref={this.addRef}>
            <Form.Item 
              label="分类名称" 
              name="name"
              rules={[
                { required: true, message: "必须输入分类名称" }
              ]}
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>

        <Modal 
          visible={showUpdate}
          title="编辑分类"
          cancelText="取消"
          okText="确认"
          onCancel={() => this.setState({ showUpdate: false })}
          onOk={this.updateCategory}
        >
          <UpdateForm setForm={form => this.updateRef = form} categoryName={category.name} />
        </Modal>
      </Card>
    )
  }
}

