import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, CardMedia, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import { apiurl } from '../../helper/apiurl'

function Productstat () {
    const [sellmod,setsellmod] = useState([])
    const [pickfab,setpickfab] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/sellmod?sort=terjual&limit=10`)
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
                    <TableCell style={{width:'13%'}}>
                        <div style={{width:'100%'}}>
                            <CardMedia style={{height:0,paddingTop:'130%'}} image={sellmod.path ? (sellmod.path[0] === 'p' ? `${apiurl}/${sellmod.path}` :sellmod.path) :'null'}/>
                        </div>
                    </TableCell>
                    <TableCell>{sellmod.name}</TableCell>
                    <TableCell align='right'>Rp {sellmod.harga}</TableCell>
                    <TableCell align='center'>{sellmod.kategori}</TableCell>
                    <TableCell align='right'>{sellmod.terjual} set</TableCell>
                    <TableCell align='right'>{sellmod.dilihat} x</TableCell>
                </TableRow>
            )
        })
    }

    const [opensort,setopensort] = useState(false)
    const [sort,setsort] = useState('terjual')
    const [limit,setlimit] = useState(10)
    const handle = e => {
        setsort(e.target.value)
    }
    const handle1 = e => {
        setlimit(e.target.value)
    }
    useEffect(()=>{
        Axios.get(`${apiurl}/admin/sellmod?sort=${sort}&limit=${limit}`)
        .then(res=>{
            setsellmod(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[sort,limit])

    const renpickfab = () => {
        return pickfab.map((pickfab,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{pickfab.name}</TableCell>
                    <TableCell>Rp {pickfab.harga}</TableCell>
                    {pickfab.stok < 25 ?
                    <TableCell style={{backgroundColor:'salmon',color:'white'}}>{pickfab.stok} set</TableCell>
                    :
                    <TableCell>{pickfab.stok} set</TableCell>}
                    <TableCell>{pickfab.terjual}</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div className='d-flex' style={{marginTop:20,marginBottom:40}}>
            <div style={{width:'60%'}}>
                <div className='d-flex'>
                    <div className='my-2' style={{fontSize:25}}>Most Popular Models</div>
                    <div className='ml-auto my-2 mr-3' style={{width:'10%'}}>
                        <FormControl style={{width:'100%'}}>
                            <TextField fullWidth type='number' name="limit" onChange={handle1} defaultValue={limit} label='Limit' />
                        </FormControl>
                    </div>
                    <div className='my-2 mr-2' style={{width:'20%'}}>
                        <FormControl  style={{width:'100%'}}>
                            <InputLabel>Order by</InputLabel>
                            <Select name="sort" open={opensort} onClose={()=>{setopensort(false)}} onOpen={()=>{setopensort(true)}} onChange={handle} value={sort} >
                                <MenuItem value={'terjual'}>sell count</MenuItem>
                                <MenuItem value={'dilihat'}>seen</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <TableContainer component={Paper} elevation={6}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:'bold'}}>Pict</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                                <TableCell align='right' style={{fontWeight:'bold'}}>Price</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Category</TableCell>
                                <TableCell align='right' style={{fontWeight:'bold'}}>Sell</TableCell>
                                <TableCell align='right' style={{fontWeight:'bold'}}>Seen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rensellmod()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='ml-4'>
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