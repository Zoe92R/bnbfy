import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  loadUsers,
  // removeUser,
  login,
  logout,
  signup
} from '../store/actions/userActions'

class _LoginSignup extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    }
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', fullname: '' } })
  }

  removeUser = userId => {
    this.props.removeUser(userId)
  }
  render() {
    let signupSection = (
      <form className="frm" onSubmit={this.doSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          name="fullname"
          value={this.state.signupCred.fullname}
          onChange={this.signupHandleChange}
          placeholder="Full name"
          autoComplete="fullname"
        />
        <input
          name="password"
          type="password"
          value={this.state.signupCred.password}
          onChange={this.signupHandleChange}
          placeholder="Password"
          autoComplete="current-password"
        />
        <input
          type="text"
          name="username"
          value={this.state.signupCred.username}
          onChange={this.signupHandleChange}
          placeholder="Username"
          autoComplete="username"
        />
        <br />
        <button>Signup</button>
      </form>
    )
    let loginSection = (
      <form className="frm" onSubmit={this.doLogin}>
        <h2>Login</h2>
        <select
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
        >
          <option value="">Select User</option>
          {this.props.users && this.props.users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
        </select>

        {/* <input
          type="text"
          name="username"
          value={this.state.loginCred.username}
          onChange={this.loginHandleChange}
          placeholder="Username"
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.loginCred.password}
          onChange={this.loginHandleChange}
          placeholder="Password"
        />
        <br /> */}
        <button>Login</button>
      </form>
    )

    const { loggedInUser } = this.props
    return (
      <div className="login">
        <h1>
          Login / Signup
        </h1>
        <p>{this.state.msg}</p>
        {loggedInUser && (
          <div>
            <h3>
              Welcome {loggedInUser.fullname}
              <button onClick={this.props.logout}>Logout</button>
            </h3>
          </div>
        )}
        {!loggedInUser && loginSection}
        {!loggedInUser && signupSection}

        <hr />
        {/* <section className="admin">
          <details>
            <summary>Admin</summary>
            <button onClick={this.props.loadUsers}>Refresh Users</button>
            {this.props.isLoading && 'Loading...'}
            {this.props.users && <ul>

              {this.props.users.map(user => (
                <li key={user._id}>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                  <button
                    onClick={() => {
                      this.removeUser(user._id)
                    }}
                  >
                    Remove {user.username}
                  </button>
                </li>
              ))}
            </ul>}
          </details>
        </section> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  loadUsers
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)
