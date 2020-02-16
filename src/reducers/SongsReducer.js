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
} from '../actions/types';

const findSongById = (songs, id) => {
  if (typeof id === 'string') {
    return Object.values(songs).filter(song => song.id === id)[0];
  } else {
    return id
  }
}

const  INITIAL_STATE = {
  songs: {},
  detailedSong: null,
  message: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SONGS_FETCH_SUCCESS:
      return { ...state, songs: action.payload }
    case DETAILED_SONG_CHANGED:
      const detailedSong = action.payload ?
        findSongById(state.songs, action.payload) : null;
      return { ...state, detailedSong }
    case SONG_ERROR: {
      const text = /permission/i.test(action.payload) ?
        'Please sign in to create, edit, or delete a song' :
        action.payload;
      return {
        ...state,
        message: action.payload ? { type: 'error', text } : null
      }
    }
    case SONG_CREATE:
      return {
        ...state,
        detailedSong: action.payload,
        message: { type: 'message', text:'song created' }
      }
    case SONG_DELETE:
      return state;
    case SONG_UPDATE:
      return {
        ...state,
        message: { type: 'message', text:'song update' }
      }
    case SONG_DATE_UPDATE: {
      const newDetailedSong = { ...state.detailedSong, dob: action.payload }
      return { ...state, detailedSong: newDetailedSong }
    }
    case VOX_UPDATE: {
      const newDetailedSong = { ...state.detailedSong, vox: action.payload }
      return { ...state, detailedSong: newDetailedSong }
    }
    case LYRICS_UPDATE: {
      const newDetailedSong = { ...state.detailedSong, lyrics: action.payload }
      return { ...state, detailedSong: newDetailedSong }
    }
    case AUDIO_UPDATE: {
      const newDetailedSong = { ...state.detailedSong, audio: action.payload }
      return { ...state, detailedSong: newDetailedSong }
    }
    case REQSHARKS_UPDATE: {
      const newDetailedSong = { ...state.detailedSong, reqSharks: action.payload }
      return { ...state, detailedSong: newDetailedSong }
    }
    default:
      return state;
  }
}
