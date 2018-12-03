// default map for clean input fields
const defaultFormState = {
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

const defaultSearchResults = {
  results: {},
  showResults: false,
};

// die datenstruktur soll so im state gespeichert werden skills: Oberkategorien :
// Unterkategorien und jeweils actLevel und milestones
const oldexState = {
  categories: {
    Programming: {
      Python: {
        actLevel: 5,
        milestones: [
          {
            x: '2015-05-01',
            y: 0,
            comment: 'init',
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
          {
            x: '2021-11-23',
            y: 5,
            comment: 'Python Hackaton gewonnen',
          },
        ],
        subcategories: {
          PythonFlask: {
            actLevel: 5,
            milestones: [
              {
                x: '2015-05-01',
                y: 0,
              },
              {
                x: '2016-08-03',
                y: 1,
              },
              {
                x: '2019-07-06',
                y: 4,
              },
              {
                x: '2021-11-23',
                y: 5,
              },
            ],
          },
        },
      },
      Java: {
        actLevel: 5,
        milestones: [
          {
            x: '2016-04-18',
            y: 0,
            comment: '',
          },
          {
            x: '2017-08-29',
            y: 1,
            comment: '',
          },
          {
            x: '2019-11-19',
            y: 4,
            comment: '',
          },
          {
            x: '2020-02-03',
            y: 5,
            comment: '',
          },
        ],
        subcategories: {
          Java_Springer: {
            actLevel: 5,
            milestones: [
              {
                x: '2015-05-01',
                y: 0,
              },
              {
                x: '2016-08-03',
                y: 1,
              },
              {
                x: '2019-07-06',
                y: 4,
              },
              {
                x: '2021-11-23',
                y: 5,
              },
            ],
          },
          Java_Springer2: {
            actLevel: 5,
            milestones: [
              {
                x: '2015-05-01',
                y: 0,
              },
              {
                x: '2016-08-03',
                y: 1,
              },
              {
                x: '2019-07-06',
                y: 4,
              },
              {
                x: '2021-11-23',
                y: 5,
              },
            ],
          },
        },
      },
    },

    Design: {},
  },
};

const exMilestone = {
  x: '2015-05-01',
  y: 0,
  comment: 'init',
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
      x: '2016-08-03',
      y: 1,
      comment: 'Buch Hacking with Python gelesen',
    },
    {
      x: '2019-07-06',
      y: 4,
      comment: '72h Python workshop',
    },
    {
      x: '2021-11-23',
      y: 5,
      comment: 'Python Hackaton gewonnen',
    },
  ],
};

const exState = {
  username: 'Valdemar',
  skills: [exSkill, exSkill, exSkill],
};

const defaultProfilePageState = {
  person: 0,
  isEditable: true,
  view: 0,
  showDialog: false,
  profiles: [exState, exState],
};

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

export const searchResults = (state = defaultSearchResults, action) => {
  switch (action.type) {
    case 'SETRESULTS':
      return Object.assign(state, { results: action.results });
    case 'SHOWRESULTS':
      return Object.assign(state, { showResults: true });
    case 'HIDERESULTS':
      return Object.assign(state, { showResults: false });
    default:
      return state;
  }
};

export const profile = (state = defaultProfilePageState, action) => {
  switch (action.type) {
    case 'CHANGEVIEW':
      return Object.assign(state, { view: action.view });
    case 'CHANGEPROFILEOWNER':
      return Object.assign(state, { person: action.person });
    case 'OPENPROFILEDIALOG':
      return Object.assign(state, { showDialog: action.dialogName });
    case 'ClOSEPROFILEDIALOG':
      return Object.assign(state, { showDialog: false });
    default:
      return state;
  }
};
