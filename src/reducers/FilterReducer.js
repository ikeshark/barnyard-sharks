import {
  STATUS_FILTER_CHANGED,
  VOCALS_FILTER_CHANGED,
  SHARKS_FILTER_CHANGED,
  SORT_TYPE_CHANGED,
  FILTER_DISPLAY_CHANGED,
  COVER_FILTER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  statusFilter: '',
  vocalsFilter: '',
  sharksFilter: '',
  sortType: '',
  isFilterDisplay: true,
  isCoverFilter: false,
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action.type, action.payload)
  switch (action.type) {
    case STATUS_FILTER_CHANGED:
      const statusFilter = state.statusFilter === action.payload ?
        '' : action.payload;
      return { ...state, statusFilter };
    case VOCALS_FILTER_CHANGED:
      const vocalsFilter = state.vocalsFilter === action.payload ?
        '' : action.payload;
      return { ...state, vocalsFilter };
    case SHARKS_FILTER_CHANGED:
      const value = action.payload;
      let sharksFilter;
      const re = new RegExp(value);
      if (!re.test(state.sharksFilter)) {
        sharksFilter = state.sharksFilter ? `${state.sharksFilter}, ${value}` : value;
      } else {
        // if there is a comma, ie multiple values
        if (/,/.test(state.sharksFilter)) {
          let sharksFilterArray = state.sharksFilter.split(', ');
          sharksFilterArray.splice(sharksFilterArray.indexOf(value), 1);
          sharksFilter = sharksFilterArray.join(', ');
        } else {
          sharksFilter = '';
        }
      }
      return { ...state, sharksFilter };
    case SORT_TYPE_CHANGED:
      const sortType = state.sortType === action.payload ?
        '' : action.payload;
      return { ...state, sortType };
    case FILTER_DISPLAY_CHANGED:
      return { ...state, isFilterDisplay: !state.filterDisplay };
    case COVER_FILTER_CHANGED:
      return { ...state, isCoverFilter: !state.isCoverFilter };

    default:
      return state;
  }
}
