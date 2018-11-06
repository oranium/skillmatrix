import React, { Component } from "react";

class Result extends Component {
  render() {
    console.log(this.props.matches.length);
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

    /*
    return (
      <ul>
        {this.props.matches.map(match => (
          <li key={match}>{match}</li>
        ))}
      </ul>
    );
  }*/
  }
}
export default Result;
