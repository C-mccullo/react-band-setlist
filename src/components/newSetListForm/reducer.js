import * as types from "./types";

// newSetListForm
const initialState = {
  newSetList: {
    newSong: "",
    songList: {},
    used: false,
    timeStamp: ""
  },
  newPostCount: 0
}

export default function newSetListFormReducer(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_COUNT: {
      return {
        ...state,
        newPostCount: action.payload.count
      }
    }

    case types.UPDATE_NEW_LIST: {
      console.log("UPDATE_NEW_LIST payload", action.payload);
      return {
        ...state,
        newSetList: action.payload
      }
    }
    case types.RESET_NEW_SONG: {
      return {
        ...state,
         
      }
    }
    default: {
      return state;
    }
  }
}