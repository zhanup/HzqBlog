/* eslint-disable react/display-name */
import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const UpdateForm = forwardRef((props, updateRef) => {
  const { name, url, icon, desc } = props.links

  useEffect(() => {
    const { name, url, icon, desc } = props.links
    updateRef.current.setFieldsValue({ name, url, icon, desc })
  }, [props])

  return (
    <Form ref={updateRef} initialValues={{ name, url, icon, desc }}>
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

UpdateForm.propTypes = {
  links: PropTypes.object.isRequired
}

export default UpdateForm
