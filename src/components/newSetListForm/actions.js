// setListForm
import Firebase from "../../firebase";
import * as types from "./types";

export function addSetList(setList) {
  const setListsRef = Firebase.database().ref("setLists");
  //upon push of setlist, setListRef.on("value") callback will be called 
  // in allSetLists component reducer  
  return dispatch => setListsRef.push(setList);
}

export function getCount() {
  return dispatch => {
    const countRef = Firebase.database().ref("count");
    countRef.on("value", (snapshot) => {
      dispatch({
        type: types.GET_COUNT,
        payload: snapshot.val()
      });
    });
  }
}

export function addCount() {
  const countRef = Firebase.database().ref("count");
  const newCount = countRef + 1;
  dispatch => {
    countRef.transaction(function(count) {
      return (count || 0) + 1;
    })
  }
}

export function resetCount() {
  const resetCount = 0;
  const countRef = Firebase.database().ref("count");
  return dispatch => countRef.set(resetCount);
}

export function updateNewList() {
  return dispatch => {
    const newSongListRef = Firebase.database().ref("newSongList");
    newSongListRef.on("value", (snapshot) => {
      // dispatch();
    });
  }
}

export function setNewListSongs(song) {
  return {
    type: types.UPDATE_NEW_LIST_SONG,
    payload: { song }
  }
}

export function resetNewListForm(songlist) {
  const newSongListRef = Firebase.database().ref("newSongList");
  const resetNewSongListState = {
    newSong: "",
    songList: [],
    used: false,
    timeStamp: ""
  }
  return dispatch => newSongListRef.update(resetNewSongListState);
}

export function addSongToList() {
  const newSongListRef = Firebase.database().ref("newSongList");
  const newSongValue = newSongListRef.child("newSong").val();
  return dispatch => newSongListRef.child("songList").push(newSongValue);
}

export function removeSongFromList(song) {
  const songListRef = Firebase.database().ref("newSongList").child("songList");
  console.log(songListRef.equalTo(song));
  return dispatch => songListRef.equalTo(song).remove();
}