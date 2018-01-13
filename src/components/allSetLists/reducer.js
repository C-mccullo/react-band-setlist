import * as types from "./types"

const initialState = {
  setLists: [],
} 

export default function setListReducer(state = initialState, action) {
  switch(action.type) {
    case types.SET_SETLISTS: {
      console.log("setLists in reducer SET_SETLISTS", action.payload.setLists)
      return { ...state,
        setLists: action.payload.setLists
      }
    }
    default: {
      return state;
    }
  }
}