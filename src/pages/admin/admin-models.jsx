import React from 'react';
import Header from '../../components/header';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import { apiurl } from '../../helper/apiurl';

import {Card,CardActionArea,CardActions,CardContent,CardMedia,IconButton,Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

function AdmModels () {
    const [models,setmodels] = useState([])
    const [kategori,setkategori] = useState([])
    const [cat,setcat] = useState(0)

    const [modal,setmodal] = useState(false)
    const [index,setindex] = useState()
    const [editgmb,seteditgmb] = useState([])

    const [data,setdata] = useState({})

    const [modadd,setmodadd] = useState (false)

    const [moddlt,setmoddlt] = useState (false)
    const [delid,setdelid] = useState ()

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

    const openmodal =(index,id)=>{
        setdata(models[index])
        console.log(data)
        setmodal(!modal)
        setindex(index)
        Axios.get(`${apiurl}/admin/getgmb/${id}`)
        .then(res=>{
            seteditgmb(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

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
                        <CardActionArea onClick={()=>openmodal(index,val.id)}>
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
                                    <IconButton onClick={()=>openmodal(index,val.id)}>
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
                            <CardActionArea onClick={()=>openmodal(index,val.id)}>
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

    const imgedit =()=>{
        if(index >= 0){
            return editgmb.map((val,index)=>{
                return (
                    <div key={index} style={{width:70}} className='mx-2'>
                        <CardMedia style={{height:0,paddingTop:'130%',borderRadius:'6px'}} image={val.path} />
                    </div>
                )
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
            setmodels(res.data)
            setmodadd(!modadd)
        }).catch(err=>{
            console.log(err)
        })
    }

    const remove =()=>{
        Axios.get(`${apiurl}/admin/delmod/${delid}`)
        .then(res=>{
            setindex(0)// ini diatas jadi ga error
            setmodels(res.data)
            setmoddlt(!moddlt)
        }).catch(err=>{
            console.log(err)
        })
    }

    const save =()=>{
        Axios.put(`${apiurl}/admin/editmod`, data)
        .then(res=>{
            setmodels(res.data)
            setmodal(!modal)
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Header/>
            {index >= 0 ? 
                <Modal isOpen={modal} toggle={()=>setmodal(!modal)}>
                    <ModalBody>
                        <input className='form-control' type='text' defaultValue={models[index].name} onChange={handler} name='name' placeholder='Nama model' style={{width:'100%', marginBottom:20}} />
                        <input className='form-control' type='text' defaultValue={models[index].desc} onChange={handler} name='desc' placeholder='Deskripsi model' style={{width:'100%', marginBottom:20}} />
                        <input className='form-control' type='number' defaultValue={models[index].harga} onChange={handler} name='harga' placeholder='Harga jahit' style={{width:'100%', marginBottom:20}} />
                        <select className='form-control' defaultValue={models[index].kategoriid} onChange={handler} name='kategoriid' style={{width:'100%', marginBottom:20}} >
                            {renkat()}
                        </select>
                        <div className='d-flex'>
                            {imgedit()}
                            <div style={{width:70}} className='mx-2'>
                                <AddIcon style={{fontSize:90}} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='contained' color='primary' onClick={()=>save()}>Save</Button>
                    </ModalFooter>
                </Modal>
            : null}
            <Modal isOpen={modadd} toggle={()=>setmodadd(!modadd)}>
                <ModalBody>
                    <input className='form-control' type='text' onChange={handler} name='name' placeholder='Nama model' style={{width:'100%', marginBottom:20}} />
                    <input className='form-control' type='text' onChange={handler} name='desc' placeholder='Deskripsi model' style={{width:'100%', marginBottom:20}} />
                    <input className='form-control' type='number' onChange={handler} name='harga' placeholder='Harga jahit' style={{width:'100%', marginBottom:20}} />
                    <select className='form-control' onChange={handler} name='kategoriid' style={{width:'100%', marginBottom:20}} >
                        {renkat()}
                    </select>
                    <div style={{width:70}} className='mx-2'>
                        <AddIcon style={{fontSize:90}} />
                    </div>
                </ModalBody>
                <ModalFooter>
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
            <div style={{marginTop:'100px'}}>
                <center>
                    <div style={{fontSize:'25px',marginBottom:'50px'}}>
                        MANAGE MODELS
                    </div>
                </center>
                <div className='row' style={{marginLeft:'200px',marginRight:'200px'}}>
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
                </div>
            </div>
        </div>
    )
}

export default AdmModels