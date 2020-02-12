import {combineReducers} from 'redux'
import authreducer from './authreducer'
// import homereducer from './homereducer'

export default combineReducers({
    // homereducer,
    auth:authreducer
})