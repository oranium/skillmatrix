import React, { Component } from "react";

class Input extends Component {
  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.onInputStateChanged(
            document.getElementsByClassName("input")[0].value
          );
        }}
      >
        <label>Search Request:</label>
        <input className="input" type="text" />
        <button type="submit">{this.props.btnValue}</button>
      </form>
    );
  }
}

export default Input;
