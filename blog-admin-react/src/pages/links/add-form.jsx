/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import { Form, Input } from 'antd'

const AddForm = forwardRef((props, addRef) => {
  return (
    <Form ref={addRef}>
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
})

export default AddForm
