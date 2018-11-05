import React, { Component } from "react";
import ReactDOM from "react-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [] };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.handleSearch(document.getElementById("query").value);
  };

  handleSearch(value) {
    //hardcoding data set
    const workers = {
      programming: ["Python", "Java", "Javascript"],
      design: ["Photoshop", "After Effects", "Drawing"]
    };

    if (!value) {
      return;
    }
    let results = [];
    for (
      var i = 0;
      workers.design.length > workers.programming.length
        ? i < workers.design.length
        : i < workers.programming.length;
      i++
    ) {
      if (workers.programming[i] && workers.programming[i].includes(value)) {
        results.push(workers.programming[i]);
        console.log(workers.programming[i]);
      } else if (workers.design[i] && workers.design[i].includes(value)) {
        results.push(workers.design[i]);
        console.log(workers.design[i]);
      } else {
        console.log("Nothing to see here");
      }
    }
    if (results.length > 0) {
      this.setState({ searchResults: results });
    } else {
      this.setState({ searchResults: [] });
    }
  }

  render() {
    return (
      <form id="parent" onSubmit={this.handleSubmit}>
        <label>Search request:</label>
        <p />
        <input type="text" id="query" />
        <p />
        <button type="submit">Search</button>
        <ul>
          {this.state.searchResults.length > 0
            ? this.state.searchResults.map(item => <li key={item}>{item}</li>)
            : "No results (yet)!"}
        </ul>
      </form>
    );
  }
}

ReactDOM.render(<Search />, document.getElementById("root"));
