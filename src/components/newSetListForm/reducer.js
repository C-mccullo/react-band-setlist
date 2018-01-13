import * as types from "./types";

const initialState = {
  newSetList: {
    newSong: "",
    songList: [],
    used: false,
    timeStamp: ""
  },
  newPostCount: 0
}

export default function newSetListFormReducer(state = initialState, action) {
  switch(action.type) {
    case types.GET_COUNT: {
      return {
        ...state,
        newPostCount: action.payload.count
      }
    }

    case types.UPDATE_NEW_LIST_SONG: {
      const listState = {...state};
      const stateWithNewSong = listState.newSong = action.payload.song;
      return {
        stateWithNewSong
      }
    }

    default: {
      return state;
    }
  }
}