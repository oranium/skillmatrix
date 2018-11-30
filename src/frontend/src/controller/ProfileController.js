// react
import React, { Component } from "react";
// react components
import TabContainer from "../components/TabContainer";

// redux
import store from '../Store';
import { changeView } from '../actions';

class ProfileController extends Component {
  handleChange = (evt, value) => {
    store.dispatch(changeView(value));
  };
  render() {
    const { state } = this.props;
    const { profile } = state;
    const { person, profiles, view, isEditable } = profile;
    return (
      <TabContainer
        state={profiles[person]}
        isEditable={isEditable}
        onChange={(evt, value) => this.handleChange(evt, value)}
        view={view}
      />
    );
  }
}

export default ProfileController;
