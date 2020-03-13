const INITIAL_STATE = {
    admin : 'models'
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'MODELS' :
            return {...state, admin:'models'}
        case 'FABRICS' :
            return {...state, admin:'fabrics'}
        default :
            return state
    }
}