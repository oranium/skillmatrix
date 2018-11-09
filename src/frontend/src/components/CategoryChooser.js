import React, { Component } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { FormControl, FormLabel } from "@material-ui/core";

class CategoryChooser extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "Programming" };
  }

  handleChange = (event, value) => {
    this.setState({ value: value });
    this.props.radioOnChange(value);
  };

  render() {
    return (
      <div className="categorychooser>">
        <FormControl component="fieldset" className="formcontrol">
          <FormLabel component="legend">Category to add to</FormLabel>
          <RadioGroup
            value={this.state.value}
            onChange={this.handleChange}
            name="skillcategory"
          >
            {Object.keys(this.props.category).map(key => {
              let upperKey = key.charAt(0).toUpperCase() + key.slice(1);
              return (
                <FormControlLabel
                  value={key}
                  control={<Radio />}
                  label={upperKey}
                  key={key}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default CategoryChooser;
