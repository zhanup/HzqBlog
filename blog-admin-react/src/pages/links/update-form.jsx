import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input } from 'antd';

export default class UpdateForm extends Component {
  static propTypes = {
    links: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired
  }

  updateRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.updateRef);
  }

  componentDidUpdate() {
    // 当props值更新，使用setFieldsValue方法更新input的值
    const { name, url, icon, desc } = this.props.links;
    this.updateRef.current.setFieldsValue({ name, url, icon, desc });
  }

  render() {
    const { name, url, icon, desc } = this.props.links;

    return (
      <Form ref={this.updateRef} initialValues={{name, url, icon, desc}}>
        <Form.Item
          name="name"
          label="站点名称"
          rules={[{ required: true, message: "必须输入站点名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="url"
          label="站点网址"
          rules={[{ required: true, message: "必须输入站点网址" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="icon"
          label="站点图标"
          rules={[{ required: true, message: "必须输入站点图标" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="站点描述"
          rules={[{ required: true, message: "必须输入站点描述" }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    );
  }
}
