import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {apiurl} from '../../helper/apiurl'

import {Paper,Table,TableHead,TableBody,TableRow,TableCell,TableContainer, IconButton, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {Info} from '@material-ui/icons'

function Orderlist () {
    const [order,setorder] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/getorder?status=100`)
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

    const [filter,setfilter] = useState(false)
    const [status,setstatus] = useState(100)
    const handle = e => {
        setstatus(e.target.value)
    }
    useEffect(()=>{
        Axios.get(`${apiurl}/admin/getorder?status=${status}`)
        .then(res=>{
            setorder(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[status])

    return (
        <div style={{marginTop:90,marginBottom:'100px',paddingRight:80,paddingLeft:80,width:'100%'}}>
            <div className='d-flex align-items-end'>
                <div style={{fontSize:'25px',marginBottom:'40px'}}>
                    ORDER LIST
                </div>
                <div className='ml-auto mr-4 mb-2' style={{width:'25%'}}>
                    <FormControl  style={{width:'100%'}}>
                        <InputLabel>Filter</InputLabel>
                        <Select name="filter" open={filter} onClose={()=>{setfilter(false)}} onOpen={()=>{setfilter(true)}} onChange={handle} >
                            <MenuItem value={100}><em>ALL LIST</em></MenuItem>
                            <MenuItem value={-1}>canceled</MenuItem>
                            <MenuItem value={0}>not yet paid</MenuItem>
                            <MenuItem value={1}>waiting your confirmation</MenuItem>
                            <MenuItem value={2}>payment confirmed</MenuItem>
                            <MenuItem value={3}>clothes being made</MenuItem>
                            <MenuItem value={4}>clothes completed</MenuItem>
                            <MenuItem value={5}>being sent</MenuItem>
                            <MenuItem value={6}>waiting user confirmation</MenuItem>
                            <MenuItem value={7}>order completed</MenuItem>
                        </Select>
                    </FormControl>
                </div>
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