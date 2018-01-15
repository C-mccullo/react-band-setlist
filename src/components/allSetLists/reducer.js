import * as types from "./types"

const initialState = {
  setLists: {},
  isFetching: false,
  error: null
} 

export default function setListReducer(state = initialState, action) {
  switch(action.type) {
    case types.LOADING_SETLISTS: {
      return {
        ...state,
        isFetching: true
      }
    }
    case types.SET_SETLISTS: {
      console.log("setLists in reducer SET_SETLISTS", action.payload.setLists)
      return { ...state,
        setLists: action.payload.setLists
      }
    }
    case types.LOADED_SETLISTS: {
      return {
        ...state,
        isFetching: false
      }
    }
    case types.ADDED_TIMESTAMP_TO_SETLIST: {
      return {
        ...state,
        setLists: action.payload.setLists
      }
    }
    case types.ERROR_SETLISTS: {
      return {
        ...state,
        error: action.payload.error
      }
    }
    default: {
      return state;
    }
  }
}