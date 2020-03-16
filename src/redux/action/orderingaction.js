export const stepaction = (x) => {
    return (dispatch) => {
        dispatch({type:x})
    }
}

export const firststep = (order) => {
    return (dispatch) => {
        dispatch ({type:'FIRST',payload:order})
    }
}