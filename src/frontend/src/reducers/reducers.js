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

const defaultUsername = 'Undefined';
const defaultPage = 'search';
const defaultError = {
  hasError: false,
  message: '',
};

const defaultSearch = {
  searchValues: {},
  results: {},
  showResults: false,
};

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
      x: '2015-05-01',
      y: 0,
      comment: 'init',
    },
    {
      x: '2016-05-01',
      y: 1,
      comment: 'reversed engineering buch unters kopfkissen gelegt',
    },
    {
      x: '2016-08-03',
      y: 1,
      comment: 'Buch Hacking with Python gelesen',
    },
    {
      x: '2019-07-06',
      y: 4,
      comment: '72h Python workshop',
    },
  ],
};
const exSkill2 = {
  skillname: 'Java',
  level: 5,
  milestones: [
    {
      x: '2015-09-11',
      y: 0,
      comment: 'init',
    },
    {
      x: '2016-11-23',
      y: 1,
      comment: 'reversed engineering buch unters kopfkissen gelegt',
    },
    {
      x: '2017-01-20',
      y: 1,
      comment: 'Buch Hacking with Java gelesen',
    },
    {
      x: '2018-02-06',
      y: 4,
      comment: '36h Java workshop',
    },
    {
      x: '2020-11-23',
      y: 5,
      comment: 'Java Hackaton gewonnen',
    },
  ],
};

const exSkill3 = {
  skillname: 'C++',
  level: 3,
  milestones: [
    {
      x: '2011-09-11',
      y: 0,
      comment: 'init',
    },
    {
      x: '2017-01-20',
      y: 1,
      comment: 'C++ Workshop',
    },
    {
      x: '2018-02-06',
      y: 2,
      comment: 'C++ Lehrgang',
    },
    {
      x: '2021-11-23',
      y: 3,
      comment: 'C++ 3 jähriges Projekt fertig gestellt, mit 100000 Zeilen c++ Code',
    },
  ],
};

const exProfile = {
  username: 'Valdemar',
  skills: [exSkill, exSkill2, exSkill3], // alle skills übergeben
};

const defaultProfilePageState = {
  person: 0,
  isEditable: true,
  view: 0,
  showDialog: false,
  profiles: [exProfile, exProfile],
  skillUpdates: [{}],
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
export const user = (state = defaultUsername, action) => {
  switch (action.type) {
    case 'SETUSERNAME':
      return action.username;
    case 'RESETSTATE':
      return defaultUsername;
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
      };
    case 'HIDEERRORDIALOG':
      return {
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
      return Object.assign(state, { searchValues: action.values });
    case 'SETRESULTS':
      return Object.assign(state, { results: action.results });
    case 'SHOWRESULTS':
      return Object.assign(state, { showResults: true });
    case 'HIDERESULTS':
      return Object.assign(state, { showResults: false });
    case 'SETSEARCHERROR':
      return { ...state, error: action.error };
    case 'RESETSEARCH':
    case 'RESETSTATE':
      return defaultSearch;
    default:
      return state;
  }
};

export const profile = (state = defaultProfilePageState, action) => {
  switch (action.type) {
    case 'CHANGEVIEW':
      return Object.assign(state, { view: action.view });
    case 'CHANGEPROFILEOWNER':
      return Object.assign(state, { person: action.person, isEditable: action.person === 0 });
    case 'OPENPROFILEDIALOG':
      return Object.assign(state, { showDialog: action.dialogName });
    case 'ClOSEPROFILEDIALOG':
      return Object.assign(state, { showDialog: false });
    case 'ADDPROFILES':
      // return Object.assign(state, { profiles: [...state.profiles, action.profile] });
      return { ...state, profiles: [...state.profiles, ...action.profiles] };
    case 'SETOWNPROFILE':
      // changes the element on index 0 in array profiles
      return { ...state, profiles: [action.profile, ...state.profiles.slice(1)] };
    case 'UPDATESKILLS':
      // changes the element on index 0 in array profiles //////////////////////////////////////////////////reducer/////skill datenstruktur muss einzeln upgedated werden
      return {
        ...state,
        skillUpdates: [
          { skill: { ...state.skillUpdates.skill }, level: { ...state.skillUpdates.level } },
          action.skillUpdates,
          ...state.skillUpdates.slice(1),
        ],
      };
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
