import React, { Component } from "react";

class Result extends Component {
  render() {
    return (
      <div>
        {this.props.matches.length > 0 ? (
          <ul>
            {this.props.matches.map(match => (
              <li key={match}>{match}</li>
            ))}
          </ul>
        ) : (
          <p> No search results (yet)! </p>
        )}
      </div>
    );
  }
}
export default Result;
