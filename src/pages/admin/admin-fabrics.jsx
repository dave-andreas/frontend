import React from 'react';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import { apiurl } from '../../helper/apiurl';

import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button} from '@material-ui/core'
import {Edit, Delete} from '@material-ui/icons'

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

function AdmFabrics () {
    const [fabrics,setfabrics] = useState ([])

    const [modedit,setmodedit] = useState (false)
    const [idxedit,setidxedit] = useState ()
    const [data,setdata] = useState ({})

    const [moddel,setmoddel] = useState (false)
    const [idxdel,setidxdel] = useState ()

    const [dataadd,setdataadd] = useState ({})

    const [msg,setmsg] = useState('')

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getfab`)
        .then(res=>{
            // console.log(res.data)
            setfabrics(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const [cari,setcari] = useState('')
    const handle = e => {
        setcari(e.target.value)
    }
    useEffect (()=>{
        Axios.get(`${apiurl}/admin/carifab?cari=${cari}`)
        .then(res=>{
            // console.log(res.data)
            setfabrics(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[cari])

    const rendertab =()=>{
        return fabrics.map((val,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.name}</TableCell>
                    <TableCell align='right'>Rp. {val.harga}</TableCell>
                    {val.stok < 25 ?
                    <TableCell align='center' style={{color:'white',backgroundColor:'salmon'}}>{val.stok}</TableCell>
                    :
                    <TableCell align='center'>{val.stok}</TableCell>
                    }
                    <TableCell align='center'>
                        <IconButton onClick={()=>openedit(index)}>
                            <Edit/>
                        </IconButton>
                        <IconButton onClick={()=>opendel(index)}>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    const openedit =(index)=>{
        setidxedit(index)
        setdata(fabrics[index])
        setmodedit(!modedit)
    }

    const handler = e => {
        const {name,value} = e.target
        setdata({...data,[name]:value})
        console.log(data)
    }

    const opendel =(index)=>{
        setidxdel(index)
        setmoddel(!moddel)
    }

    const handleradd = e => {
        const {name,value} = e.target
        setdataadd ({...dataadd,[name]:value})
        console.log(dataadd)
    }

    const addnew =()=>{
        if (!dataadd.name || !dataadd.harga || !dataadd.stok) {
            return setmsg('The form should not be empty')
        }
        Axios.post(`${apiurl}/admin/addfab`, dataadd)
        .then(res=>{
            if(res.data.length>1){
                setfabrics(res.data)
                setmsg('')
                setdataadd({})
            }else{
                setmsg(res.data.message)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const savedit =()=>{
        Axios.put(`${apiurl}/admin/editfab`, data)
        .then(res=>{
            setidxedit(0)
            setfabrics(res.data)
            setmodedit(!modedit)
        }).catch(err=>{
            console.log(err)
        })
    }

    const delet =()=>{
        const {id} = fabrics[idxdel]
        console.log(id)
        Axios.get(`${apiurl}/admin/delfab/${id}`)
        .then(res=>{
            setidxdel(0) // ini diatas jadi ga error
            setfabrics(res.data)
            setmoddel(!moddel)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            {idxedit >= 0 ? 
                <Modal isOpen={modedit} toggle={()=>setmodedit(!modedit)}>
                    <ModalBody>
                        <input className='form-control' type='text' defaultValue={fabrics[idxedit].name} onChange={handler} name='name' placeholder='Fabric Name' style={{width:'100%', marginBottom:20}} />
                        {/* <input className='form-control' type='text' defaultValue={fabrics[idxedit].desk} onChange={handler} name='desk' placeholder='Fabric Description' style={{width:'100%', marginBottom:20}} /> */}
                        <input className='form-control' type='number' defaultValue={fabrics[idxedit].harga} onChange={handler} name='harga' placeholder='Price' style={{width:'100%', marginBottom:20}} />
                        <input className='form-control' type='number' defaultValue={fabrics[idxedit].stok} onChange={handler} name='stok' placeholder='Stock' style={{width:'100%', marginBottom:20}} />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='contained' color='primary' onClick={()=>savedit()}>Save</Button>
                    </ModalFooter>
                </Modal>
            : null}

            {idxdel >=0 ?
                <Modal isOpen={moddel} toggle={()=>setmoddel(!moddel)}>
                    <ModalHeader>Do you want to delete "{fabrics[idxdel].name}" ?</ModalHeader>
                    <ModalFooter>
                        <Button className='mx-2' variant='contained' color='primary' onClick={()=>delet()}>Sure</Button>
                        <Button variant='contained' color='secondary' onClick={()=>setmoddel(!moddel)}>Nope</Button>
                    </ModalFooter>
                </Modal>
            : null}
            
            <div style={{marginTop:90,marginBottom:'100px',paddingRight:100,paddingLeft:100}}>
                <div style={{fontSize:'25px',marginBottom:'20px'}}>
                    MANAGE FABRICS
                </div>
                <input className='form-control mb-2' type='text' placeholder='find fabric ...' onChange={handle} />
                <TableContainer component={Paper} elevation={6}>
                    <Table style={{minWidth:700}} size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:'bold'}}>no.</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                                <TableCell align='right' style={{fontWeight:'bold',width:200}}>Price (/m2)</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold',width:200}}>Stock (m2)</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rendertab()}
                            <TableCell style={{fontWeight:'bold'}}></TableCell>
                            <TableCell style={{fontWeight:'bold'}}>
                                <input className='form-control' type='text' placeholder='Fabric Name' onChange={handleradd} name='name' />
                            </TableCell>
                            <TableCell align='right' style={{fontWeight:'bold'}}>
                                <input className='form-control' type='number' placeholder='Price' onChange={handleradd} name='harga' />
                            </TableCell>
                            <TableCell align='right' style={{fontWeight:'bold'}}>
                                <input className='form-control' type='number' placeholder='Stock' onChange={handleradd} name='stok' />
                            </TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>
                                <Button variant='contained' color='primary' onClick={()=>addnew()}>Add New</Button>
                            </TableCell>
                        </TableBody>
                    </Table>
                </TableContainer>
                <center>
                    <div style={{color:'red'}}>
                        {msg}
                    </div>
                </center>
            </div>
        </div>
    )
}

export default AdmFabrics