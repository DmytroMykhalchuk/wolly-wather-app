import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import initializeReducer from "./initializeReducer";

const reducerPatch=combineReducers({
   initialize:initializeReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducerPatch,composeEnhancers(applyMiddleware(thunk)))//*thunkMiddlware


export default store;