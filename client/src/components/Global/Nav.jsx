import React, { Component } from 'react';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.username,
    };
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
      </div>
    )
  }
}

export default Nav;