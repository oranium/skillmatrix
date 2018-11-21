// reducers >> index.js
import { combineReducers } from 'redux';
import {
  formState, user, page, errorMsg,
} from './reducers';

export default combineReducers({
  formState,
  page,
  user,
  errorMsg,
});
