import Firebase from "../../firebase";
import * as types from "./types";

export function fetchSetLists() {
  return dispatch => {
    const setListsRef = Firebase.database().ref("setLists");
    setListsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      console.log(items);
      const setLists = [];

      for (let item in items) {
        const value = items[item]
        setLists.push({
          id: item,
          songList: value.songList,
          used: value.used,
          timeStamp: value.timeStamp
        });
      }
      dispatch(setSetLists(setLists));
    })
  }
}

export function setSetLists(setLists) {
  return {
    type: types.SET_SETLISTS,
    payload: setLists
  }
}

export function deleteSetList(setList) {
  const setListsRef = Firebase.database().ref("setLists");
  return dispatch => setListsRef.child(setList).remove();
}

export function useSetList(setList) {
  const timeStamp = (new Date()).getTime().toString();
  const setListsRef = Firebase.database().ref("setLists")
  const setListRef = setListsRef.child(action.payload.setList);
  return dispatch => setListRef.update({ timeStamp: timeStamp });
}