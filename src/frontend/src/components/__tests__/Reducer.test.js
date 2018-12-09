import reducer from '../../reducers';

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
describe('reducer tests', () => {
  // test default case
  it('reducer should return the same state again (switch(default)', () => {
    const actState = reducer(exampleFormState, 'default');
    expect(actState.formState).toEqual(exampleFormState.formState);
  });

  // test reset
  it('should return an empty form after: "RESETFORM "', () => {
    const actState = reducer(exampleFormState, {
      type: 'RESETFORM',
    });

    expect(actState.formState).toEqual(defaultFormState);
  });

  // test error state
  it('should return the Errorpage state after Event "SETERROR"', () => {
    const errorState = reducer(exampleFormState, {
      type: 'SETERROR',
      errorMsg: 'server timeout',
    });

    expect(errorState.error).toEqual({ hasError: true, message: 'server timeout' });
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

  // changes the state --> update page
  it('should update the actual state after Event "SWITCHPAGE"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SWITCHPAGE',
      page: 'login',
    });
    expect(actState.page).toEqual('login');
  });
  // update username
  it('should update the actual state after Event "SETUSERNAME"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SETUSERNAME',
      username: 'Vladimir',
    });
    expect(actState.user).toEqual('Vladimir');
  });

  it('should update the actual state after Event "SETINPUTERROR"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SETINPUTERROR',
      id: 'error',
      error: 'wrong input ',
    });

    expect(actState.formState.error).toEqual({ error: 'wrong input ' });
  });

  it('should update the actual state after Event "SETRESULTS"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SETRESULTS',
      results: 'Python',
    });

    expect(actState.search.results).toEqual('Python');
  });

  it('should update the actual state after Event "SHOWRESULTS"', () => {
    const actState = reducer(exampleFormState, {
      type: 'SHOWRESULTS',
    });

    expect(actState.search.showResults).toBe(true);
  });

  it('should update the actual state after Event "HIDERESULTS"', () => {
    const actState = reducer(exampleFormState, {
      type: 'HIDERESULTS',
    });

    expect(actState.search.showResults).toBe(false);
  });

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
});
