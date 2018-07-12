import React, { Component } from 'react';
import axios from 'axios';
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
    this.setLocal = this.setLocal.bind(this);
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
    axios.get('https://api.bitsign.io/api/v2/user?email='+this.state.email+'&password='+this.state.password, {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        alert('A user was submitted: ' + this.state.userName + this.state.email +this.state.password);
        console.log(res);
        console.log(res.data.data);
        this.setState({
          address: res.data.data.ethereum.address,
          token: res.data.data.token
        });
        this.props.asUserInfo(this.state);
        this.setLocal(res);
      })
  }

  setLocal(res) {
    localStorage.setItem('ethereumAddress', JSON.stringify(res.data.data.ethereum.address));
    localStorage.setItem('token', JSON.stringify(res.data.data.token));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h1>User Info</h1>
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
  asUserInfo: (props) => dispatch(userInfo(props))
})


export default connect(mapStateToProps, mapDispatchToProps)(Info);
