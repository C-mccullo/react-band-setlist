import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import setListsReducer from "./components/allSetLists/reducer";
import newSetListFormReducer from "./components/newSetListForm/reducer";
import loginReducer from "./components/login/reducer";
import generateSetListReducer from "./components/setListGenerator/reducer";

export const defaultState = {
  setLists: {
    setLists: {
      /* {
			id: ""
			songList: [],
			used: false,
			timeStamp: ""
		} */
    },
    isFetching: false,
    error: null
  },
  newListForm: {
    newSetList: {
      newSong: "",
      songList: {},
      used: false,
      timeStamp: ""
    },
    newPostCount: 0,
  },
  currentUser: {
    currentUser: null,
		loggedIn: false,
  }
}

const rootReducer = combineReducers({
  newListForm: newSetListFormReducer,
  setLists: setListsReducer,
  currentUser: loginReducer,
  generateList: generateSetListReducer,
  form: formReducer
})

export default rootReducer;