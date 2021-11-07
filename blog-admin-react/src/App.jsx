import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.less';

import Admin from './pages/admin/admin'
import Login from './pages/login/login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App


