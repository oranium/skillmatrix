import reducer from '../../reducers';

const heute = new Date();
let month = heute.getMonth() + 1;
let day = heute.getDate();

if (day < 10) day = `0${day}`;
if (month < 10) month = `0${month}`;
const drawer = false;
const loading = false;
const heuteString = `${heute.getFullYear()}-${month}-${day}`;

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
  singleselect: {
    value: '',
  },
};
const exampleFormState = {
  formState: {
    textfield: {
      name: 'Skill',
      value: 'Valdemar',
      error: false,
    },
    levelfield: {
      name: 'Level',
      value: '4',
      error: false,
    },
    datefield: {
      name: 'Date',
      value: '11/11/2011',
      error: false,
    },
    textarea: {
      name: 'Note',
      value: '5',
      error: false,
    },
  },
  page: 'form',
  user: 'Valdemar',
};

const defaultSearch = {
  searchValues: {},
  results: {},
  showResults: false,
  error: false,
};

const defaultUser = {
  username: undefined,
  name: undefined,
};

const defaultProfilePageState = {
  person: 0,
  isEditable: true,
  view: 0,
  showDialog: false,
  profiles: [],
};

const exSkill = {
  skillname: 'Haskell',
  level: 4,
  milestones: [],
};
const exProfile = {
  username: 'Valdemar',
  skills: [exSkill], // alle skills übergeben
};

const defaultSkillList = [];
const exampleSkillList = {
  'Programming/Python': {
    1: 'schlecht',
    2: 'geht so',
    3: 'zufriedenstellend',
    4: 'okay',
    5: 'seeehr gut',
  },
  'Programming/Java': {
    1: 'schlecht',
    2: 'geht so',
    3: 'zufriedenstellend',
    4: 'okay',
    5: 'seeehr gut',
  },
  'Programming/Java/Python': {
    1: 'schlecht',
    2: 'geht so',
    3: 'zufriedenstellend',
    4: 'okay',
    5: 'seeehr gut',
  },
  'Programming/Java/C++': {
    1: 'schlecht',
    2: 'geht so',
    3: 'zufriedenstellend',
    4: 'okay',
    5: 'seeehr gut',
  },
  'Programming/Java/C++/Python': {
    1: 'schlecht',
    2: 'geht so',
    3: 'zufriedenstellend',
    4: 'okay',
    5: 'seeehr gut',
  },
  'C++/Python': {
    1: 'Noch nie Python gecoded',
    2: '1 Projekt bearbeitet',
    3: '100000 Zeilen PyCode',
    4: 'großes Projekt',
    5: 'langjährige Python Erfahrung',
  },
  'C++/C++++': {
    1: 'Noch nie Python gecoded',
    2: '1 Projekt bearbeitet',
    3: '100000 Zeilen PyCode',
    4: 'großes Projekt',
    5: 'langjährige Python Erfahrung',
  },
};

// ###################################################  formstate reducers  ###################################################

