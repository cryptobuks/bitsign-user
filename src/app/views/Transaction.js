import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fakeAuth, notarization } from '../actions'

import Spinner from './Spinner'


class Transaction extends Component {
  componentWillMount() {
    console.log("willmount transaction: " + this.props);
    this.props.asFakeAuth()
  }

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      token: '',
      address: '',
      data: '',
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.asNotarization(this.state);
  }

  render() {
    if (this.props.loading) {
      return (
        <Spinner />
      )
    } else {
      return (
      <form onSubmit={this.handleSubmit}>
      <h1>Transaction:</h1>
        <label>
          Token:
          <input name="token" type="text" required="required" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Data:
          <input name="data" type="text" required="required" value={this.state.value} placeholder="Hash in sha3 or sha256" onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input name="address" type="text" required="required" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input name="password" type="password" pattern=".{8,}" placeholder="Minimum 8 characters" required="required" value={this.state.value} onChange={this.handleChange} />
        </label>
        
        <input type="submit" value="Submit" />
      </form>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  password: state.password,
  token: state.token,
  address: state.address,
  data: state.data,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  asFakeAuth: () => dispatch(fakeAuth()),
  asNotarization: (props) => dispatch(notarization(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);