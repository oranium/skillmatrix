// react
import React, { Component } from 'react';
// react components

// redux
import store from '../Store';
import { setError, setSearchResults, showSearchResults } from '../actions';

// Rest
import RestPoints from '../rest/Init';
import RestCom from '../rest/Rest';

class ProfileController extends Component {
  render() {
    const { state, self } = this.props;
    const { page, onClick } = state;
    if (self) {
      return <h1>Eigenes Profil</h1>;
    }
  }
}
