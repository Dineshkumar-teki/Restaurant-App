import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', errMsg: '', displayErrMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value, displayErrMsg: false})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value, displayErrMsg: false})
  }

  submitLoginCrendentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userCredentilas = {
      username,
      password,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentilas),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errMsg: data.error_msg, displayErrMsg: true})
    }
  }

  render() {
    const {username, password, errMsg, displayErrMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <section className="loginRoute">
        <div className="loginCard">
          <h1>Login</h1>
          <form className="loginForm" onSubmit={this.submitLoginCrendentials}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              placeholder="Enter Username"
              type="text"
              onChange={this.onChangeUsername}
              value={username}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter Password"
              type="password"
              onChange={this.onChangePassword}
              value={password}
            />
            <button className="loginBtn" type="submit">
              Login
            </button>
            {displayErrMsg ? <p className="errMsg">* {errMsg}</p> : null}
          </form>
        </div>
      </section>
    )
  }
}
export default LoginRoute
