/* eslint-disable react/display-name */
import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const UpdateForm = forwardRef((props, updateRef) => {
  const { tagName } = props

  useEffect(() => {
    const { tagName } = props
    updateRef.current.setFieldsValue({ name: tagName })
  }, [props])

  return (
    <Form ref={updateRef} initialValues={{ name: tagName }}>
      <Form.Item
        name="name"
        label="标签名称"
        rules={[{ required: true, message: '必须输入标签名称' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
})

UpdateForm.propTypes = {
  tagName: PropTypes.string.isRequired
}

export default UpdateForm
