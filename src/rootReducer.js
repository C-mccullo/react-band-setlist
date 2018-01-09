import { combineReducers } from "redux";
import { setListsReducer } from "./components/allSetLists/reducer";
import { navigationReducer } from "./components/common/reducer";
import { newSetListFormReducer } from "./components/setListForm/reducer";
import { loginReducer } from "./components/login/reducer";
import { generateSetListReducer } from "./components/setListGenerator/reducer";


const rootReducer = combineReducers({
  newSetList: newSetListFormReducer,
  setLists: setListsReducer,
  currentUser: loginReducer,
  generateList: generateSetListReducer
})

export default rootReducer;