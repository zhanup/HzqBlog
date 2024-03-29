import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Modal, Dropdown, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import * as actions from '../../redux/actions'
import './index.less'

function Header () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    Modal.confirm({
      title: '确定退出吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch(actions.logout())
      }
    })
  }

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={logout}>退出登录</Menu.Item>
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

export default withRouter(Header)
