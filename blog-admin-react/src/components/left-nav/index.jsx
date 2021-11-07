import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Menu } from "antd";

import {
  HomeOutlined,
  EditOutlined,
  TagsOutlined,
  AppstoreOutlined,
  LinkOutlined,
  CommentOutlined,
  AreaChartOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

class LeftNav extends Component {
  jumpTo = (item) => {
    this.props.history.push(item.key);
  }

  render() {
    let path = this.props.location.pathname;
    let openKey = path;
    if (path === '/publish' || path === '/blogs') {
      openKey = '/article';
    }

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[path]}
        defaultOpenKeys={[openKey]}
        onClick={this.jumpTo}
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
      </Menu>
    );
  }
}

export default withRouter(LeftNav)

/*
  普通组件得不到 history / location等属性
  需要使用 withRouter 包裹组件
*/
