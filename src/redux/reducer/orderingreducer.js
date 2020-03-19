const INITIAL_STATE = {
    activestep : 0,
    order : {}
}

export default(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'NEXT' :
            return {...state, activestep: state.activestep+1}
        case 'BACK' :
            return {...state, activestep: state.activestep-1}
        case 'RESET' :
            return INITIAL_STATE
        case 'FIRST' :
            return {...state, order: action.payload, activestep: state.activestep+1}
        case 'SAVE' :
            return {...state, order: action.payload}
        case 'SKIP' :
            return {...state, order:INITIAL_STATE.order, activestep: state.activestep+1}
        default :
            return state
    }
}