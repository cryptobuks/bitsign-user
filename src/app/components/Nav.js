import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav className="navbar">
    <Link to="/">New User</Link>
    <Link to="/info">User Info</Link>
    <Link to="/transaction">Transaction</Link>
    <Link to="/transactionGet">Transaction Info</Link>
  </nav>
)

export default Nav
