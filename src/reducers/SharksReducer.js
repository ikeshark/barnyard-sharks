import {
  SHARKS_FETCH_SUCCESS,
  DETAILED_SHARK_CHANGED,
  SHARK_DATE_UPDATE,
  SHARK_SETLIST_UPDATE,
  SHARK_ERROR,
  SHARK_UPDATE,
} from '../actions/types';

const INITIAL_STATE = {
  sharks: {},
  detailedShark: null,
  message: null,
};

const findSharkById = (sharks, id) => {
  if (typeof id === 'string') {
    return Object.values(sharks).filter(shark => shark.id === id)[0];
  } else {
    return id
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHARKS_FETCH_SUCCESS:
      return { ...state, sharks: action.payload }

    case DETAILED_SHARK_CHANGED:
      const detailedShark = action.payload.length ?
      findSharkById(state.sharks.active, action.payload) : action.payload;
      return { ...state, detailedShark }

    case SHARK_UPDATE:
      return {
        ...state,
        message: { type: 'message', text: 'updated' }
      }

    case SHARK_DATE_UPDATE: {
      const newDetailedShark = { ...state.detailedShark, sharkSince: action.payload }
      return { ...state, detailedShark: newDetailedShark }
    }

    case SHARK_ERROR: {
      const text = /permission/i.test(action.payload) ?
        'Please sign in to edit your page' :
        action.payload;
      return {
        ...state,
        message: action.payload ? { type: 'error', text } : null
      }
    }

    case SHARK_SETLIST_UPDATE: {
      const favSongs = action.payload.join(',');
      const newDetailedShark = { ...state.detailedShark, favSongs }
      return { ...state, detailedShark: newDetailedShark }
    }

    default:
      return state;
  }
}