describe('reducer tests', () => {
  // test default case
  it('reducer should return the same state again (switch(default)', () => {
    const actState = reducer(exampleFormState, 'default');
    expect(actState.formState).toEqual(exampleFormState.formState);
  });

  it('should update the actual state after Event "UPDATEINPUT"', () => {
    // test for empty input redundant bc its done by material-ui component <Input/>

    const actState = reducer(exampleFormState, {
      type: 'UPDATEINPUT',
      id: 'email',
      input: '123@gmx.de',
    });
    expect(actState.formState.email).toEqual({ value: '123@gmx.de' });
  });

  it('should update the actual state after Event "SETINPUTERROR"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SETINPUTERROR',
      id: 'error',
      error: 'wrong input ',
    });
    expect(actState.formState.error).toEqual({ error: 'wrong input ' });
  });

  // test reset
  it('should return an empty form after: "RESETFORM "', () => {
    const actState = reducer(exampleFormState, {
      type: 'RESETFORM',
    });

    expect(actState.formState).toEqual(defaultFormState);
  });

  // ###################################################  Error reducers  ###################################################
  it('should return the Errorpage state after Event "SETERROR"', () => {
    const errorState = reducer(exampleFormState, {
      type: 'SETERROR',
      errorMsg: 'server timeout',
    });

    expect(errorState.error).toEqual({ displayType: 1, hasError: true, message: 'server timeout' });
  });

  it('should return the Errorpage state after Event "HIDEERRORDIALOG"', () => {
    const errorState = reducer(exampleFormState, {
      type: 'HIDEERRORDIALOG',
    });

    expect(errorState.error).toEqual({ displayType: 1, hasError: false, message: '' });
  });

  // ###################################################  Switch page reducer  ###################################################
  it('should update the actual state after Event "SWITCHPAGE"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SWITCHPAGE',
      page: 'login',
    });
    expect(actState.page).toEqual('login');
  });

  // ###################################################  user reducer  ###################################################

  it('should update the actual state after Event "SETUSER"', () => {
    const actState = reducer(defaultUser, {
      type: 'SETUSER',
      user: { username: 'Vladi69', name: 'Valdemar Forsberg' },
    });
    expect(actState.user.username).toEqual('Vladi69');
    expect(actState.user.name).toEqual('Valdemar Forsberg');
  });

  // ###################################################  Search page reducers  ###################################################

  it('should update the actual state after Event "SETQUERY"', () => {
    const actState = reducer(defaultSearch, {
      type: 'SETQUERY',
      values: ['Python', 'Valdemar'],
    });

    expect(actState.search.searchValues).toEqual(['Python', 'Valdemar']);
  });

  it('should update the actual state after Event "SETRESULTS"', () => {
    const actState = reducer(defaultSearch, {
      type: 'SETSEARCHRESULTS',
      results: 'Python',
    });

    expect(actState.search.results).toEqual('Python');
  });

  it('should update the actual state after Event "SHOWRESULTS"', () => {
    const actState = reducer(defaultSearch, {
      type: 'SHOWRESULTS',
    });

    expect(actState.search.showResults).toBe(true);
  });

  it('should update the actual state after Event "HIDERESULTS"', () => {
    const actState = reducer(defaultSearch, {
      type: 'HIDERESULTS',
    });

    expect(actState.search.showResults).toBe(false);
  });
  it('should update the actual state after Event "SETSEARCHERROR"', () => {
    const actState = reducer(defaultSearch, {
      type: 'SETSEARCHERROR',
      error: 'Server timeout',
    });

    expect(actState.search.error).toBe('Server timeout');
  });

  it('should update the actual state after Event "RESETSEARCH"', () => {
    const actState = reducer(defaultSearch, {
      type: 'RESETSEARCH',
    });

    expect(actState.search).toEqual(defaultSearch);
  });

  // ###################################################  Profile page reducers  ###################################################
  it('should update the actual state after Event "CHANGEVIEW"', () => {
    const actState = reducer(defaultProfilePageState, {
      type: 'CHANGEVIEW',
      view: 1,
    });
    expect(actState.profile.view).toBe(1);
  });

  it('should update the actual state after Event "CHANGEPROFILEOWNER"', () => {
    const actState = reducer(defaultProfilePageState, {
      type: 'CHANGEPROFILEOWNER',
      person: 1,
    });
    expect(actState.profile.person).toBe(1);
  });

  it('should update the actual state after Event "OPENPROFILEDIALOG"', () => {
    const actState = reducer(defaultProfilePageState, {
      type: 'OPENPROFILEDIALOG',
      dialogName: 'newdialog',
    });
    expect(actState.profile.showDialog).toBe('newdialog');
  });

  it('should update the actual state after Event "ClOSEPROFILEDIALOG"', () => {
    const actState = reducer(defaultProfilePageState, {
      type: 'ClOSEPROFILEDIALOG',
    });
    expect(actState.profile.showDialog).toBe(false);
  });

  it('should update the actual state after Event "ADDPROFILES"', () => {
    const actState = reducer(defaultProfilePageState, {
      type: 'ADDPROFILES',
      profiles: [exProfile],
    });
    expect(actState.profile.profiles[actState.profile.profiles.length - 1]).toBe(exProfile);
  });

  it('should update the actual state after Event "SETOWNPROFILE"', () => {
    const actState = reducer(defaultProfilePageState, {
      type: 'SETOWNPROFILE',
      profile: exProfile,
    });
    expect(actState.profile.profiles[0]).toBe(exProfile);
  });


  // ###################################################  all Skills reducers  ###################################################
  it('should update the actual state after Event "SETALLSKILLS"', () => {
    const actState = reducer(defaultSkillList, {
      type: 'SETALLSKILLS',
      skills: exampleSkillList,
    });
    expect(actState.allSkills).toBe(exampleSkillList);
  });

  // ###################################################  toggle spinner reducers  ###################################################
  it('should update the actual state after Event "TOGGLEDRAWER"', () => {
    const actState = reducer(drawer, {
      type: 'TOGGLEDRAWER',
      open: true,
    });
    expect(actState.drawer).toBe(true);
  });
  it('should update the actual state after Event "TOGGLESPINNER"', () => {
    const actState = reducer(drawer, {
      type: 'TOGGLESPINNER',
      open: true,
    });
    expect(actState.loading).toBe(true);
  });

  // it('should update the actual state after Event "RESETSTATE" on allSkills', () => {
  //   const actState = reducer(defaultSkillList, {
  //     type: 'RESETSTATE',
  //   });
  //   expect(actState.allSkills).toBe(defaultSkillList);
  // });
});
