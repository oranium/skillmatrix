// actions >> index.js

export const updateInput = (id, input) => ({
  type: 'UPDATEINPUT',
  id,
  input,
});

export const setError = (id, error) => ({
  type: 'SETERROR',
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

export const setLoginError = errorMsg => ({
  type: 'SETLOGINERROR',
  errorMsg,
});

export const resetState = {
  type: 'RESETSTATE',
};
