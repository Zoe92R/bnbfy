import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { routes } from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { logout } from './store/actions/userActions'
import { Footer } from './cmps/AppFooter.jsx'

class _App extends Component {

  render() {
    const { loggedInUser, logout } = this.props
    return (
      // <div className="main-container main-layout" >
      <React.Fragment>
        <AppHeader logout={logout}
          loggedInUser={loggedInUser} />
        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        <Footer />
      {/* </div> */}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    loggedInUser: state.userModule.loggedInUser,
  }
}

const mapDispatchToProps = {
  logout
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)



