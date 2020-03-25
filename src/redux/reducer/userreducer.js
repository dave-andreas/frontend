const INITIAL_STATE = {
    dashboard : 0
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 1 :
            return {...state, dashboard:1}
        case 2 :
            return {...state, dashboard:2}
        case 3 :
            return {...state, dashboard:3}
        case 4 :
            return {...state, dashboard:4}
        default :
            return state
    }
}