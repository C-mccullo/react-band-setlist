import Firebase from "../../firebase";
import * as types from "./types";

export function fetchSetLists() {
  return dispatch => {
    const setListsRef = Firebase.database().ref("setLists");
    setListsRef.on('value', (snapshot) => {
      const items = snapshot.val();
      let setLists = [];

      for (let item in items) {
        const value = items[item]
        const parcel = {
          id: item,
          songList: value.songList,
          used: value.used,
          timeStamp: value.timeStamp
        }
        setLists.push(parcel);
      }
      dispatch(setSetLists(setLists));
    })
  }
}

export function setSetLists(setLists) {
  // console.log("setlists in action creator", setLists);
  return {
    type: types.SET_SETLISTS,
    payload: {
      setLists
    }
  }
}

export function deleteSetList(setList) {
  const setListRef = Firebase.database().ref("setLists").child(setList);
  console.log(setListRef);
  return dispatch => setListRef.remove();
}

export function useSetList(setList) {
  const timeStamp = (new Date()).getTime().toString();
  // console.log("setlist to be updated", setList);
  const setListRef = Firebase.database().ref("setLists").child(setList);
  return dispatch => setListRef.update({ timeStamp: timeStamp, used: true });
}