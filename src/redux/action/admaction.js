
export const menuaction = (x) => {
    return (dispatch) => {
        dispatch({type:'ADMIN',payload:x})
    }
}

export const filteraction = (x) => {
    return (dispatch) => {
        console.log(x)
        dispatch ({type:'FILTER', payload:x})
    }
}