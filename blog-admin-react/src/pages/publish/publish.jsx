import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from 'antd'
import { reqAddArticle, reqCategoryList, reqTagList } from '../../request'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

const { Option } = Select
const { TextArea } = Input

function Publish () {
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState([])
  const formRef = useRef()

  // 获取标签列表
  const getTagList = async () => {
    const res = await reqTagList()
    setTags(res.data.list)
  }

  // 提交数据
  const onFinish = async (values) => {
    const res = await reqAddArticle(values)
    message.success(res.msg)
    formRef.current.resetFields()
  }

  // 获取分类列表
  const getCategoryList = async () => {
    const res = await reqCategoryList()
    setCategory(res.data.list)
  }

  useEffect(() => {
    getTagList()
  }, [])

  useEffect(() => {
    getCategoryList()
  }, [])

  return (
    <Card title="新建文章">
      <Form
        ref={formRef}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ visible: true }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="标题"
              name="title"
              style={{ paddingRight: 10 }}
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="封面"
              name="img_url"
              style={{ paddingLeft: 10 }}
              rules={[{ required: true, message: '请输入封面' }]}
            >
            <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="摘要"
          name="desc"
          rules={[{ required: true, message: '请输入摘要' }]}
        >
          <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入内容' }]}
        >
          <SimpleMDE options={{ status: false }} />
        </Form.Item>

        <Row>
          <Col span={8}>
            <Form.Item
              label="标签"
              name="tags"
              style={{ paddingRight: 10 }}
            >
              <Select mode="multiple">
                {
                  tags.map((item) =>
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                }
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="分类"
              name="category"
              style={{ padding: '0 5px' }}
              rules={[{ required: true, message: '请输选择分类' }]}
            >
              <Select>
                {
                  category.map((item) =>
                    <Option key={item._id} value={item._id}>{item.name}</Option>
                  )
                }
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="类型"
              name="origin"
              style={{ paddingLeft: 20 }}
              initialValue={0}
              rules={[{ required: true, message: '请输选择类型' }]}
            >
              <Select>
                <Option value={0}>原创</Option>
                <Option value={1}>转载</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="visible"
          label="可见性"
          valuePropName="checked"
        >
          <Switch/>
        </Form.Item>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button style={{ marginRight: 10 }} htmlType="reset">重置</Button>
          <Button type="primary" htmlType="submit">立即发布</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Publish
