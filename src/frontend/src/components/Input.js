import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
        <TextField
          required
          type="text"
          label={this.props.lblValue}
          className="input"
          margin="normal"
          variant="outlined"
          id={this.props.id}
        />
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
