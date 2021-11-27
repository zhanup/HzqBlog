import React, { Component } from 'react'
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

export default class Edit extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    tagList: [],
    categoryList: [],
    loading: false
  }

  form = React.createRef()

  // 初始化表单数据
  initForm = async () => {
    // 发送请求前，显示loading
    this.setState({ loading: true })
    const { id } = this.props.location.state
    const result = await reqArticleDetail(id)
    // 在请求完成后，隐藏 Loading
    this.setState({ loading: false })
    if (result.status === 1) {
      // eslint-disable-next-line
      const { title, img_url, desc, content, visible, tags, category, origin } = result.data
      this.form.current.setFieldsValue({
        title,
        img_url,
        desc,
        content,
        visible,
        tags,
        category,
        origin
      })
    }
  }

  // 获取标签列表
  getTagList = async () => {
    const result = await reqTagList()

    if (result.status === 1) {
      const { list } = result.data
      this.setState({ tagList: list })
    }
  }

  // 获取分类列表
  getCategoryList = async () => {
    const result = await reqCategoryList()

    if (result.status === 1) {
      const { list } = result.data
      this.setState({ categoryList: list })
    }
  }

  onFinish = async (values) => {
    try {
      const { id } = this.props.location.state
      const result = await reqUpdateArticle({ id, ...values })
      const { msg } = result
      if (result.status === 1) {
        this.props.history.goBack()
        message.success(msg)
        this.form.current.resetFields()
      } else {
        message.error(msg)
      }
    } catch (err) {
      const res = err.response
      if (res.status === 401) {
        message.error(res.data.msg)
      } else {
        message.error('服务器错误')
      }
    }
  }

  componentDidMount () {
    this.getTagList()
    this.getCategoryList()
    this.initForm()
  }

  render () {
    const { tagList, categoryList, loading } = this.state

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
          <Form ref={this.form} layout="vertical" onFinish={this.onFinish}>
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
                    {tagList.map((item) => (
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
                    {categoryList.map((item) => (
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
}
