import React, { Component } from "react";
import "./App.css";
import Input from "./Input";
import Result from "./Result";
import CategoryChooser from "./CategoryChooser";
import Header from "./Header";

class Search extends Component {
  state = {
    matches: { programming: [], design: [] },
    dataset: {
      programming: ["python", "java", "javascript"],
      design: ["photoshop", "after effects", "drawing"]
    },
    nextCategory: ""
  };

  onChange = (id, value) => {
    console.log("in onChange, input value: ", value);
    switch (id) {
      case "search":
        this.handleQuery(value);
        break;
      case "addskill":
        this.handleAddSkill(value);
        break;
      default:
        break;
    }
  };

  radioOnChange = name => {
    console.log(name);
    this.setState({
      matches: this.state.matches,
      dataset: this.state.dataset,
      nextCategory: name.toLowerCase()
    });
  };

  handleQuery = input => {
    console.log("in handleQuery input: ", input);
    this.setState({
      matches: this.findMatches(input),
      dataset: this.state.dataset,
      nextCategory: this.state.nextCategory
    });
  };

  handleAddSkill = skill => {
    if (this.state.nextCategory === "") {
      alert("Please choose a category to add your skill to!");
      return;
    }
    console.log("in handleAddSkill");
    if (this.state.nextCategory === "programming") {
      if (this.state.dataset.programming.includes(skill)) {
        alert("Skill " + skill + " is already registered in programming!");
        return;
      }
      console.log("adding skill to programming");
      this.setState({
        matches: this.state.matches,
        dataset: {
          programming: [...this.state.dataset.programming, skill],
          design: [...this.state.dataset.design]
        },
        nextCategory: this.state.nextCategory
      });
    }
    if (this.state.nextCategory === "design") {
      if (this.state.dataset.design.includes(skill)) {
        alert("Skill " + skill + " is already registered in design!");
        return;
      }
      console.log("adding skill to design");
      this.setState({
        matches: this.state.matches,
        dataset: {
          programming: [...this.state.dataset.programming],
          design: [...this.state.dataset.design, skill]
        },
        nextCategory: this.state.nextCategory
      });
    }
  };

  findMatches = input => {
    let designMatches = [];
    let programmingMatches = [];
    let dataset = this.state.dataset;

    if (input === "") return this.state.matches;
    dataset.design.map(entry => {
      if (entry.includes(input)) {
        designMatches.push(entry);
      }
    });
    dataset.programming.map(entry => {
      if (entry.includes(input)) {
        programmingMatches.push(entry);
      }
    });
    console.log(programmingMatches);
    return {
      programming: programmingMatches,
      design: designMatches
    };
  };

  render() {
    return (
      <div className="Search">
        <Header username="Valdemar Forsberg" />
        <p />
        <form>
          <Input
            btnValue="Search"
            lblValue="Search "
            onChange={this.onChange}
            id="search"
          />
        </form>
        <Result matches={this.state.matches} />
        <hr />
        <form>
          <Input
            btnValue="Add Skill"
            lblValue="Skill to Add "
            onChange={this.onChange}
            id="addskill"
          />
        </form>
        <CategoryChooser
          category={this.state.dataset}
          radioOnChange={this.radioOnChange}
        />
      </div>
    );
  }
}

export default Search;
