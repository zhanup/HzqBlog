import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import BlogsHome from './home'
import BlogsEdit from './edit'

export default class Blogs extends Component {
  render () {
    return (
      <Switch>
        <Route path="/blogs" component={BlogsHome} exact /> {/* 路径完全匹配 */}
        <Route path="/blogs/edit" component={BlogsEdit} />
        <Redirect to="/blogs" />
      </Switch>
    )
  }
}
