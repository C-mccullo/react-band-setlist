// login
import Firebase, { Auth, Provider } from "../../firebase";
import * as types from "./types";

export function getUser(user) {
  return dispatch => {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: types.GET_USER,
          payload: {
            currentUser: user,
            loggedIn: true
          }
        })
      }
    });
  }
}

export function loginUser() {
  Auth.signInWithPopup(Provider)
    .then((result) => {
      const currentUser = result.user;
      dispatch({
        type: LOGIN_USER,
        payload: {
          currentUser: currentUser,
          loggedIn: true
        }
      })
    });
}

export function logoutUser(user) {
  return dispatch => {
    Auth.signOut()
      .then(() => {
        dispatch({
          type: types.LOGOUT_USER,
          payload: {
            currentUser: null,
            loggedIn: false
          }
        })
      });
  }
}