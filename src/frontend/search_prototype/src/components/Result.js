import React, { Component } from "react";

class Result extends Component {
  render() {
    let { programming, design } = this.props.matches;
    return (
      <div className="list">
        {programming.length > 0 || design.length > 0 ? (
          <ul>
            <li>Programming</li>
            <ul>
              {programming.length > 0 ? (
                programming.map(match => <li key={match}>{match}</li>)
              ) : (
                <p>Nothing found.</p>
              )}
            </ul>
            <li>Design</li>
            <ul>
              {design.length > 0 ? (
                design.map(match => <li key={match}>{match}</li>)
              ) : (
                <p>Nothing found.</p>
              )}
            </ul>
          </ul>
        ) : null}
      </div>
    );
  }
}
export default Result;
