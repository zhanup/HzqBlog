/* eslint-disable react/display-name */
import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'

const { Option } = Select

const UpdateForm = forwardRef((props, updateRef) => {
  const { name, email, type, avatar } = props.user
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }

  useEffect(() => {
    const { name, email, type, avatar } = props.user
    updateRef.current.setFieldsValue({ name, email, type, avatar })
  }, [props])

  return (
    <Form ref={updateRef} {...layout} initialValues={{ name, email, type, avatar }}>
        <Form.Item
        name="name"
        label="用户名"
        rules={[{ required: true, message: '必须输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[{ required: true, message: '必须输入邮箱' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="头像"
        rules={[{ required: true, message: '必须输入头像' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="type"
        label="账号类型"
      >
        <Select>
          <Option value={0}>管理员</Option>
          <Option value={1}>游客</Option>
        </Select>
      </Form.Item>
    </Form>
  )
})

UpdateForm.propTypes = {
  user: PropTypes.object.isRequired
}

export default UpdateForm
