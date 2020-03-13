import React from 'react';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom'

import { apiurl } from '../../helper/apiurl';

import {Card,CardActionArea,CardContent,CardMedia,IconButton,Button,GridList} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

function AdmModels () {
    const [models,setmodels] = useState([])
    const [kategori,setkategori] = useState([])
    const [cat,setcat] = useState(0)
    const [index,setindex] = useState()
    const [data,setdata] = useState({})
    const [modadd,setmodadd] = useState (false)
    const [moddlt,setmoddlt] = useState (false)
    const [delid,setdelid] = useState ()
    const [msg,setmsg] = useState('')

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/getmod`)
        .then(res=>{
            setmodels(res.data)
            Axios.get(`${apiurl}/admin/getkat`)
            .then(res=>{
                setkategori(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const openmoddlt =(index,id)=>{
        setindex(index)
        setdelid(id)
        setmoddlt(!moddlt)
    }

    const rendermaterial =()=>{
        if(cat===0){// buat nanti kalo mau liat perkategori
            return models.map((val,index)=>{
                return (
                    <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                        <CardActionArea onClick={()=>localStorage.setItem('modelid',val.id)}>
                            <Link to={{pathname:'/editmodel',id:val.id}}>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path} />
                            </Link>
                        </CardActionArea>
                        <CardContent>
                            <div>
                                <h5 className='card-title' style={{fontSize:'13px'}}>{val.name}</h5>
                            </div>
                            <div className='d-flex'>
                                <div>
                                    {/* biar ke kanan */}
                                </div>
                                <div style={{marginLeft:'auto',marginBottom:-23,marginRight:-15,marginTop:-10}}>
                                    <IconButton onClick={()=>localStorage.setItem('modelid',val.id)} component={Link} to={{pathname:'/editmodel',id:val.id}}>
                                        <EditIcon style={{fontSize:'20'}} />
                                    </IconButton>
                                    <IconButton onClick={()=>openmoddlt(index,val.id)}>
                                        <DeleteIcon style={{fontSize:'20'}} />
                                    </IconButton>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })
        }else{
            return models.map((val,index)=>{
                if(val.kategoriid===cat){
                    return (
                        <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                            <CardActionArea>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path} />
                            </CardActionArea>
                            <CardContent>
                                <div>
                                    <h5 className='card-title' style={{fontSize:'13px'}}>{val.name}</h5>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        {/* biar ke kanan */}
                                    </div>
                                    <div style={{marginLeft:'auto',marginBottom:-23,marginRight:-15,marginTop:-10}}>
                                        <IconButton>
                                            <EditIcon style={{fontSize:'20'}} />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon style={{fontSize:'20'}} />
                                        </IconButton>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }
            })
        }
    }

    const renkat =()=>{
        return kategori.map((val,index)=>{
            return <option key={index} value={val.id}>{val.name}</option>
        })
    }

    const handler = e =>{
        const {name,value} = e.target
        setdata({...data,[name]:value})
        console.log(data)
    }

    const addnew =()=>{
        Axios.post(`${apiurl}/admin/addmod`, data)
        .then(res=>{
            if(res.data.length>1){
                setmodels(res.data)
                setmsg('')
                setmodadd(!modadd)
            }else{
                setmsg(res.data.message)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const remove =()=>{
        Axios.get(`${apiurl}/admin/delmod/${delid}`)
        .then(res=>{
            setindex(0) // ini diatas jadi ga error
            setmodels(res.data)
            setmoddlt(!moddlt)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>

            <Modal isOpen={modadd} toggle={()=>setmodadd(!modadd)}>
                <ModalBody>
                    <input className='form-control' type='text' onChange={handler} name='name' placeholder='Nama model' style={{width:'100%', marginBottom:20}} />
                    <input className='form-control' type='text' onChange={handler} name='desk' placeholder='Deskripsi model' style={{width:'100%', marginBottom:20}} />
                    <input className='form-control' type='number' onChange={handler} name='harga' placeholder='Harga jahit' style={{width:'100%', marginBottom:20}} />
                    <select className='form-control' onChange={handler} name='kategoriid' style={{width:'100%', marginBottom:20}} >
                        {renkat()}
                    </select>
                    <div style={{width:70}} className='mx-2'>
                        <IconButton>
                            <AddIcon style={{fontSize:90,margin:-13}} />
                        </IconButton>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div style={{marginRight:30,color:'red',fontSize:'12px'}}>
                        {msg}
                    </div>
                    <Button variant='contained' color='primary' onClick={()=>addnew()}>add new</Button>
                </ModalFooter>
            </Modal>

            {index >= 0 ?
                <Modal isOpen={moddlt} toggle={()=>setmoddlt(!moddlt)}>
                    <ModalHeader>Delete {models[index].name}</ModalHeader>
                    <ModalBody>Are you sure want to delete this colection ?</ModalBody>
                    <ModalFooter>
                        <Button className='mx-2' variant='contained' color='primary' onClick={()=>remove()}>Sure</Button>
                        <Button variant='contained' color='secondary' onClick={()=>setmoddlt(!moddlt)}>Nope</Button>
                    </ModalFooter>
                </Modal>
            :null}

            <div style={{marginTop:90}}>
                <div style={{fontSize:'25px',marginBottom:25,marginLeft:50}}>
                    MANAGE MODELS
                </div>
                <div className='row' style={{marginLeft:50,marginRight:0,overflow:'hidden'}}>
                    <GridList cellHeight={335} style={{height:509}}>
                    {rendermaterial()}
                    <Card elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                        <CardActionArea onClick={()=>setmodadd(!modadd)}>
                            <AddIcon style={{fontSize:200}} />
                        </CardActionArea>
                        <CardContent>
                            <div>
                                <h5 className='card-title' style={{fontSize:'13px'}}>Add New</h5>
                            </div>
                            <div className='d-flex'>
                                <div>
                                    {/* biar ke kanan */}
                                </div>
                                <div style={{marginLeft:'auto',marginBottom:-23,marginRight:-15,marginTop:-10}}>
                                    <IconButton onClick={()=>setmodadd(!modadd)}>
                                        <AddCircleIcon style={{fontSize:'20'}} />
                                    </IconButton>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </GridList>
                </div>
            </div>
        </div>
    )
}

export default AdmModels