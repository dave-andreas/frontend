import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {apiurl} from '../../helper/apiurl'

import {Paper,Table,TableHead,TableBody,TableRow,TableCell,TableContainer, IconButton} from '@material-ui/core'
import {Info} from '@material-ui/icons'

function Orderlist () {
    const [order,setorder] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/getorder`)
        .then(res=>{
            console.log(res.data)
            setorder(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const renorder = () => {
        return order.map((order,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell align='center'>{index+1}</TableCell>
                    <TableCell align='center'>{order.username}</TableCell>
                    <TableCell align='center'>{order.tanggalorder}</TableCell>
                    <TableCell align='center'>{order.tanggalbayar}</TableCell>
                    <TableCell align='center'>Rp {order.totharga}</TableCell>
                    <TableCell align='center'>{statorder(order.statusorder)}</TableCell>
                    <TableCell align='center'>
                        <IconButton component={Link} to={{pathname:'/orderdetil'}} onClick={()=>localStorage.setItem('orderid',order.id)}>
                            <Info/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    const statorder = (stat) => {
        switch (stat) {
            case -1 : return 'canceled'
            case 0 : return 'not yet paid'
            case 1 : return 'waiting your confirmation'
            case 2 : return 'payment confirmed'
            case 3 : return 'clothes being made'
            case 4 : return 'clothes completed'
            case 5 : return 'being sent'
            case 6 : return 'waiting user confirmation'
            case 7 : return 'order completed'
            default : return 'something hapend ...'
        }
    }

    return (
        <div style={{marginTop:90,marginBottom:'100px',paddingRight:80,paddingLeft:80,width:'100%'}}>
            <div style={{fontSize:'25px',marginBottom:'40px'}}>
                ORDER LIST
            </div>
            <TableContainer component={Paper} elevation={6}>
                <Table style={{minWidth:700}} size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' style={{fontWeight:'bold'}}>no.</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Username</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Order Date</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Payment Date</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Total</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Order status</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renorder()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Orderlist