import {combineReducers } from 'redux';
import courses from './courseReducers';

const rootReducer = combineReducers({
  courses   // shorthand property name (ES6)
});

export default rootReducer;