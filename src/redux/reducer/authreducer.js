import {USER_LOGIN_LOADING, USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT, USER_REGIS, USER_REGIS_SUCCESS} from '../action/types'

const INITIAL_STATE={
    id:'',
    username:'',
    email:'',
    role:'',
    error:'',
    loading:false,
    checked:false,
    regis:false,
    message:''
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_LOADING :
            return {...state, loading:true}
        case USER_LOGIN_SUCCESS :
            return {...state, ...action.payload, loading:false, checked:true}
        case USER_LOGIN_ERROR :
            return {...state, ...action.payload, loading:false}
        case USER_LOGOUT :
            return {...state, ...INITIAL_STATE}
        case USER_REGIS :
            return {...state, ...action.payload}
        case USER_REGIS_SUCCESS :
            return {...state, ...action.payload, regis:true}
        default :
            return state
    }
}