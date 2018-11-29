// import react
import React, { Component } from 'react';

// import redux parts
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
import SearchController from '../controller/SearchController';
import LoginForm from './LoginForm';
import ErrorPaper from './ErrorPaper';

// Rest
import RestPoints from '../rest/Init';
import RestCom from '../rest/Rest';

class App extends Component {
  static async handleLogin(username, password) {
    const loginCredentials = {
      username,
      password,
    };
    const Rest = new RestCom(RestPoints.login, JSON.stringify(loginCredentials));

    try {
      const { data } = await Rest.post();
      const { user } = data;
      store.dispatch(setUsername(user.username));
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
    const Rest = new RestCom(RestPoints.logout, JSON.stringify(user));
    try {
      await Rest.post();
      // logout in frontend
      // reset state
      store.dispatch(resetState);
      // go back to login
      store.dispatch(switchPage('login'));
    } catch (e) {
      // display error Message to user<
      console.log(e);
      store.dispatch(setError(e.message));
    }
  }

  render() {
    const { state } = this.props;
    const {
      page, error, user, formState,
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
      case 'profile':
        main = (
          <Form
            inputs={formState}
            page={page}
            name="test"
            onChange={(id, value) => this.handleChange(id, value)}
            onSubmit={newPage => this.handleSubmit(newPage)}
            onReset={() => this.handleResetForm()}
            key="ownProfile"
          />
        );
        break;
      case 'search':
        main = (
          <SearchController onChange={(id, value) => this.handleChange(id, value)} state={state} />
        );
        break;

      case "profile":
        main.push(<Profile />);
        break;

      default:
        return 'Error';
    }

    return (
      <div>
        <Header
          username={user}
          switchToProfile={() => this.handleSubmit('profile')}
          logout={this.handleLogout}
        />
        <main>
          {main}
          {hasError && <ErrorPaper errorMsg={error.message} />}
        </main>
      </div>
    );
  }
}

export default App;
