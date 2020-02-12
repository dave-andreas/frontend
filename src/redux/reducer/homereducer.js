import {USER_HOME_LOADING, USER_HOME_SUCCESS, USER_HOME_ERROR} from '../action/types'

const INITIAL_STATE={
    id:'',
    username:'',
    email:'',
    role:'',
    error:'kosong',
    loading:false
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_HOME_LOADING :
            return {...state, loading:true}
        case USER_HOME_SUCCESS :
            console.log(action.payload)
            return {...state,...action.payload,loading:false,error:'ada'}
        case USER_HOME_ERROR :
            return {...state, ...action.payload, loading:false}
        default :
            return state
    }
}