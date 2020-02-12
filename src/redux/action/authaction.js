import Axios from 'axios'
import {USER_LOGIN_LOADING, USER_LOGIN_SUCCESS,USER_LOGIN_ERROR,USER_LOGOUT, USER_REGIS, USER_REGIS_SUCCESS} from './types'
import {apiurl} from '../../helper/apiurl'

export const userlogin = (username,password) => {
    console.log (username,password,' masuk action userlogin')
    return (dispatch) => {
        dispatch ({type:USER_LOGIN_LOADING})
        if (username===''||password==='') {
            dispatch ({type:USER_LOGIN_ERROR, payload: {error:'harus terisi semua'}})
        }else {
            Axios.get (`${apiurl}/auth/login`, {
                params:{
                    username, password
                }
            }).then ((res) => {
                var datauser = res.data.datauser[0]
                localStorage.setItem('id',datauser.id)
                dispatch({type:USER_LOGIN_SUCCESS, payload:datauser})
            }).catch ((err) => {
                dispatch({type:USER_LOGIN_ERROR, payload:err})
            })
        }
    }
}

export const logout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('email')
    return{
        type:USER_LOGOUT
    }
}

export const getuser = () => {
    return (dispatch) => {
        dispatch({type:USER_LOGIN_LOADING})
        var id = localStorage.getItem ('id')
        Axios.get(`${apiurl}/auth/getuser/${id}`)
        .then((res)=>{
            var datauser = res.data.datauser[0]
            if(datauser.username){
                dispatch({type:USER_LOGIN_SUCCESS, payload:datauser})
            }else{
                dispatch({type:USER_LOGIN_ERROR})
            }
        }).catch((err)=>{
            console.log(err)
            dispatch({type:USER_LOGIN_ERROR})
        })
    }
}

export const register = (data) => {
    var {username,email,password} = data
    return (dispatch) => {
        Axios.post(`${apiurl}/auth/register`,{username,email,password})
        .then((res)=>{
            if(res.status===202){
                return dispatch({type:USER_LOGIN_ERROR, payload:res.data})
            }
            console.log(res)
            var dataregis ={
                email: res.data.email
            }
            localStorage.setItem('email',dataregis.email)
            dispatch({type:USER_REGIS, payload:dataregis})
        }).catch((err)=>{
            console.log(err)
        })
    }
}

export const verified = (params) => {
    var username = params.username
    var password = params.password
    return (dispatch) => {
        console.log(password)
        Axios.put(`${apiurl}/auth/verified`,{username,password})
        .then((res)=>{
            console.log(res.data)
            localStorage.setItem('id',res.data.id)
            dispatch({type:USER_REGIS_SUCCESS,payload:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
}