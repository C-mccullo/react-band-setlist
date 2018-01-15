import * as firebase from "../../firebase";
import * as types from "./types";

export function fetchSetLists() {
  return dispatch => {
    dispatch({
      type: types.LOADING_SETLISTS,
    })
    firebase.fetchSetLists()
      .then(snap => {
        dispatch({
          type: types.SET_SETLISTS,
          payload: {
            setLists: snap.val()
          }
        })
      })
      .then(()=> {
        dispatch({
          type: types.LOADED_SETLISTS,
        })
      })
      .catch(err => {
        dispatch({
          type: types.ERROR_SETLISTS,
          payload: {
            error: err
          }
        })
      })
  }
}

export function deleteSetList(setList) {
  console.log("deleteListAction", setList);
  return dispatch => {
    firebase.deleteSetList(setList)
      .then(snap => {
        dispatch({
          type: DELETED_SETLIST,
          payload: snap.val()
        })
      })
      .catch(err => {
        dispatch({
          type: types.ERROR_SETLISTS,
          payload: {
            error: err
          }
        })
      })
  }
}

export function useSetList(setList) {
  return dispatch => {
    firebase.addTimeStampToSetList(setList)
    .then(snap => {
      // console.log(snap)
      dispatch({
        type: types.ADDED_TIMESTAMP_TO_SETLIST,
        payload: { 
          setLists: snap.val() 
        }
      })
      })
      .then(err => {
        dispatch({
          type: types.ERROR_SETLISTS,
          payload: {
            error: err
          }
        })
      })
  }
}