import {combineReducers} from 'redux'
import authreducer from './authreducer'
import admreducer from './admreducer'
// import homereducer from './homereducer'

export default combineReducers({
    // homereducer,
    auth:authreducer,
    adm:admreducer
})