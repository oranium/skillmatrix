import React, { Component } from "react";
import "./App.css";
import Input from "./Input";
import Result from "./Result";
import CategoryChooser from "./CategoryChooser";

class Search extends Component {
  state = {
    matches: [],
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
        alert("Skill " + skill + " is already registered in Programming!");
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
        alert("Skill " + skill + " is already registered in Design!");
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
    let results = [];
    let dataset = this.state.dataset;
    if (input === "") return results;
    for (
      var i = 0;
      dataset.design.length > dataset.programming.length
        ? i < dataset.design.length
        : i < dataset.programming.length;
      i++
    ) {
      if (
        dataset.programming[i] &&
        dataset.programming[i].includes(input.toLowerCase())
      ) {
        results.push("Programming: " + dataset.programming[i]);
      }
      if (
        dataset.design[i] &&
        dataset.design[i].includes(input.toLowerCase())
      ) {
        results.push("Design: " + dataset.design[i]);
      }
    }
    results = results.map(result => {
      let resWords = result.split(" ");
      for (let i = 0; i < resWords.length; i++) {
        resWords[i] =
          resWords[i].charAt(0).toUpperCase() + resWords[i].slice(1);
      }
      console.log("result before magic: ", result);
      result = resWords.join(" ");
      console.log("result after magic: ", result);
      return result;
    });
    return results;
  };

  render() {
    return (
      <div className="Search">
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
