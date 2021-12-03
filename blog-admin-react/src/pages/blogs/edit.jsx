import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Breadcrumb,
  message,
  Spin
} from 'antd'
import { Link } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import {
  reqTagList,
  reqCategoryList,
  reqUpdateArticle,
  reqArticleDetail
} from '../../request'
import 'easymde/dist/easymde.min.css'

const { Option } = Select
const { TextArea } = Input

function Edit (props) {
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const formRef = useRef()

  // 初始化表单数据
  const initForm = async () => {
    // 发送请求前，显示loading
    setLoading(true)
    const { id } = props.location.state
    const res = await reqArticleDetail(id)
    // 在请求完成后，隐藏 Loading
    setLoading(false)
    // eslint-disable-next-line camelcase
    const { title, img_url, desc, content, visible, tags, category, origin } = res.data
    formRef.current.setFieldsValue({ title, img_url, desc, content, visible, tags, category, origin })
  }

  // 获取标签列表
  const getTags = async () => {
    const res = await reqTagList()
    setTags(res.data.list)
  }

  // 获取分类列表
  const getCategories = async () => {
    const res = await reqCategoryList()
    setCategories(res.data.list)
  }

  const onFinish = async (values) => {
    const { id } = props.location.state
    const res = await reqUpdateArticle({ id, ...values })
    props.history.goBack()
    message.success(res.msg)
    formRef.current.resetFields()
  }

  useEffect(() => {
    getTags()
    getCategories()
    initForm()
  }, [])

  const cTitle = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/blogs">文章列表</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>编辑文章</Breadcrumb.Item>
    </Breadcrumb>
  )

  return (
    <Card title={cTitle}>
      <Spin spinning={loading}>
        <Form ref={formRef} layout="vertical" onFinish={onFinish}>
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
                  {/* mode="multiple"，支持多选 */}
                  {tags.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="分类"
                name="category"
                style={{ padding: '0 5px' }}
              >
                <Select>
                  {categories.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8} style={{ marginBottom: 20 }}>
              <Form.Item
                label="类型"
                name="origin"
                style={{ paddingLeft: 20 }}
                initialValue={0}
              >
                <Select>
                  <Option value={0}>原创</Option>
                  <Option value={1}>转载</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  )
}

Edit.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Edit
