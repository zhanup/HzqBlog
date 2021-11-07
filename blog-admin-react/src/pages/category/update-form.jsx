import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  updateRef = React.createRef()

  componentDidMount() {
    this.props.setForm(this.updateRef);
  }

  componentDidUpdate() {
    // 当props值更新，使用setFieldsValue方法更新input的值
    const { categoryName } = this.props;
    this.updateRef.current.setFieldsValue({ name: categoryName });
  }

  render() {
    const { categoryName } = this.props;

    return (
      <Form ref={this.updateRef} initialValues={{name: categoryName}}>
        <Form.Item
          name="name"
          label="分类名称"
          rules={[{ required: true, message: "必须输入分类名称！" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  }
}
