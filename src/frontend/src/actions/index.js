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
