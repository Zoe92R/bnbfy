import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { routes } from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import { logout } from './store/actions/userActions'
import { Footer } from './cmps/AppFooter.jsx'

class _App extends Component {
  render() {
    return (
      <div className="main-container main-layout" >
        <Router>
        <AppHeader logout={this.props.logout} loggedInUser={this.props.loggedInUser} />
        {/* <BrowserRouter> */}
          <Switch>
            {routes.map(route => <Route key={route.path} exact component={route.component} exact path={route.path} />)}
          </Switch>
        {/* </BrowserRouter> */}
        <Footer />
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  logout
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)



