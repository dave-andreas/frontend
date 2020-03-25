import {combineReducers} from 'redux'
import authreducer from './authreducer'
import admreducer from './admreducer'
import orderingreducer from './orderingreducer'
import userreducer from './userreducer'

export default combineReducers({
    auth:authreducer,
    adm:admreducer,
    ordering:orderingreducer,
    user:userreducer
})