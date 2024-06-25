import {  applyMiddleware,createStore } from "redux";
import reducer from "./reducer";
//  import thunk from "react-thunk"

const store = createStore(reducer)
export default store;