import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class Input extends Component {
  onClick = event => {
    event.preventDefault();
    this.props.onChange(
      this.props.id,
      document.getElementById(this.props.id).value
    );
  };
  render() {
    return (
      <div>
        <label>{this.props.lblValue}</label>
        <input className="input" type="text" id={this.props.id} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={this.onClick}
        >
          {this.props.btnValue}
        </Button>
      </div>
    );
  }
}

export default Input;
