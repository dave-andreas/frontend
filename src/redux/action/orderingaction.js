import Axios from 'axios'
import {apiurl} from '../../helper/apiurl'

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

export const savecart = (order) => {
    return (dispatch) => {
        Axios.post(`${apiurl}/user/savecart`,order)
        .then(res=>{
            console.log(res)
            dispatch ({type:'NEXT'})
        }).catch(err=>{
            console.log(err)
        })
    }
}