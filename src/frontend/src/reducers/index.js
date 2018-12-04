// reducers >> index.js
import { combineReducers } from 'redux';
import {
  formState, user, page, error, search, profile, allSkills,
} from './reducers';

export default combineReducers({
  formState,
  page,
  user,
  error,
  search,
  profile,
  allSkills,
});
