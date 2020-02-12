import Axios from 'axios'
import {USER_HOME_LOADING, USER_HOME_SUCCESS,USER_HOME_ERROR} from './types'
import {apiurl} from '../../helper/apiurl'

export const getuser = () => {
    console.log ('masuk homeaction getuser')
    return (dispatch) => {
        dispatch({type:USER_HOME_LOADING})
        var id = localStorage.getItem ('id')
        Axios.get(`${apiurl}/auth/getuser/${id}`)
        .then((res)=>{
            var datauser = res.data.datauser[0]
            console.log(datauser)
            dispatch({type:USER_HOME_SUCCESS, payload:datauser})
        }).catch((err)=>{
            dispatch({type:USER_HOME_ERROR, payload:err})
        })
    }
}

