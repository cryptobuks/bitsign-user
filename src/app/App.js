// Modules
import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Nav from './components/Nav'

// Views
import User from './views/User'
import Info from './views/Info'
import Transaction from './views/Transaction'
import TransactionGet from './views/TransactionGet'

import './App.css'

const App = () => (
  <div className="app">
    <Nav /> 
    <Switch>
      <Route exact path="/" component={User} />
      <Route exact path="/info" component={Info} />
      <Route exact path="/transaction" component={Transaction} />
      <Route exact path="/transactionGet" component={TransactionGet} />
    </Switch>
  </div>
)

export default App
