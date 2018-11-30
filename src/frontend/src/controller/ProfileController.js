// react
import React, { Component } from "react";
// react components
import TabContainer from "../components/TabContainer";

// redux
import store from "../Store";
import {
  changeView,
  setError,
  setSearchResults,
  showSearchResults
} from "../actions";

// Rest
import RestPoints from "../rest/Init";
import RestCom from "../rest/Rest";

class ProfileController extends Component {
  handleChange = (evt, value) => {
    store.dispatch(changeView(value));
  };
  render() {
    const { state } = this.props;
    const { profile } = state;
    const { person, profiles, view } = profile;
    return (
      <TabContainer
        state={profiles[person]}
        onChange={(evt, value) => this.handleChange(evt, value)}
        view={view}
      />
    );
  }
}

export default ProfileController;
