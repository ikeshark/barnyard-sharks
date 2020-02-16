import app from 'firebase/app';
import 'firebase/database';

import {
  SHARKS_FETCH_SUCCESS,
  DETAILED_SHARK_CHANGED,
  SHARK_DATE_UPDATE,
  SHARK_SETLIST_UPDATE,
  SHARK_ERROR,
  SHARK_UPDATE,
} from './types';

export const sharksFetch = value => {
  return dispatch => {
    app.database().ref('sharks').on('value', snapshot => {
      dispatch({ type: SHARKS_FETCH_SUCCESS, payload: snapshot.val() })
    })
  }
}

export const sharkUpdate = shark => {
  return dispatch => {
    app.database().ref(`sharks/active/${shark.id}`)
      .update(shark)
      .then(() => {
        dispatch({ type: SHARK_UPDATE, payload: shark.id });
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: SHARK_ERROR, payload: e.message });
      })
  }
};

export const detailedSharkChanged = value => (
  { type: DETAILED_SHARK_CHANGED, payload: value }
)

export const sharkDateChanged = value => (
  { type: SHARK_DATE_UPDATE, payload: value }
)

export const sharkFavSongsChanged = value => (
  { type: SHARK_SETLIST_UPDATE, payload: value }
)
export const sharkMessageChanged = value => (
  { type: SHARK_ERROR, payload: value }
)
