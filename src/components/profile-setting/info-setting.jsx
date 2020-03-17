import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux'
import './profile-setting.css'
import Modale from './modal'
import Axios from 'axios';
import { apiurl } from '../../helper/apiurl';

function Infosetting () {
    const username = useSelector(state=>state.auth.username)
    const [open,setopen] = useState(false)
    const [info,setinfo] = useState({})

    useEffect(()=>{
        var id = localStorage.getItem('id')
        Axios.get(`${apiurl}/auth/getinfo/${id}`)
        .then(res=>{
            console.log(res.data)
            setinfo({...info,...res.data,userid:id})
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const modal=()=>{
        setopen(!open)
    }

    const infohandle = e =>{
        const {name,value} = e.target
        setinfo({...info,[name]:value})
        console.log(info)
    }

    const save=()=>{
        console.log(info)
        const {userid,fullname,usia,gender,phone,address} = info
        Axios.put(`${apiurl}/auth/editinfo`,{userid,fullname,usia,gender,phone,address})
        .then(res=>{
            setinfo(res.data)
            setopen(!open)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div style={{width:'80%',paddingLeft:'10%',marginTop:80}}>
            <Modale open={open} togel={modal} title={`edit ${username} info`} fung={save} >
                <div className='mb-2'>
                    Full Name : <input type='text' onChange={infohandle} name='fullname' className='form-control' defaultValue={info.fullname} placeholder='full name'/>
                </div>
                <div className='mb-2'>
                    Age : <input type='number' onChange={infohandle} name='usia' className='form-control' defaultValue={info.usia} placeholder='age'/>
                </div>
                <div className='mb-2'>
                    Gender : 
                        {info.gender==='Pria'?
                            <div className='d-flex'>
                                <div className='mx-3'>
                                    <input type='radio' onChange={infohandle} defaultChecked name='gender' value='Pria'/> Pria 
                                </div>
                                <div>
                                    <input type='radio' onChange={infohandle} name='gender' value='Wanita'/> Wanita
                                </div>
                            </div>
                            :
                            <div className='d-flex'>
                                <div className='mx-3'>
                                    <input type='radio' onChange={infohandle} name='gender' value='Pria'/> Pria 
                                </div>
                                <div>
                                    <input type='radio' onChange={infohandle} defaultChecked name='gender' value='Wanita'/> Wanita
                                </div>
                            </div>
                        }
                </div>
                <div>
                    Phone : <input type='text' onChange={infohandle} name='phone' className='form-control' defaultValue={info.phone} placeholder='phone number' />
                </div>
                <div>
                    Address : <input type='text' onChange={infohandle} name='address' className='form-control' defaultValue={info.address} placeholder='address' />
                </div>
            </Modale>
            <div className='mt-5'>
                <table className='table'>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{username}</td>
                        </tr>
                        <tr>
                            <td>Full Name</td>
                            <td>{info.fullname}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{info.usia}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{info.gender}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{info.phone}</td>
                        </tr>
                        <tr>
                            <td>Addres</td>
                            <td>{info.address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className='btn btn-warning mt-3' onClick={modal}>edit</button>
        </div>
    )
}

export default Infosetting