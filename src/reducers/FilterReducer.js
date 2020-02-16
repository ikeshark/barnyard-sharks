import {
  STATUS_FILTER_CHANGED,
  VOCALS_FILTER_CHANGED,
  SHARKS_FILTER_CHANGED,
  SORT_TYPE_CHANGED,
  FILTER_DISPLAY_CHANGED,
  COVER_FILTER_CHANGED
} from '../actions/types';

import toggleValue from '../utils/toggleValue';

const INITIAL_STATE = {
  statusFilter: '',
  vocalsFilter: '',
  sharksFilter: '',
  sortType: '',
  isFilterDisplay: true,
  isCoverFilter: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUS_FILTER_CHANGED:
      const statusFilter = toggleValue(action.payload, state.statusFilter);
      return { ...state, statusFilter };
    case VOCALS_FILTER_CHANGED:
      const vocalsFilter = state.vocalsFilter === action.payload ?
        '' : action.payload;
      return { ...state, vocalsFilter };
    case SHARKS_FILTER_CHANGED:
      const sharksFilter = toggleValue(action.payload, state.sharksFilter);
      return { ...state, sharksFilter };
    case SORT_TYPE_CHANGED:
      const sortType = state.sortType === action.payload ?
        '' : action.payload;
      return { ...state, sortType };
    case FILTER_DISPLAY_CHANGED:
      return { ...state, isFilterDisplay: !state.isFilterDisplay };
    case COVER_FILTER_CHANGED:
      return { ...state, isCoverFilter: !state.isCoverFilter };

    default:
      return state;
  }
}
