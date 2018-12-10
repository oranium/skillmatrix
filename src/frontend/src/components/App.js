// import react
import React, { Component } from 'react';

// import redux parts
import store from 'Store';
import {
  updateInput,
  switchPage,
  setInputError,
  setError,
  resetForm,
  setUser,
  setAllSkills,
  setOwnProfile,
} from 'actions';

// import page parts
import SearchController from 'components/search/SearchController';
import ProfileController from 'components/profile/ProfileController';

import LoginForm from 'components/login/LoginForm';

import Header from 'components/header/Header';

import ErrorDialog from 'components/error/ErrorDialog';

// Rest
import RestPoints from 'rest/Init';
import RestCom from 'rest/Rest';

class App extends Component {
  static async handleLogin(username, password) {
    const loginCredentials = {
      username,
      password,
    };
    const Rest = new RestCom(RestPoints.login, JSON.stringify(loginCredentials));

    try {
      const { data } = await Rest.post();
      const { user, allSkills } = data;
      store.dispatch(setUser(user));
      store.dispatch(setAllSkills(allSkills));
      store.dispatch(setOwnProfile(user));
      store.dispatch(switchPage('search'));
    } catch (e) {
      store.dispatch(setError(e.message));
      store.dispatch(switchPage('login'));
    }
  }

  // user wants to reset all input fields
  static handleResetForm() {
    store.dispatch(resetForm);
  }

  // user inputs something into an input field
  handleChange(id, value) {
    const { state } = this.props;

    if (state.formState[id].error) {
      store.dispatch(setInputError(id, false));
    }
    store.dispatch(updateInput(id, value));
  }

  // user clicks button to show form/labels
  handleSubmit(newPage) {
    const { state } = this.props;
    const { page } = state;

    const inputs = state.formState;
    let submit = true;
    if (page === 'form') {
      const keys = Object.keys(inputs);
      keys.foreach((key) => {
        const input = inputs[key];
        if (input.value === '') {
          store.dispatch(setInputError(key, true));
          submit = false;
        } else {
          store.dispatch(setInputError(key, false));
        }
      });
    }
    if (submit) {
      store.dispatch(switchPage(newPage));
    }
  }

  render() {
    const { state } = this.props;
    const {
      page, error, user,
    } = state;
    const { hasError } = error;

    let main;

    switch (page) {
      case 'login':
        return (
          <LoginForm
            errorMsg={error.message}
            login={(username, password) => App.handleLogin(username, password)}
          />
        );
      case 'search':
        main = (
          <SearchController onChange={(id, value) => this.handleChange(id, value)} state={state} />
        );
        break;

      case 'profile':
        main = <ProfileController state={state} />;
        break;

      default:
        return 'Error';
    }

    return (
      <div>
        <Header
          state={state}
          user={user}
        />
        <main>
          {main}
          {hasError && <ErrorDialog state={state} />}
        </main>
      </div>
    );
  }
}

export default App;
