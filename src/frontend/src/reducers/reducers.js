// default map for clean input fields
export const errorDisplayType = {
  login: 0,
  window: 1,
  input: 2,
};

// ##########################################################
// Get todays date as String
const heute = new Date();
let month = heute.getMonth() + 1;
let day = heute.getDate();

if (day < 10) day = `0${day}`;
if (month < 10) month = `0${month}`;

const heuteString = `${heute.getFullYear()}-${month}-${day}`;
// ############################################################

const defaultFormState = {
  singleselect: {
    value: '',
  },

  textfield: {
    name: 'Skill',
    value: '',
    error: false,
  },
  levelfield: {
    name: 'Level',
    value: '',
    error: false,
  },
  datefield: {
    name: 'Date',
    value: heuteString,
    error: false,
  },
  textarea: {
    name: 'Note',
    value: '',
    error: false,
  },
  searchfield: {
    name: 'Search',
    value: '',
    error: false,
  },
};

const defaultUser = {
  username: undefined,
  name: undefined,
};

const defaultPage = 'login';
const defaultError = {
  hasError: false,
  message: '',
  displayType: errorDisplayType.window,
};

const defaultSearch = {
  searchValues: {},
  results: {},
  showResults: false,
  error: false,
};

const defaultNewSkillToDBDialog = {
  skillname: '',
  guideline: {
    1: 'Insufficient',
    2: 'Sufficient/Below Average',
    3: 'Satisfactory / Average',
    4: 'Good',
    5: 'Excellent',
  },
  confirmDialogOpen: false,
};

Object.freeze(defaultSearch);

const defaultProfilePageState = {
  person: 0,
  isEditable: true,
  view: 0,
  showDialog: false,
  profiles: [],
};
const defaultSkillList = {};
const defaultCategoryList = [];

// has all the data for the inputfields
export const formState = (state = defaultFormState, action) => {
  switch (action.type) {
    /* return new state1,
    where only the one value of the certain input field has changed to action.input
    */

    case 'UPDATEINPUT':
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id], {
          value: action.input,
        }),
      });

    // return new state, where input field with action.id has a new bool
    case 'SETINPUTERROR':
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id], {
          error: action.error,
        }),
      });

    case 'SETVARIOUSINPUTERRORS': {
      const inputsWithErrors = {};
      // set error to true for all ids (immutable)
      action.ids.forEach((id) => {
        inputsWithErrors[id] = { ...state[id], error: true };
      });
      return { ...state, ...inputsWithErrors };
    }

    case 'RESETFORM':
      return defaultFormState;

    case 'RESETSTATE':
      return defaultFormState;

    default:
      return state;
  }
};

// at the moment this only saves the username
export const user = (state = defaultUser, action) => {
  switch (action.type) {
    case 'SETUSER':
      return action.user;
    case 'RESETSTATE':
      return defaultUser;
    default:
      return state;
  }
};

// defines which page is viewed to the user
export const page = (state = defaultPage, action) => {
  switch (action.type) {
    case 'SWITCHPAGE':
      return action.page;
    case 'RESETSTATE':
      return defaultPage;
    default:
      return state;
  }
};

export const error = (state = defaultError, action) => {
  switch (action.type) {
    case 'SETERROR':
      return {
        hasError: true,
        message: action.errorMsg,
        displayType: errorDisplayType.window,
      };
    case 'SETLOGINERROR':
      return {
        hasError: true,
        message: action.errorMsg,
        displayType: errorDisplayType.login,
      };
    case 'HIDEERRORDIALOG':
      return {
        ...state,
        hasError: false,
        message: '',
      };
    case 'RESETSTATE':
      return defaultError;
    default:
      return state;
  }
};

export const search = (state = defaultSearch, action) => {
  switch (action.type) {
    case 'SETQUERY':
      return { ...state, searchValues: action.values };
    case 'SETSEARCHRESULTS':
      return { ...state, results: action.results };
    case 'SHOWRESULTS':
      return { ...state, showResults: true };
    case 'HIDERESULTS':
      return { ...state, showResults: false };
    case 'SETSEARCHERROR':
      return { ...state, error: action.error };
    case 'RESETSEARCH':
      return defaultSearch;
    case 'RESETSTATE':
      return defaultSearch;
    default:
      return state;
  }
};

export const profile = (state = defaultProfilePageState, action) => {
  switch (action.type) {
    case 'CHANGEVIEW':
      return { ...state, view: action.view };
    case 'CHANGEPROFILEOWNER':
      return { ...state, person: action.person, isEditable: action.person === 0 };
    case 'OPENPROFILEDIALOG':
      return { ...state, showDialog: action.dialogName };
    case 'ClOSEPROFILEDIALOG':
      return { ...state, showDialog: false };
    case 'ADDPROFILES':
      return { ...state, profiles: [state.profiles[0], ...action.profiles] };
    case 'SETOWNPROFILE':
      // changes the element on index 0 in array profiles
      return { ...state, profiles: [action.profile, ...state.profiles.slice(1)] };
    case 'RESETSTATE':
      return defaultProfilePageState;
    default:
      return state;
  }
};

export const allSkills = (state = defaultSkillList, action) => {
  switch (action.type) {
    case 'SETALLSKILLS':
      return action.skills;
    case 'RESETSTATE':
      return defaultSkillList;
    default:
      return state;
  }
};

export const allCategories = (state = defaultCategoryList, action) => {
  switch (action.type) {
    case 'SETALLCATEGORIES':
      return action.categories;
    case 'RESETSTATE':
      return defaultCategoryList;
    default:
      return state;
  }
};

export const drawer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLEDRAWER':
      return action.open;
    case 'RESETSTATE':
      return false;
    default:
      return state;
  }
};

export const loading = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLESPINNER':
      return action.open;
    case 'RESETSTATE':
      return false;
    default:
      return state;
  }
};

export const newSkillToDBDialog = (state = defaultNewSkillToDBDialog, action) => {
  switch (action.type) {
    case 'CHANGEGUIDELINE':
      return { ...state, guideline: { ...state.guideline, [action.level]: action.value } };
    case 'SETSKILLNAME':
      return { ...state, skillname: action.skillname };
    case 'TOGGLECONFIRMDIALOG':
      return { ...state, confirmDialogOpen: action.open };
    case 'RESETFORM':
      return defaultNewSkillToDBDialog;
    case 'RESETSTATE':
      return defaultNewSkillToDBDialog;
    default:
      return state;
  }
};
