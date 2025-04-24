import { combineReducers } from 'redux'
import spinner from '../reducers/spinner_Red'
import saveHistory from '../reducers/searchHistory_Red'

const rootReducer = combineReducers({ 
    spinner, saveHistory
 });

export default rootReducer