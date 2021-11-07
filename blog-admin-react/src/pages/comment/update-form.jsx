import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

export default class ReplyForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired
  }

  form = React.createRef()

  componentDidMount() {
    this.props.setForm(this.form)
  }

  componentDidUpdate() {
    const { name, email, avatar, content } = this.props.comment
    this.form.current.setFieldsValue({name, email, avatar, content})
  }

  render() {
    const { name, email, avatar, content } = this.props.comment
    return (
      <Form ref={this.form}
        initialValues={{name, email, avatar, content}}
      >
        <Form.Item
          label="昵称"
          name="name"
          rules={[ {required: true, message: "请输入昵称"} ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="头像"
          name="avatar"
          rules={[ {required: true, message: "请输入头像"} ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[ {required: true, message: "请输入邮箱"} ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[ {required: true, message: "请输入内容"} ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    )
  }
}
