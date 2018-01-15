// setListForm
import * as firebase from "../../firebase";
import fetchSetLists from "../allSetLists/actions"
import * as types from "./types";

export function getCount() {
  return dispatch => {
    firebase.fetchNewListCount()
      .then((snap) => {
        console.log("fetchNewListCount", snap.val())
        dispatch({
          type: types.FETCH_COUNT,
          payload: {
            count: snap.val()
          }
        })
      })
  }
}

export function addCount() {

}

export function resetCount() {

}

export function addSetList(setList) {
  //upon push of setlist, setListRef.on("value") callback will be called 
  // in allSetLists component reducer  
  return dispatch => {
    firebase.pushNewListToSetLists()
      .then((snap) => {
        console.log(snap.val())
        dispatch(fetchSetLists())
      })
      .then(() => {
        dispatch(resetNewListForm())
      })
  }
}

export function fetchNewList() {
  return dispatch => {
    firebase.fetchNewSetList()
      .then((snap) => {
        dispatch({
          type: types.FETCH_NEW_LIST,
          payload: {
            newSetList: snap.val()
          }
        })
      })
  }
}

export function updateNewSong(song) {
  return dispatch => {
    firebase.updateNewSong(song)
      .then((snap) => {
        console.log("updateNewSong", snap.val())
        dispatch({
          type: types.UPDATE_NEW_LIST,
          payload: { 
            newSetList: snap.val() 
          }
        })
      })
  }
}

export function resetNewListForm() {
  return dispatch => {
    firebase.resetNewList()
      .then((snap) => {
        console.log("resetNewList", snap.val())
        dispatch({
          type: types.RESET_NEW_LIST,
          payload: {
            newSetList: snap.val()
          }
        })
      })
  }
}

export function addSongToList() {
  return dispatch => {
    firebase.pushNewSongToSongList()
      .then((snap) => {
        console.log("pushNewSongToList", snap.val())
        dispatch({
          type: types.PUSH_SONG_TO_NEW_LIST,
          payload: {
            newSetList: snap.val()
          }
        })
      })
  }
}

export function resetNewSongState() {
  return dispatch => {
    firebase.updateNewSong("")
      .then((snap) => {
        console.log("resetNewSongState", snap.val())
        dispatch({
          type: types.RESET_NEW_SONG,
          payload: {
            newSetList: snap.val()
          }
        })
      })
  }
}

export function removeSongFromList(song) {
  return dispatch => {
    firebase.removeSongFromNewList()
      .then((snap) => {
        console.log("removeSongFromList", snap.val())
        dispatch({
          type: types.REMOVE_SONG_FROM_LIST,
          payload: {
            newSetList: snap.val()
          }
        })
      })
  }
}