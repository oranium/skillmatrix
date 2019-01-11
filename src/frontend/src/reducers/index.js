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
  newSkillToDBDialog,
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
  newSkillToDBDialog,
});
