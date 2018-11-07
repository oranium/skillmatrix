import React, { Component } from "react";

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
        <button type="submit" onClick={this.onClick}>
          {this.props.btnValue}
        </button>
      </div>
    );
  }
}

export default Input;
