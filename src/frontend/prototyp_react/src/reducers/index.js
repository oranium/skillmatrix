// reducers >> index.js
import { combineReducers } from 'redux';
import {formState, user} from './reducers';

export default combineReducers({
    formState,
    user
})