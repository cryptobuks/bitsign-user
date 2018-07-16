import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userInfo } from '../actions'

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      address: '',
      token: ''
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

  handleSubmit(event, from) {
    event.preventDefault();
    console.log('event: ', from)
    this.props.asUserInfo(this.state, from, this.props.history)
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/info' } }

    return (
      <form onSubmit={(event) => this.handleSubmit(event, from)}>
      <h1>User Info { from.pathname } </h1>
        <label>
          Email:
          <input name="email" type="email" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input name="password" type="password" pattern=".{8,}" placeholder="Minimum 8 characters" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  address: state.address,
  token: state.token
})

const mapDispatchToProps = dispatch => ({
  asUserInfo: (props, from, history) => dispatch(userInfo(props, from, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Info);