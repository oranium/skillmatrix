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

export const switchPage = page => ({
  type: 'SWITCHPAGE',
  page,
});

export const resetForm = {
  type: 'RESETFORM',
};

export const setUsername = username => ({
  type: 'SETUSERNAME',
  username,
});

export const setError = errorMsg => ({
  type: 'SETERROR',
  errorMsg,
});

export const resetState = {
  type: 'RESETSTATE',
};

export const setSearchResults = results => ({
  type: 'SETRESULTS',
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
