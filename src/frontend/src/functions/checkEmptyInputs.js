// redux
import store from 'Store';
import { setVariousInputErrors } from 'actions';

const checkEmptyInputs = (inputs, inputFieldIDs) => {
  const inputsWithErrors = [];
  Object.keys(inputs).forEach((key) => {
    const isInputField = Object.prototype.hasOwnProperty.call(inputFieldIDs, key);
    if (inputs[key] === '' && isInputField) {
      inputsWithErrors.push(inputFieldIDs[key]);
    }
  });
  if (inputsWithErrors.length !== 0) {
    store.dispatch(setVariousInputErrors(inputsWithErrors));
    return true;
  }

  return false;
};

export default checkEmptyInputs;
