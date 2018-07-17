import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fakeAuth, getTransaction } from '../actions'

import Spinner from './Spinner'

class Transaction extends Component {
  componentWillMount() {
    console.log("willmount get: " + this.props);
    this.props.asFakeAuth()
  }

  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      token: '',
      address: '',
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
    this.props.asGetTransaction(this.state);
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
          Hash:
          <input name="hash" type="text" value={this.state.value} placeholder="Optional" onChange={this.handleChange} />
        </label>
                
        <input type="submit" value="Submit" />
      </form>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
  address: state.address,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  asFakeAuth: () => dispatch(fakeAuth()),
  asGetTransaction: (props) => dispatch(getTransaction(props))
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);