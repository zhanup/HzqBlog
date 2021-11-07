import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout} from 'antd'
import {connect} from 'react-redux'
import './admin.less'

import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Publish from '../publish/publish'
import Blogs from '../blogs/blogs'
import Links from '../links/links'
import Tags from '../tags/tags'
import Category from '../category/category'
import Comment from '../comment/comment'
import Gallery from '../gallery/gallery'

const { Content, Sider } = Layout

class Admin extends Component {
  render() {
    const user = this.props.user
    // 如果内存没有存信user --> 当前没有登录
    if (!user || !user.token ) {
      // 自动跳转到登录
      return <Redirect to="/login" />
    }

    return (
      <Layout className="admin">
          <Header/>
          <Layout theme="light" style={{marginTop: 64}}>
              <Sider
                  style={{
                      overflow: "auto",
                      height: "100vh",
                      position: "fixed",
                      left: 0,
                      zIndex: 1
                  }}
              >
                  <LeftNav/>
          </Sider>

          <Content style={{
              marginLeft: 200,
              padding: 10, 
              minHeight: "calc(100vh - 64px)",
              minWidth: "1135px"
            }}
          >
              <Switch>
                  <Redirect exact from="/" to="/home"/>
                  <Route path="/home" component={Home}/>
                  <Route path="/publish" component={Publish}/>
                  <Route path="/blogs" component={Blogs}/>
                  <Route path="/comment" component={Comment}/>
                  <Route path="/links" component={Links}/>
                  <Route path="/tags" component={Tags}/>
                  <Route path="/category" component={Category}/>
                  <Route path="/gallery" component={Gallery}/>
              </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)

