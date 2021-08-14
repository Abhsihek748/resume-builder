import { combineReducers } from "redux";
import contactReducer from './contactReducer';
import documentReducer from "./documentReducer";
import educationReducer from "./educationReducer";
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase'
import initialState from './initialState.json';
import * as actionTypes from '../actions/actionTypes'
import authReducer from "./authReducer";

const appReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    contactSection:contactReducer,
    educationSection: educationReducer,
    document:documentReducer,
    auth: authReducer,
})

const rootReducer = (state = initialState,action)=>{
    if(action.type === actionTypes.SIGN_OUT){
      state = undefined;
    }else{
      return appReducer(state,action);
    }
}
export default rootReducer;