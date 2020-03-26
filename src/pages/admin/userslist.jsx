import React from 'react'
import { useEffect,useState } from 'react';
import Axios from 'axios';
import { apiurl } from '../../helper/apiurl';

import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button} from '@material-ui/core'
import {Info} from '@material-ui/icons'

import {Modal,ModalBody} from 'reactstrap'

function Userslist () {
    const [users,setusers] = useState([])

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getusers`)
        .then(res=>{
            setusers(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const [modinfo,setmodinfo] = useState(false)
    const [info,setinfo] = useState({})
    const infopen = (index) => {
        setinfo(users[index])
        setmodinfo(!modinfo)
    }
    const reninfo = () =>{
        return (
            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell align='right'>Username :</TableCell><TableCell>{info.username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Email :</TableCell><TableCell>{info.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Role :</TableCell><TableCell>{info.role}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Status :</TableCell><TableCell>{info.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Fullname :</TableCell><TableCell>{info.fullname}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Age :</TableCell><TableCell>{info.usia}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Gender :</TableCell><TableCell>{info.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Phone :</TableCell><TableCell>{info.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='right'>Address :</TableCell><TableCell>{info.address}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }

    const renusers = () =>{
        return users.map((users,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{users.username}</TableCell>
                    <TableCell align='right'>{users.email}</TableCell>
                    <TableCell align='center'>{users.role}</TableCell>
                    <TableCell align='center'>{users.status}</TableCell>
                    <TableCell>
                        <IconButton onClick={()=>infopen(index)}>
                            <Info/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }
    
    return (
        <div style={{marginTop:90,marginBottom:'100px',paddingRight:100,paddingLeft:100}}>
            <Modal isOpen={modinfo} toggle={()=>setmodinfo(!modinfo)}>
                <ModalBody>{reninfo()}</ModalBody>
            </Modal>
            <div style={{fontSize:'25px',marginBottom:'20px'}}>
                MANAGE USERS
            </div>
            <TableContainer component={Paper} elevation={6}>
                <Table style={{minWidth:700}} size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>no.</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Username</TableCell>
                            <TableCell align='right' style={{fontWeight:'bold',width:300}}>Email</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold',width:200}}>Role</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Status</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renusers()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Userslist