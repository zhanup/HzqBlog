import React, {Component} from 'react'
import {Button, Card, Col, Form, Input, message, Row, Select, Switch} from 'antd'
import {reqAddArticle, reqCategoryList, reqTagList} from '../../request'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

const {Option} = Select
const {TextArea} = Input

export default class Publish extends Component {
  state = {
    tags: [],
    category: []
  }

  form = React.createRef()

  // 获取标签列表
  getTagList = async() => {
    const result = await reqTagList()

    if (result.status === 1) {
      const { list } = result.data
      this.setState({tags: list})
    }
  }

  // 获取分类列表
  getCategoryList = async () => {
    const result = await reqCategoryList()

    if (result.status === 1) {
      const { list } = result.data
      this.setState({category: list})
    }
  }

  onFinish = async (values) => {
    try {
      const result = await reqAddArticle(values)
      const { msg } = result
  
      if (result.status === 1) {
        message.success(msg);
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

  componentDidMount() {
    this.getTagList()
    this.getCategoryList()
  }

  render() {
    const { tags, category } = this.state
    
    return (
      <Card title="新建文章">
        <Form 
          ref={this.form} 
          layout="vertical" 
          onFinish={this.onFinish}
          initialValues={{visible: true}}
        >
          <Row>
            <Col span={12}>
              <Form.Item 
                label="标题"
                name="title"
                style={{paddingRight: 10}}
                rules={[ {required: true, message: '请输入标题'} ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="封面"
                name="img_url"
                style={{paddingLeft: 10}}
                rules={[ {required: true, message: '请输入封面'} ]}
              >
              <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="摘要"
            name="desc"
            rules={[ {required: true, message: '请输入摘要'} ]}
          >
            <TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[ {required: true, message: '请输入内容'} ]}
          >
            <SimpleMDE options={{status: false}} />
          </Form.Item>

          <Row>
            <Col span={8}>
              <Form.Item
                label="标签"
                name="tags"
                style={{paddingRight: 10}}
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
                style={{padding: '0 5px'}}
                rules={[ {required: true, message: '请输选择分类'} ]}
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
                style={{paddingLeft: 20}}
                initialValue={0}
                rules={[ {required: true, message: '请输选择类型'} ]}
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

          <Form.Item style={{textAlign: "right"}}>
            <Button style={{marginRight: 10}} htmlType="reset">重置</Button>
            <Button type="primary" htmlType="submit">立即发布</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
