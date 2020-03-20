const INITIAL_STATE = {
    admin : ''
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'MODELS' :
            return {...state, admin:'models'}
        case 'FABRICS' :
            return {...state, admin:'fabrics'}
        case 'ORDERLIST' :
            return {...state, admin:'orderlist'}
        default :
            return state
    }
}