// reducers >> index.js
import { combineReducers } from 'redux';
import {
  formState, user, page, error, searchResults,
} from './reducers';

export default combineReducers({
  formState,
  page,
  user,
  error,
  searchResults,
});
