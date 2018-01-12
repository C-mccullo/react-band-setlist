import Firebase from "../../firebase";
import * as types from "./types";

const initialState = {
  currentUser: "",
  loggedIn: false,
}

export default function loginReducer(state = initialState, action) {
  switch(action.type) {
    case types.GET_USER: {
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loggedIn: action.payload.loggedIn
      }
    }
    case types.LOGIN_USER: {
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loggedIn: action.payload.loggedIn
      }
    }
    case types.LOGOUT_USER: {
      return {
        ...state,
        currentUser: action.payload.currentUser,
        loggedIn: action.payload.loggedIn
      }
    }
    default: {
      return state;
    }
  }
}