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
        case 'STATISTICS' :
            return {...state, admin:'statistics'}
        default :
            return state
    }
}