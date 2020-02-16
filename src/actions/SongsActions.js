import app from 'firebase/app';
import 'firebase/database';

import {
  SONGS_FETCH_SUCCESS,
  DETAILED_SONG_CHANGED,
  SONG_UPDATE,
  SONG_CREATE,
  SONG_DELETE,
  SONG_ERROR,
  SONG_DATE_UPDATE,
  LYRICS_UPDATE,
  VOX_UPDATE,
  REQSHARKS_UPDATE,
  AUDIO_UPDATE,
 } from './types';

function validateName(songs, songName, songId) {
  songs = Object.entries(songs);
  // see if any songs share the same name as edited song
  // (excluding the song iteslf i.e. the name was not edited)
  return !songs.some(song => {
    return (song[1].name === songName && song[0] !== songId)
  })
}

export const songsFetch = value => {
  return dispatch => {
    app.database().ref('songs').on('value', snapshot => {
      dispatch({ type: SONGS_FETCH_SUCCESS, payload: snapshot.val() })
    })
  }
}

export const songUpdate = (songs, song) => {
  if (!validateName(songs, song.name, song.id)) {
    return { type: SONG_ERROR, payload: 'Song names must be unique' }
  }
  return dispatch => {
    app.database().ref(`songs/${song.id}`)
      .update(song)
      .then(() => {
        dispatch({ type: SONG_UPDATE, payload: song.id });
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: SONG_ERROR, payload: e.message });
      })
  }
};

export const songDelete = id => {
  return dispatch => {
    app.database().ref(`songs/${id}`)
      .remove()
      .then(() => {
        dispatch({ type: SONG_DELETE });
      })
      .catch(e => {
        dispatch({ type: SONG_ERROR, payload: e.message })
      })
  }
}
export const songCreate = (songs, song) => {
  if (!validateName(songs, song.name, song.id)) {
    return { type: SONG_ERROR, payload: 'Song names must be unique' }
  }
  return dispatch => {
    app.database().ref('songs')
      .push()
      .then(ref => {
        song.id = ref.key;
        app.database().ref(ref)
          .update(song)
          .then(() => {
            dispatch({ type: SONG_CREATE, payload: song });
         })
      })
      .catch(e => {
        dispatch({ type: SONG_ERROR, payload: e.message });
      })
 }
};
export const songMessageChanged = value => (
  { type: SONG_ERROR, payload: value }
)
export const songDateChanged = value => (
  { type: SONG_DATE_UPDATE, payload: value }
)
export const songLyricsChanged = value => (
  { type: LYRICS_UPDATE, payload: value }
)
export const songVoxChanged = value => (
  { type: VOX_UPDATE, payload: value }
)
export const songReqSharksChanged = value => (
  { type: REQSHARKS_UPDATE, payload: value }
)
export const songAudioChanged = value => (
  { type: AUDIO_UPDATE, payload: value }
)
export const detailedSongChanged = value => (
  { type: DETAILED_SONG_CHANGED, payload: value }
)
