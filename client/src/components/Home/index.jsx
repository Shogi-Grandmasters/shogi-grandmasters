import React, { Component } from 'react'

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  logout = () => {
    window.localStorage.clear();
    this.props.history.push('/login');
  }

  render() {
    return(
      <div>
        {localStorage.getItem('username')}
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    )
  }
}

export default Home;