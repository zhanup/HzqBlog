/* eslint-disable react/display-name */
import React, { useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const UpdateForm = forwardRef((props, ref) => {
  const { categoryName } = props

  useEffect(() => {
    // 当props值更新，使用setFieldsValue方法更新input的值
    ref.current.setFieldsValue({ name: props.categoryName })
  }, [props])

  return (
    <Form ref={ref} initialValues={{ name: categoryName }}>
      <Form.Item
        name="name"
        label="分类名称"
        rules={[{ required: true, message: '必须输入分类名称！' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
})

UpdateForm.propTypes = {
  categoryName: PropTypes.string.isRequired
}

export default UpdateForm
