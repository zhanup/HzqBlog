import React, {Component} from 'react'
import {Button, Card, Form, Input, message, Modal, Table} from 'antd'
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {reqAddTag, reqDeleteTag, reqTagList, reqUpdateTag} from '../../request'
import {formateDate} from '../../utils/format'
import {PAGE_SIZE} from '../../utils/constans'
import UpdateForm from './update-form'

export default class Tags extends Component {
  state = {
    list: [],
    total: 5,
    pageSize: PAGE_SIZE,
    loading: false,
    showAdd: false,
    showUpdate: false
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
              onClick={() => this.showUpdateTag(item)}
            >
              编辑
            </Button>

            <Button 
              style={{fontSize: 12}} 
              type="primary" 
              danger 
              size="middle"
              icon={ <DeleteOutlined /> }
              onClick={() => this.deleteTag(item._id, index)}
            >
              删除
            </Button>
          </>
        )
      }
    ]
  }

  // 获取标签列表
  getTagList = async (pageNum) => {
    this.pageNum = pageNum
    this.setState({loading: true})
    const result = await reqTagList(pageNum, this.state.pageSize)
    this.setState({loading: false})

    if (result.status === 1) {
      const { list, total } = result.data
      this.setState({list, total})
    }
  }

  // 添加标签
  addTag = async () => {
    // 表单校验
    this.addRef.current.validateFields()
      .then(async (val) => {
        try {
          const result = await reqAddTag(val.name)
          const { msg } = result
  
          // 清空表单 关闭modal
          this.addRef.current.resetFields()
          this.setState({ showAdd: false });
  
          if (result.status === 1) {
            message.success(msg);
            this.getTagList(this.pageNum)
          } else {
            message.error(msg)
          }
        } catch(err) {
          const res = err.response
          if (res.status === 401) {
            message.error(res.data.msg)
          }
          // 清空表单 关闭modal
          this.addRef.current.resetFields()
          this.setState({ showAdd: false });
        }
      })
      .catch()
  }

  // 删除标签
  deleteTag = (id, index) => {
    Modal.confirm({
      title: '是否删除改标签？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const result = await reqDeleteTag(id)
          const { msg } = result

          if (result.status === 1) {
            message.success(msg)
            if (index === 0 && this.pageNum > 1) {
              this.pageNum = this.pageNum - 1
            }
            this.getTagList(this.pageNum)
          } else {
            message.error(msg)
          }
        } catch(err) {
          const res = err.response
          if (res.status === 401) {
            message.error(res.data.msg)
          }
        }
      }
    })
  }

  // 更新标签
  updateTag = () => {
    this.updateRef.current.validateFields()
      .then(async (val) => {
        try {
          const id = this.tag._id;
          const result = await reqUpdateTag(id, val.name)
          const { msg } = result
  
          // 重置表单 关闭modal
          this.updateRef.current.resetFields()
          this.setState({showUpdate: false})
  
          if (result.status === 1) {
            message.success(msg)
            this.getTagList(this.pageNum)
          } else {
            message.error(msg)
          }
        } catch(err) {
          const res = err.response
          if (res.status === 401) {
            message.error(res.data.msg)
          }
           // 重置表单 关闭modal
           this.updateRef.current.resetFields()
           this.setState({showUpdate: false})
        }
      })
      .catch()
  }

  // 保存要更新的tag
  showUpdateTag = (tag) => {
    this.tag = tag
    this.setState({showUpdate: true})
  }

  componentDidMount() {
    this.initColumns()
    this.getTagList(1)
  }

  render() {
    const { list, total, loading, pageSize, showAdd, showUpdate } = this.state
    const tag = this.tag || { name: '' }

    return (
      <Card title="标签列表">
        <div style={{marginBottom: 20}}>
          <Button 
            icon={ <PlusOutlined /> } 
            type="primary"
            onClick={() => this.setState({ showAdd: true })}
          >
            添加标签
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
            onChange: this.getTagList
          }}
        >
        </Table>

        <Modal 
          visible={showAdd}
          title="添加标签"
          cancelText="取消"
          okText="确认"
          onCancel={() => this.setState({ showAdd: false })}
          onOk={this.addTag}
        >
          <Form ref={this.addRef}>
            <Form.Item 
              label="标签名称" 
              name="name"
              rules={[{ required: true, message: "必须输入标签名称" }]}
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>

        <Modal 
          visible={showUpdate}
          title="编辑标签"
          cancelText="取消"
          okText="确认"
          onCancel={() => this.setState({ showUpdate: false })}
          onOk={this.updateTag}
        >
          <UpdateForm setForm={form => this.updateRef = form} tagName={tag.name} />
        </Modal>
      </Card>
    )
  }
}
