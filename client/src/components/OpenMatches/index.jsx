import React, { Component } from "react";

import "./OpenMatches.css";

class OpenMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  componentDidMount() {
  }

  onChange = e => {
    e.preventDefault();
    this.props.handlematchSelect(e.target);
  };

  render() {
    return (
      <div className="open-matches">
        <select onChange={this.onChange}>
          <option>Select a Match</option>
          {this.props.openMatches && this.props.openMatches.map(match => {
            return (
              <option key={match.id} value={JSON.stringify(match)}>
                {match.id}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default OpenMatches;
