// default map for clean input fields
const defaultFormState = {
  textfield: {
    name: "Skill",
    value: "",
    error: false
  },
  levelfield: {
    name: "Level",
    value: "",
    error: false
  },
  datefield: {
    name: "Date",
    value: "",
    error: false
  },
  textarea: {
    name: "Note",
    value: "",
    error: false
  },
  searchfield: {
    name: "Search",
    value: "",
    error: false
  }
};

const defaultUsername = "Undefined";
const defaultPage = "login";
const defaultError = {
  hasError: false,
  message: ""
};

const defaultSearchResults = {
  results: {
    java: {
      Herbert: 4,
      Tom: 4,
      Tim: 3,
      Olaf: 3
    }
  },
  showResults: true
};

// has all the data for the inputfields
export const formState = (state = defaultFormState, action) => {
  switch (action.type) {
    /* return new state,
    where only the one value of the certain input field has changed to action.input
    */

    case "UPDATEINPUT":
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id], {
          value: action.input
        })
      });

    // return new state, where input field with action.id has a new bool
    case "SETINPUTERROR":
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id], {
          error: action.error
        })
      });

    case "RESETFORM":
      return defaultFormState;

    case "RESETSTATE":
      return defaultFormState;

    default:
      return state;
  }
};

// at the moment this only saves the username
export const user = (state = defaultUsername, action) => {
  switch (action.type) {
    case "SETUSERNAME":
      return action.username;
    case "RESETSTATE":
      return defaultUsername;
    default:
      return state;
  }
};

// defines which page is viewed to the user
export const page = (state = defaultPage, action) => {
  switch (action.type) {
    case "SWITCHPAGE":
      return action.page;
    case "RESETSTATE":
      return defaultPage;
    default:
      return state;
  }
};

export const error = (state = defaultError, action) => {
  switch (action.type) {
    case "SETERROR":
      return {
        hasError: true,
        message: action.errorMsg
      };
    case "RESETSTATE":
      return defaultError;
    default:
      return state;
  }
};

export const searchResults = (state = defaultSearchResults, action) => {
  switch (action.type) {
    case "SETRESULTS":
      return Object.assign(state, { results: action.results });
    case "SHOWRESULTS":
      return Object.assign(state, { showResults: true });
    case "HIDERESULTS":
      return Object.assign(state, { showResults: false });
    default:
      return state;
  }
};
