// import react
import React, { Component } from 'react';

// import redux
import store from '../Store';
import {
  updateInput,
  switchPage,
  setInputError,
  setError,
  resetForm,
  setUsername,
  resetState,
} from '../actions';

// import page parts
import Header from './Header';
import Form from './Form';
import LoginForm from './LoginForm';
import ErrorPaper from './ErrorPaper';

// Rest
import RestPoints from '../rest/Init';
import RestCom from '../rest/Rest';

class App extends Component {
  static async handleLogin(username, password) {
    const loginCredential = {
      username,
      password,
    };
    const loginCredentials = JSON.stringify(loginCredential);
    console.log(loginCredentials);
    const Rest = new RestCom(RestPoints.login, loginCredentials);

    try {
      const { data } = await Rest.post();
      const { user } = data;
      store.dispatch(setUsername(user.username));
      store.dispatch(switchPage('form'));
    } catch (e) {
      store.dispatch(setError(e.message));
      store.dispatch(switchPage('login'));
    }
  }

  // user wants to reset all input fields
  static handleResetForm() {
    store.dispatch(resetForm());
  }

  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleLogout = this.handleLogout.bind(this);
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
      store.dispatch(resetState());
      // go back to login
      store.dispatch(switchPage('login'));
    } catch (e) {
      // display error Message to user
      console.log(e);
      store.dispatch(setError(e.message));
    }
  }

  render() {
    const { state } = this.props;
    const {
      page, error, user, formState,
    } = state;

    if (page === 'login') {
      return (
        <LoginForm
          errorMsg={error.message}
          login={(username, password) => App.handleLogin(username, password)}
        />
      );
    }
    let errorPaper = '';
    console.log(error);
    if (error.hasError) {
      errorPaper = <ErrorPaper errorMsg={error.message} />;
    }
    return (
      <div>
        <Header username={user} logout={this.handleLogout} />
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
          {errorPaper}
        </main>
      </div>
    );
  }
}

export default App;
