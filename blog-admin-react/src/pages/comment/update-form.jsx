/* eslint-disable react/display-name */
import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const ReplyForm = forwardRef((props, updateRef) => {
  const { name, email, avatar, content } = props.comment

  useEffect(() => {
    const { name, email, avatar, content } = props.comment
    updateRef.current.setFieldsValue({ name, email, avatar, content })
  }, [props])

  return (
    <Form ref={updateRef}
      initialValues={{ name, email, avatar, content }}
    >
      <Form.Item
        label="昵称"
        name="name"
        rules={[{ required: true, message: '请输入昵称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="头像"
        name="avatar"
        rules={[{ required: true, message: '请输入头像' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '请输入内容' }]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  )
})

ReplyForm.propTypes = {
  comment: PropTypes.object.isRequired
}

export default ReplyForm
