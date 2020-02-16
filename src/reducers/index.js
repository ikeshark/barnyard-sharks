import { combineReducers } from 'redux';

import FilterReducer from './FilterReducer';
import SongsReducer from './SongsReducer';
import GigsReducer from './GigsReducer';
import SharksReducer from './SharksReducer';

export default combineReducers({
  filter: FilterReducer,
  songs: SongsReducer,
  gigs: GigsReducer,
  sharks: SharksReducer,
});
