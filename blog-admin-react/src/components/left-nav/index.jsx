import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import {
  HomeOutlined,
  EditOutlined,
  TagsOutlined,
  AppstoreOutlined,
  LinkOutlined,
  CommentOutlined,
  AreaChartOutlined,
  UserOutlined
} from '@ant-design/icons'

const { SubMenu } = Menu

function LeftNav (props) {
  const jumpTo = (item) => {
    props.history.push(item.key)
  }

  const path = props.location.pathname
  let openKey = path
  if (path === '/publish' || path === '/blogs') {
    openKey = '/article'
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[path]}
      defaultOpenKeys={[openKey]}
      onClick={jumpTo}
    >
      <Menu.Item key="/home" icon={<HomeOutlined />}>
        系统首页
      </Menu.Item>

      <SubMenu key="/article" icon={<EditOutlined />} title="文章管理">
        <Menu.Item key="/blogs">文章列表</Menu.Item>
        <Menu.Item key="/publish">发布文章</Menu.Item>
      </SubMenu>

      <Menu.Item key="/comment" icon={<CommentOutlined />}>
        评论管理
      </Menu.Item>

      <Menu.Item key="/links" icon={<LinkOutlined />}>
        友链管理
      </Menu.Item>

      <Menu.Item key="/tags" icon={<TagsOutlined />}>
        标签管理
      </Menu.Item>

      <Menu.Item key="/category" icon={<AppstoreOutlined />}>
        分类管理
      </Menu.Item>

      <Menu.Item key="/gallery" icon={<AreaChartOutlined />}>
        图片管理
      </Menu.Item>

      <Menu.Item key="/user" icon={<UserOutlined />}>
        用户管理
      </Menu.Item>
    </Menu>
  )
}

LeftNav.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default withRouter(LeftNav)
