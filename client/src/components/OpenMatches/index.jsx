import React, { Component } from "react";

import "./OpenMatches.css";

class OpenMatches extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  onChange = e => {
    e.preventDefault();
    this.props.handleMatchSelect(e.target.value);
  };

  render() {
    return (
      <div className="open-matches">
        <select onChange={this.onChange} size="20">
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
