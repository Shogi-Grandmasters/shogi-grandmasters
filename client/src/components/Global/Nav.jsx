import React, { Component } from 'react';

class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return (
      
    )
  }
}