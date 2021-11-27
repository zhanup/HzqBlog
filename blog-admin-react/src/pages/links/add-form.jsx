import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  addRef = React.createRef()

  componentDidMount () {
    this.props.setForm(this.addRef)
  }

  render () {
    return (
      <Form ref={this.addRef}>
        <Form.Item
          name="name"
          label="站点名称"
          rules={[{ required: true, message: '必须输入站点名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="url"
          label="站点网址"
          rules={[{ required: true, message: '必须输入站点网址' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="icon"
          label="站点图标"
          rules={[{ required: true, message: '必须输入站点图标' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="站点描述"
          rules={[{ required: true, message: '必须输入站点描述' }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    )
  }
}
