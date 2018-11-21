// import react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import redux
import store from './Store';
import {
  updateInput,
  switchPage,
  setError,
  resetForm,
  setUsername,
  setLoginError,
  resetState,
} from './actions';

// import page parts
import Header from './components/Header';
import Form from './components/Form';
import LoginForm from './components/LoginForm';

// import functions for usermanagement
import LoginApi from './user/Login';
import LogoutApi from './user/Logout';

import './index.css';

class App extends Component {
  static async handleLogin(username, password) {
    const loginResponse = await LoginApi(username, password);
    if (loginResponse.success) {
      const user = loginResponse.user.username;
      store.dispatch(setUsername(user));
      store.dispatch(switchPage('form'));
    } else {
      const { errorMsg } = loginResponse;
      store.dispatch(setLoginError(errorMsg));
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
    const { user } = state;
    const logoutResponse = await LogoutApi(user);
    if (!logoutResponse) {
      // error on logout => show to user
    } else {
      // logout in frontend
      // reset state
      store.dispatch(resetState);

      // go back to login
      store.dispatch(switchPage('login'));
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

// App.propTypes = {
//   state: PropTypes.object.isRequired,
// };

// ========================================

const render = () => {
  ReactDOM.render(<App state={store.getState()} />, document.getElementById('root'));
};

// render App everytime store is updatet
store.subscribe(render);
// render App on start
render();

export default store;
