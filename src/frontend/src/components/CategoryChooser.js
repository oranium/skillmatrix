import React, { Component } from "react";

class CategoryChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCategory = () => {
    let radios = document.getElementsByName("skillcategory");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        console.log(radios[i].value);
        this.props.radioAlertChanged(radios[i].value);
      }
    }
  };
  render() {
    return (
      <div onChange={this.getCategory}>
        {Object.keys(this.props.category).map(key => {
          let upperKey = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <label key={upperKey}>
              <input
                type="radio"
                name="skillcategory"
                value={upperKey}
                key={upperKey + "radio"}
              />
              {upperKey}
            </label>
          );
        })}
      </div>
    );
  }
}
export default CategoryChooser;
