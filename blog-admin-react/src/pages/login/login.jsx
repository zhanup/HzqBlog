import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './login.less'

class Login extends Component {

 onFinish = async (values) => {
    const { name, password } = values
    this.props.login(name, password)
  }

  render() {
    // 如果用户已经登录，自动跳转到管理页面
    const { user } = this.props
    if (user && user.token) {
      return <Redirect to="/home" />
    }

    return (
      <div className="login">
        <div className="login-content">
          <h2>博客后台登录</h2>
          <Form
            className="login-form"
            onFinish={this.onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[
                { required: true, message: '请输入账号！' }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
  
            <Form.Item
              name="password"
              rules={[
                { required: true,  message: "请输入密码！" }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
  
            <Form.Item
            >
              <Button className="login-form-button" type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)

