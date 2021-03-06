// actions >> index.js

export const updateInput = (id, input) => ({
  type: 'UPDATEINPUT',
  id,
  input,
});

export const setInputError = (id, error) => ({
  type: 'SETINPUTERROR',
  id,
  error,
});

export const setVariousInputErrors = ids => ({
  type: 'SETVARIOUSINPUTERRORS',
  ids,
});

export const switchPage = page => ({
  type: 'SWITCHPAGE',
  page,
});

export const resetForm = {
  type: 'RESETFORM',
};

export const setUser = user => ({
  type: 'SETUSER',
  user,
});

export const setError = errorMsg => ({
  type: 'SETERROR',
  errorMsg,
});

export const setLoginError = errorMsg => ({
  type: 'SETLOGINERROR',
  errorMsg,
});

export const resetState = {
  type: 'RESETSTATE',
};

export const setSearchResults = results => ({
  type: 'SETSEARCHRESULTS',
  results,
});

export const showSearchResults = {
  type: 'SHOWRESULTS',
};

export const hideSearchResults = {
  type: 'HIDERESULTS',
};

export const changeView = view => ({
  type: 'CHANGEVIEW',
  view,
});

export const changeProfileOwner = person => ({
  type: 'CHANGEPROFILEOWNER',
  person,
});

export const hideErrorDialog = {
  type: 'HIDEERRORDIALOG',
};

export const openProfileDialog = dialogName => ({
  type: 'OPENPROFILEDIALOG',
  dialogName,
});

export const closeProfileDialog = {
  type: 'ClOSEPROFILEDIALOG',
};

export const setQuery = values => ({
  type: 'SETQUERY',
  values,
});

export const setAllSkills = skills => ({
  type: 'SETALLSKILLS',
  skills,
});

export const setAllCategories = categories => ({
  type: 'SETALLCATEGORIES',
  categories,
});

export const addProfiles = profiles => ({
  type: 'ADDPROFILES',
  profiles,
});
export const updateSkills = skillUpdates => ({
  type: 'UPDATESKILLS',
  skillUpdates,
});

export const setOwnProfile = profile => ({
  type: 'SETOWNPROFILE',
  profile,
});

export const setSearchError = error => ({
  type: 'SETSEARCHERROR',
  error,
});

export const resetSearch = {
  type: 'RESETSEARCH',
};

export const toggleDrawer = open => ({
  type: 'TOGGLEDRAWER',
  open,
});

export const toggleSpinner = open => ({
  type: 'TOGGLESPINNER',
  open,
});

export const changeGuideline = (level, value) => ({
  type: 'CHANGEGUIDELINE',
  level,
  value,
});

export const setSkillName = skillname => ({
  type: 'SETSKILLNAME',
  skillname,
});

export const toggleConfirmDialog = open => ({
  type: 'TOGGLECONFIRMDIALOG',
  open,
});

export const toggleSkillNameEmpty = empty => ({
  type: 'TOGGLESKILLNAMEEMPTY',
  empty,
});
