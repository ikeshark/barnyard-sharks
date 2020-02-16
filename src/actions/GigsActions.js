import app from 'firebase/app';
import 'firebase/database';

import {
  DETAILED_GIG_CHANGED,
  GIGS_FETCH_SUCCESS,
  GIG_UPDATE,
  GIG_DELETE,
  GIG_ERROR,
  GIG_CREATE,
  GIG_DATE_UPDATE,
  GIG_SETLIST_UPDATE,
  GIG_MEDIA_DELETED,
  GIG_MEDIA_ADDED
} from './types';

export const gigsFetch = value => {
  return dispatch => {
    app.database().ref('gigs').on('value', snapshot => {
      dispatch({ type: GIGS_FETCH_SUCCESS, payload: snapshot.val() })
    })
  }
}

export const gigMediaAdded = (mediaObj, id) => {
  return dispatch => {
    const dbRef = app.database().ref(`gigs/${id}/media`);
    const newRef = dbRef.push(mediaObj)
    .then(() => {
      dispatch({ type: GIG_MEDIA_ADDED, key: newRef.key, payload: mediaObj })
    })
  }
}
export const gigMediaDeleted = (gigId, mediaId) => {
  return dispatch => {
    const dbRef = app.database().ref(`gigs/${gigId}/media/${mediaId}`);

    dbRef.remove()
      .then(() => {
        dispatch({ type: GIG_MEDIA_DELETED, payload: mediaId });
      })
      .catch(e => {
        dispatch({ type: GIG_ERROR, payload: 'fuck' })
      })
  }
}

export const gigDateChanged = value => (
  { type: GIG_DATE_UPDATE, payload: value }
)

export const gigSetListUpdated = value => (
  { type: GIG_SETLIST_UPDATE, payload: value }
)

export const gigUpdate = gig => {
  return dispatch => {
    app.database().ref(`gigs/${gig.id}`)
      .update(gig)
      .then(() => {
        dispatch({ type: GIG_UPDATE, payload: gig.id });
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: GIG_ERROR, payload: e.message });
      })
  }
};

export const gigDelete = id => {
  return dispatch => {
    app.database().ref(`gigs/${id}`)
      .remove()
      .then(() => {
        dispatch({ type: GIG_DELETE });
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: GIG_ERROR, payload: e.message });
      })
  }
}
export const gigCreate = gig => {
  return dispatch => {
    app.database().ref('gigs')
      .push()
      .then(ref => {
        gig.id = ref.key;
        app.database().ref(ref)
          .update(gig)
          .then(() => {
            dispatch({ type: GIG_CREATE, payload: gig });
         })
      })
      .catch(e => {
        dispatch({ type: GIG_ERROR, payload: e.message });
      })
 }
};
export const gigMessageChanged = value => (
  { type: GIG_ERROR, payload: value }
)
export const detailedGigChanged = value => (
  { type: DETAILED_GIG_CHANGED, payload: value }
)
