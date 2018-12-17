// default map for clean input fields
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
    value: '',
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

export const errorDisplayType = {
  login: 0,
  window: 1,
  input: 2,
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

Object.freeze(defaultSearch);

const defaultMilestone = {
  datum: '2000-01-01',
  level: 1,
  comment: '-',
};

const exSkill = {
  skillname: 'Python',
  level: 4,
  milestones: [
    {
      date: '2015-05-01',
      level: 0,
      comment: 'init',
    },
    {
      date: '2016-05-01',
      level: 1,
      comment: 'reversed engineering buch unters kopfkissen gelegt',
    },
    {
      date: '2016-08-03',
      level: 1,
      comment: 'Buch Hacking with Python gelesen',
    },
    {
      date: '2019-07-06',
      level: 4,
      comment: '72h Python workshop',
    },
  ],
};
const exSkill2 = {
  skillname: 'Java',
  level: 5,
  milestones: [
    {
      date: '2015-09-11',
      level: 0,
      comment: 'init',
    },
    {
      date: '2016-11-23',
      level: 1,
      comment: 'reversed engineering buch unters kopfkissen gelegt',
    },
    {
      date: '2017-01-20',
      level: 1,
      comment: 'Buch Hacking with Java gelesen',
    },
    {
      date: '2018-02-06',
      level: 4,
      comment: '36h Java workshop',
    },
    {
      date: '2020-11-23',
      level: 5,
      comment: 'Java Hackaton gewonnen',
    },
  ],
};

const exSkill3 = {
  skillname: 'C++',
  level: 3,
  milestones: [
    {
      date: '2011-09-11',
      level: 0,
      comment: 'init',
    },
    {
      date: '2017-01-20',
      level: 1,
      comment: 'C++ Workshop',
    },
    {
      date: '2018-02-06',
      level: 2,
      comment: 'C++ Lehrgang',
    },
    {
      date: '2021-11-23',
      level: 3,
      comment: 'C++ 3 jähriges Projekt fertig gestellt, mit 100000 Zeilen c++ Code',
    },
  ],
};

const exProfile = {
  username: 'Valdemar',
  skills: [exSkill, exSkill2, exSkill3, exSkill3, exSkill2, exSkill], // alle skills übergeben
};

const defaultProfilePageState = {
  person: 0,
  isEditable: true,
  view: 0,
  showDialog: false,
  profiles: [exProfile, exProfile],
};

const defaultSkillList = ['Python', 'Java', 'JavaScript'];

// has all the data for the inputfields
export const formState = (state = defaultFormState, action) => {
  switch (action.type) {
    /* return new state,
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
