import { combineReducers } from 'redux';

import FilterReducer from './FilterReducer';

export default combineReducers({
  filter: FilterReducer
});
