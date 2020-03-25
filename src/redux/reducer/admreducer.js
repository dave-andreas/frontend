const INITIAL_STATE = {
    admin : '',
    filter : 100
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'ADMIN' :
            return {...state, admin:action.payload}
        case 'FILTER' :
            return {...state, filter:action.paload}
        default :
            return state
    }
}