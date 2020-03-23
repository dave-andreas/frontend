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
            dispatch ({type:'NEXT'})
            dispatch ({type:'SAVE',payload:res.data.insertId})
        }).catch(err=>{
            console.log(err)
        })
    }
}