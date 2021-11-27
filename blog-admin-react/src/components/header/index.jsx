import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Dropdown, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { logout } from '../../redux/actions'
import './index.less'

class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  logout () {
    Modal.confirm({
      title: '确定退出吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.logout()
      }
    })
  }

  render () {
    const { user } = this.props

    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.logout.bind(this)}>退出登录</Menu.Item>
      </Menu>
    )

    return (
      <header className="admin-header">
        <h2>博客后台管理</h2>
        <div className="admin-header-user">
          <div className="user-avatar">
            <img src={user.avatar} alt="avatar" />
          </div>
          <div className="user-info">
            <Dropdown
              overlay={menu}
              placement="bottomCenter"
              arrow
              trigger={['click']}
            >
              <span>{user.name}<CaretDownOutlined /></span>
            </Dropdown>
          </div>
        </div>
      </header>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { logout }
)(withRouter(Header))
