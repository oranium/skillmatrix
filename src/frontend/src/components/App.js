import React, { Component } from "react";
import "./App.css";
import Input from "./Input";
import Result from "./Result";

class Search extends Component {
  state = {
    matches: [],
    dataset: {
      programming: ["Python", "Java", "Javascript"],
      design: ["Photoshop", "After Effects", "Drawing"]
    }
  };
  onInputStateChanged = input => {
    this.setState({
      matches: this.handleSearchRequest(input),
      dataset: this.state.dataset
    });
  };

  handleSearchRequest = input => {
    let results = [];
    let dataset = this.state.dataset;
    for (
      var i = 0;
      dataset.design.length > dataset.programming.length
        ? i < dataset.design.length
        : i < dataset.programming.length;
      i++
    ) {
      if (dataset.programming[i] && dataset.programming[i].includes(input)) {
        results.push(dataset.programming[i]);
      }
      if (dataset.design[i] && dataset.design[i].includes(input)) {
        results.push(dataset.design[i]);
      }
    }
    return results;
  };

  render() {
    return (
      <div className="Search">
        <Input
          btnValue="Search"
          onInputStateChanged={this.onInputStateChanged}
        />
        <Result matches={this.state.matches} />
      </div>
    );
  }
}

export default Search;
