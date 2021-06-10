import { Route } from 'react-router-dom'
import { Component } from 'react'
import { connect } from 'react-redux'
import { routes } from './routes.js'
import { AppHeader } from './cmps/AppHeader.jsx'
import{logout} from './store/actions/userActions'
import { Footer } from './cmps/AppFooter.jsx'

class _App extends Component {
  render() {
    return (
      <div className="main-container main-layout" >
        <AppHeader logout={ logout} loggedInUser={ this.props.loggedInUser}/>
        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stays: state.stayModule.stays,
    loggedInUser:state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {

}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)



