import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const { Option } = Select

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }

  addRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.addRef)
  }

  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }

    return (
      <Form ref={this.addRef} {...layout}>
        <Form.Item
          name="name"
          label="用户名"
          rules={[{ required: true, message: "必须输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ required: true, message: "必须输入邮箱" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: "必须输入密码" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="账号类型"
          initialValue={1}
        >
          <Select>
            <Option value={0}>管理员</Option>
            <Option value={1}>游客</Option>
          </Select>
        </Form.Item>
      </Form>
    );
  }
}
