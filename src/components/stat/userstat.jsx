import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, CardMedia, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@material-ui/core'
import { apiurl } from '../../helper/apiurl'

function Userstat () {
    const [load,setload] = useState(true)
    const [userstat,setuserstat] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/userstat?sort=username`)
        .then(res=>{
            setuserstat(res.data)
            setload(false)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const [opensort,setopensort] = useState(false)
    const [sort,setsort] = useState('username')
    const handle = e => {
        setsort(e.target.value)
    }
    useEffect(()=>{
        setload(true)
        Axios.get(`${apiurl}/admin/userstat?sort=${sort}`)
        .then(res=>{
            setuserstat(res.data)
            setload(false)
        }).catch(err=>{
            console.log(err)
        })
    },[sort])

    const renuserstat = () => {
        return userstat.map((userstat,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{userstat.username}</TableCell>
                    <TableCell align='center'>{userstat.pesan}</TableCell>
                    <TableCell align='center'>{userstat.bayar}</TableCell>
                    <TableCell align='right'>Rp. {userstat.bill}</TableCell>
                    <TableCell align='right'>{userstat.potong} set</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div style={{marginTop:20,marginBottom:40,width:'70%'}}>
            <div className='d-flex align-items-end'>
                <div className='my-2 d-flex' style={{fontSize:25}}>
                    Most active User
                    {load ? <CircularProgress className='ml-3' /> : null}
                </div>
                <div className='ml-auto my-2 mr-2' style={{width:'20%'}}>
                    <FormControl  style={{width:'100%'}}>
                        <InputLabel>Order by</InputLabel>
                        <Select name="sort" open={opensort} onClose={()=>{setopensort(false)}} onOpen={()=>{setopensort(true)}} onChange={handle} >
                            <MenuItem value={'username'}><em>how are you</em></MenuItem>
                            <MenuItem value={'pesan'}>Order</MenuItem>
                            <MenuItem value={'bayar'}>Paid Order</MenuItem>
                            <MenuItem value={'bill'}>Total Paid</MenuItem>
                            <MenuItem value={'potong'}>Total Clothes</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <TableContainer component={Paper} elevation={6}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>no.</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Username</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Order</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>Paid Order</TableCell>
                            <TableCell align='right' style={{fontWeight:'bold'}}>Total Paid</TableCell>
                            <TableCell align='right' style={{fontWeight:'bold'}}>Total Clothes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renuserstat()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Userstat