// import react
import React, { Component } from 'react';

// import redux
import store from '../Store';
import {
  updateInput,
  switchPage,
  setError,
  resetForm,
  setUsername,
  setLoginError,
  resetState,
} from '../actions';

// import page parts
import Header from './Header';
import Form from './Form';
import LoginForm from './LoginForm';

// Rest
import RestPoints from '../rest/Init';
import RestCom from '../rest/Rest';

class App extends Component {
  static async handleLogin(username, password) {
    const loginCredentials = {
      username,
      password,
    };
    const Rest = new RestCom(RestPoints.login, loginCredentials);

    try {
      const { data } = await Rest.post();
      const { user } = data;
      store.dispatch(setUsername(user.username));
      store.dispatch(switchPage('form'));
    } catch (e) {
      store.dispatch(setLoginError(e.message));
      store.dispatch(switchPage('login'));
    }
  }

  // user wants to reset all input fields
  static handleResetForm() {
    store.dispatch(resetForm());
  }

  // user inputs something into an input field
  handleChange(id, value) {
    const { state } = this.props;

    if (state.formState[id].error) {
      store.dispatch(setError(id, false));
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
          store.dispatch(setError(key, true));
          submit = false;
        } else {
          store.dispatch(setError(key, false));
        }
      });
    }
    if (submit) {
      store.dispatch(switchPage(newPage));
    }
  }

  async handleLogout() {
    const { state } = this.props;
    const user = {
      user: state.user,
    };
    const Rest = new RestCom(RestPoints.logout, user);
    try {
      await Rest.post();
      // logout in frontend
      // reset state
      store.dispatch(resetState);
      // go back to login
      store.dispatch(switchPage('login'));
    } catch (e) {
      // display error Message to user
    }
  }

  render() {
    const { state } = this.props;
    const {
      page, errorMsg, user, formState,
    } = state;

    if (page === 'login') {
      return (
        <LoginForm
          errorMsg={errorMsg}
          login={(username, password) => App.handleLogin(username, password)}
        />
      );
    }
    return (
      <div>
        <Header username={user} logout={App.handleLogout} />
        <main>
          <h1>Neuen Skill erstellen</h1>
          <Form
            inputs={formState}
            page={page}
            name="test"
            onChange={(id, value) => this.handleChange(id, value)}
            onSubmit={newPage => this.handleSubmit(newPage)}
            onReset={() => this.handleResetForm()}
          />
        </main>
      </div>
    );
  }
}

export default App;
