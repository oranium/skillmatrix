// reducers >> index.js
import { combineReducers } from 'redux';
import {
  formState,
  user,
  page,
  drawer,
  error,
  search,
  profile,
  allSkills,
  allCategories,
  loading,
} from './reducers';

export default combineReducers({
  formState,
  page,
  drawer,
  user,
  error,
  search,
  profile,
  allSkills,
  allCategories,
  loading,
});
