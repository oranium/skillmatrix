// import react
import React, { Component } from "react";

// import redux
import store from "../Store";
import {
  updateInput,
  switchPage,
  setInputError,
  setError,
  resetForm,
  setUsername,
  resetState,
  setSearchResults,
  showSearchResults,
  hideSearchResults
} from "../actions";

// import page parts
import Header from "./Header";
import Form from "./Form";
import Search from "./Search";
import LoginForm from "./LoginForm";
import ErrorPaper from "./ErrorPaper";
import ControlledExpansionPanels from "./ControlledExpansionPanels";

// Rest
import RestPoints from "../rest/Init";
import RestCom from "../rest/Rest";

class App extends Component {
  static async handleLogin(username, password) {
    const loginCredentials = {
      username,
      password
    };
    const Rest = new RestCom(
      RestPoints.login,
      JSON.stringify(loginCredentials)
    );

    try {
      const { data } = await Rest.post();
      const { user } = data;
      store.dispatch(setUsername(user.username));
      store.dispatch(switchPage("search"));
    } catch (e) {
      store.dispatch(setError(e.message));
      store.dispatch(switchPage("login"));
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

    console.log(`${id}  ${value}`);

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
    if (page === "form") {
      const keys = Object.keys(inputs);
      keys.foreach(key => {
        const input = inputs[key];
        if (input.value === "") {
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

  // get results for query when user clicks on search button and store them into state
  async handleSearch() {
    const { state } = this.props;
    const { user } = state;
    const { value } = state.formState.searchfield;
    const search = {
      username: user,
      query: value
    };
    const Rest = new RestCom(RestPoints.search, JSON.stringify(search));
    try {
      const { data } = await Rest.post();
      // store results into state
      store.dispatch(setSearchResults(data));
      // show results to user
      store.dispatch(showSearchResults);
    } catch (e) {
      store.dispatch(setError(e.message));
      console.log(e);
    }
  }

  async handleLogout() {
    const { state } = this.props;
    const user = {
      user: state.user
    };
    const Rest = new RestCom(RestPoints.logout, JSON.stringify(user));
    try {
      await Rest.post();
      // logout in frontend
      // reset state
      store.dispatch(resetState);
      // go back to login
      store.dispatch(switchPage("login"));
    } catch (e) {
      // display error Message to user<
      console.log(e);
      store.dispatch(setError(e.message));
    }
  }

  render() {
    const { state } = this.props;
    const { page, error, user, formState, searchResults } = state;
    let main = [];

    if (page === "login") {
      return (
        <LoginForm
          errorMsg={error.message}
          login={(username, password) => App.handleLogin(username, password)}
        />
      );
    }
    const { results } = searchResults;
    switch (page) {
      case "form":
        main = (
          <Form
            inputs={formState}
            page={page}
            name="test"
            onChange={(id, value) => this.handleChange(id, value)}
            onSubmit={newPage => this.handleSubmit(newPage)}
            onReset={() => this.handleResetForm()}
          />
        );
        break;
      case "search":
        main.push(
          <Search
            searchField={formState.searchfield}
            onChange={(id, value) => this.handleChange(id, value)}
            onSearch={() => this.handleSearch()}
            key="search"
          />
        );
        if (searchResults.showResults) {
          main.push(
            Object.keys(results).map((category, i) => (
              <ControlledExpansionPanels results={results[category]} key={i} />
            ))
          );
        }
        break;
      default:
        return "Error";
    }

    let errorPaper = "";
    if (error.hasError) {
      errorPaper = <ErrorPaper errorMsg={error.message} />;
    }
    return (
      <div>
        <Header username={user} logout={this.handleLogout} />
        <main>
          {main}
          {errorPaper}
        </main>
      </div>
    );
  }
}

export default App;
