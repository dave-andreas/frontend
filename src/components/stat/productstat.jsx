import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, CardMedia } from '@material-ui/core'
import { apiurl } from '../../helper/apiurl'

function Productstat () {
    const [sellmod,setsellmod] = useState([])
    const [pickfab,setpickfab] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/sellmod`)
        .then(res=>{
            setsellmod(res.data)
            Axios.get(`${apiurl}/admin/pickfab`)
            .then(res=>{
                setpickfab(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const rensellmod = () => {
        return sellmod.map((sellmod,index)=>{
            return(
                <TableRow key={index}>
                    <TableCell>
                        <div style={{width:'100%'}}>
                            <CardMedia style={{height:0,paddingTop:'130%'}} image={sellmod.path ? (sellmod.path[0] === 'p' ? `${apiurl}/${sellmod.path}` :sellmod.path) :'null'}/>
                        </div>
                    </TableCell>
                    <TableCell>{sellmod.name}</TableCell>
                    <TableCell>Rp {sellmod.harga}</TableCell>
                    <TableCell>{sellmod.kategori}</TableCell>
                    <TableCell>{sellmod.terjual} set</TableCell>
                </TableRow>
            )
        })
    }

    const renpickfab = () => {
        return pickfab.map((pickfab,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{pickfab.name}</TableCell>
                    <TableCell>Rp {pickfab.harga}</TableCell>
                    <TableCell>{pickfab.stok} set</TableCell>
                    <TableCell>{pickfab.terjual}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div className='d-flex' style={{marginTop:20,marginBottom:40}}>
            <div style={{width:'60%'}}>
                <div className='my-2' style={{fontSize:25}}>Most Selling Models</div>
                <TableContainer component={Paper} elevation={6}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:'bold'}}>Pict</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Price</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Category</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Sell</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rensellmod()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='ml-3'>
                <div className='my-2' style={{fontSize:25}}>Most Picked Fabrics</div>
                <TableContainer component={Paper} elevation={6}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Price (/set)</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Stock</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Picked</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renpickfab()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Productstat