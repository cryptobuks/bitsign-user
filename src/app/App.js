// Modules
import React, { Component } from 'react'
import { withRouter, Redirect, Switch, Route } from 'react-router-dom'

// Components
import Nav from './components/Nav'

// Views
import User from './views/User'
import Info from './views/Info'
import Transaction from './views/Transaction'
import TransactionGet from './views/TransactionGet'

import './App.css'

let fakeAuth;

try {
  fakeAuth = {
    address: JSON.parse(localStorage.getItem('ethereumAddress')),
    token: JSON.parse(localStorage.getItem('token')),

    /*authenticate(cb){
      this.address: JSON.parse(localStorage.getItem('ethereumAddress'))
      this.token: JSON.parse(localStorage.getItem('token'))
    },*/

    signout(cb) {
      console.log(fakeAuth.adress + " - " + fakeAuth.token);
      localStorage.clear();
    }
  }
} catch (error) {
    fakeAuth = {
    address: localStorage.setItem('ethereumAddress', ''),
    token: localStorage.setItem('token', ''),
    
    signout(cb) {
      console.log(fakeAuth.adress + " - " + fakeAuth.token);
      localStorage.clear();
    }
  }
  console.log(error)
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    this.setState({
      redirectToReferrer: true
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/info' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.token
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  fakeAuth.token ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

class App extends Component {
  render() {
    return (
      <div className="app">
      <AuthButton/>
        <Nav /> 
        <Switch>
          <Route exact path="/" component={User} />
          <Route exact path="/info" component={Info} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/transaction" component={Transaction} />
          <PrivateRoute exact path="/transactionGet" component={TransactionGet} />
        </Switch>
      </div>
    );
  }
}

export default App
