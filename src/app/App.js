// Modules
import React, { Component } from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { fakeAuth, logOut } from './actions'

// Components
import Nav from './components/Nav'

// Views
import User from './views/User'
import Info from './views/Info'
import Transaction from './views/Transaction'
import TransactionGet from './views/TransactionGet'

import './App.css'

/*const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (rest.token)
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/info',
          state: { from: props.location }
        }} />
  )} />
)*/

class PrivateRoute extends Component {
  
  render() {
      if (this.props.token) {
        return (
          <Route exact path={this.props.path} component={this.props.component} />
        )
      } else {
        return (
          <Redirect to={{pathname: '/info', state: { from: this.props.location }}} />
        )
      }
  }
}

const AuthButton = ({token, funcion}) => (
  (token) ? (
    <p>
      Welcome! <button onClick={() => funcion()} >Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
)

class App extends Component {
  componentWillMount() {
    console.log("willmount: " + this.props);
    this.props.asFakeAuth()
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (!this.props.token === '') {
      console.log('update')
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
        <AuthButton token={this.props.token} funcion={() => this.props.asLogOut()}/>
          <Nav /> 
          <Switch>
            <Route exact path="/" component={User} />
            <Route exact path="/info" component={Info} />
            <PrivateRoute token={this.props.token} exact path="/transaction" component={Transaction} />
            <PrivateRoute token={this.props.token} exact path="/transactionGet" component={TransactionGet} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  asFakeAuth: () => dispatch(fakeAuth()),
  asLogOut: (history) => dispatch(logOut(history))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
