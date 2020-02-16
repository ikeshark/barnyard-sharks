import {
  GIGS_FETCH_SUCCESS,
  DETAILED_GIG_CHANGED,
  GIG_UPDATE,
  GIG_CREATE,
  GIG_DELETE,
  GIG_ERROR,
  GIG_DATE_UPDATE,
  GIG_SETLIST_UPDATE,
  GIG_MEDIA_DELETED,
  GIG_MEDIA_ADDED,
 } from '../actions/types';

 const findGigById = (gigs, id) => {
   if (typeof id === 'string') {
     return Object.values(gigs).filter(gig => gig.id === id)[0];
   } else {
     return id
   }
 }

const INITIAL_STATE = {
  gigs: {},
  detailedGig: null,
  message: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GIGS_FETCH_SUCCESS:
      return { ...state, gigs: action.payload }

    case DETAILED_GIG_CHANGED:
      const detailedGig = action.payload.length ?
        findGigById(state.gigs, action.payload) : action.payload;
      return { ...state, detailedGig }

    case GIG_ERROR: {
      const text = /permission/i.test(action.payload) ?
        'Please sign in to create, edit, or delete a gig' :
        action.payload;
      return {
        ...state,
        message: action.payload ? { type: 'error', text } : null
      }
    }
    case GIG_DATE_UPDATE: {
      const newDetailedGig = { ...state.detailedGig, date: action.payload }
      return { ...state, detailedGig: newDetailedGig }
    }

    case GIG_SETLIST_UPDATE: {
      const setList = action.payload.join(',');
      const newDetailedGig = { ...state.detailedGig, setList }
      return { ...state, detailedGig: newDetailedGig }
    }

    case GIG_MEDIA_ADDED: {
      let media;
      const { key, payload } = action;
      if (state.detailedGig.media) {
        media = {...state.detailedGig.media};
      } else {
        media = {};
      }
      media[key] = payload;

      const newDetailedGig = { ...state.detailedGig, media }
      return { ...state, detailedGig: newDetailedGig }
    }

    case GIG_CREATE:
      return {
        ...state,
        detailedGig: action.payload,
        message: { type: 'message', text: 'gig created' }
      }

    case GIG_MEDIA_DELETED: {
      const media = { ...state.detailedGig.media };
      delete media[action.payload];
      const newDetailedGig = { ...state.detailedGig, media }
      return {
        ...state,
        detailedGig: newDetailedGig,
        message: { type: 'message', text: 'media deleted' }
      }
    }

    case GIG_DELETE:
      return state;

    case GIG_UPDATE:
      return {
        ...state,
        message: { type: 'message', text: 'gig update' }
      }

    default:
      return state;
  }
}
