import React, { Component, Fragment } from "react"
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history"
import { connect } from "react-redux"

import MainPage from "./containers/App";
import DetailPage from "./containers/Detail";

const history = createBrowserHistory()
class App extends Component {
  
  render() {
    return (
      <Fragment>
        <Router history={history}>
          <Switch>
            <Route key="menu2" exact path={`/`} component={MainPage} />
            <Route key="menu1" path={`/detail/:id`} component={DetailPage} />
          </Switch>
        </Router>
      </Fragment>
    )
  }
}

export default connect(
  ({ stockbit }) => ({ stockbit }),
  {}
)(App)
