import { combineReducers } from 'redux'
import  LoginSlice  from './LoggedSlice'

const rootReducer = combineReducers({
  login: LoginSlice,
})

export default rootReducer