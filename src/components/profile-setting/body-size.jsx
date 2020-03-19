import React,{useEffect,useState} from 'react';
import './profile-setting.css'
import Axios from 'axios'
import {apiurl} from '../../helper/apiurl'
import {Paper,Table,TableHead,TableBody,TableRow,TableCell,IconButton,Button} from '@material-ui/core'
import {Info,Edit,Delete} from '@material-ui/icons'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'


function Bodysize () {
    const [boze,setboze] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/user/getboze/${localStorage.getItem('id')}`)
        .then(res=>{
            console.log(res.data)
            setboze(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const [modil,setmodil] = useState(false)
    const [detil,setdetil] = useState({})
    const opendetil = (i) => {
        setdetil(boze[i])
        setmodil(!modil)
    }


    const [modit,setmodit] = useState(false)
    const [data,setdata] = useState({})
    const openedit = (i) => {
        setdata(boze[i])
        setmodit(!modit)
    }
    const handle = e => {
        const {name,value} = e.target
        setdata({...data,[name]:value})
        console.log(data)
    }
    const save = () => {
        Axios.put(`${apiurl}/user/editboze`,data)
        .then(res=>{
            setboze(res.data)
            setmodit(!modit)
        }).catch(err=>{
            console.log(err)
        })
    }


    const [modad,setmodad] = useState(false)
    const [dataadd,setdataadd] = useState({userid:localStorage.getItem('id')})
    const [warn,setwarn] = useState('')
    const handleadd = e => {
        const {name,value} = e.target
        setdataadd({...dataadd,[name]:value})
        console.log(dataadd)
    }
    const add = () => {
        const {name,lingping,lingba,leda,tule,panmu,linggul,panpung,lepun,leba,kele,panle,lule} = dataadd
        if ( name && lingping && lingba && leda && tule && panmu && linggul && panpung && lepun && leba && kele && panle && lule) {
            setwarn('')
            Axios.post(`${apiurl}/user/addboze`,dataadd)
            .then(res=>{
                setboze(res.data)
                setmodad(!modad)
            }).catch(err=>{
                console.log(err)
            })
        } else {
            setwarn('your data is not complete')
        }
    }


    const [modelt,setmodelt] = useState(false)
    const [iddelt,setiddelt] = useState(0)
    const opendelt = (id) => {
        setiddelt(id)
        setmodelt(!modelt)
    }
    const delt = () => {
        Axios.put(`${apiurl}/user/delboze?id=${iddelt}&userid=${localStorage.getItem('id')}`)
        .then(res=>{
            setboze(res.data)
            setmodelt(!modelt)
        }).catch(err=>{
            console.log(err)
        })
    }


    const renderboze = () => {
        return boze.map((boze,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{boze.name}</TableCell>
                    <TableCell style={{width:'20%'}}>
                        <IconButton onClick={()=>opendetil(index)}>
                            <Info/>
                        </IconButton>
                    </TableCell>
                    <TableCell style={{width:'20%'}}>
                        <IconButton onClick={()=>openedit(index)}>
                            <Edit/>
                        </IconButton>
                        <IconButton onClick={()=>opendelt(boze.id)}>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div style={{paddingLeft:'15%',paddingRight:'20%',marginTop:80}}>
            <Modal isOpen={modil} toggle={()=>setmodil(!modil)} size='sm'>
                <ModalHeader>
                    '{detil.name}' detil size
                </ModalHeader>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <div className='m-2'>
                            Lingkar Pinggang<br/>
                            Lingkar Badan<br/>
                            Lebar Dada<br/>
                            Turun Leher<br/>
                            Panjang Muka<br/>
                            Lingkar Pinggul<br/>
                            Panjang Punggung<br/>
                            Lebar Pundak<br/>
                            Lebar Bahu<br/>
                            Kerung Lengan<br/>
                            Panjang Lengan<br/>
                            Lubang Lengan<br/>
                        </div>
                        <div className='m-2'>
                            {detil.lingping} cm<br/>
                            {detil.lingba} cm<br/>
                            {detil.leda} cm<br/>
                            {detil.tule} cm<br/>
                            {detil.panmu} cm<br/>
                            {detil.linggul} cm<br/>
                            {detil.panpung} cm<br/>
                            {detil.lepun} cm<br/>
                            {detil.leba} cm<br/>
                            {detil.kele} cm<br/>
                            {detil.panle} cm<br/>
                            {detil.lule} cm<br/>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={modit} toggle={()=>setmodit(!modit)} scrollable={true}>
                <ModalHeader>
                    Edit '{data.name}' size
                </ModalHeader>
                <ModalBody>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Size Name</div>
                        <input className='form-control' type='text' defaultValue={data.name} onChange={handle} name='name' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lingkar Pinggang</div>
                        <input className='form-control' type='number' defaultValue={data.lingping} onChange={handle} name='lingping' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lingkar Badan</div>
                        <input className='form-control' type='number' defaultValue={data.lingba} onChange={handle} name='lingba' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lebar Dada</div>
                        <input className='form-control' type='number' defaultValue={data.leda} onChange={handle} name='leda' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Turun Leher</div>
                        <input className='form-control' type='number' defaultValue={data.tule} onChange={handle} name='tule' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Panjang Muka</div>
                        <input className='form-control' type='number' defaultValue={data.panmu} onChange={handle} name='panmu' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lingkar Pinggul</div>
                        <input className='form-control' type='number' defaultValue={data.linggul} onChange={handle} name='linggul' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Panjang Punggung</div>
                        <input className='form-control' type='number' defaultValue={data.panpung} onChange={handle} name='panpung' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lebar Pundak</div>
                        <input className='form-control' type='number' defaultValue={data.lepun} onChange={handle} name='lepun' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lebar Bahu</div>
                        <input className='form-control' type='number' defaultValue={data.leba} onChange={handle} name='leba' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Kerung Lengan</div>
                        <input className='form-control' type='number' defaultValue={data.kele} onChange={handle} name='kele' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Panjang Lengan</div>
                        <input className='form-control' type='number' defaultValue={data.panle} onChange={handle} name='panle' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lubang Lengan</div>
                        <input className='form-control' type='number' defaultValue={data.lule} onChange={handle} name='lule' style={{width:'40%'}} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant='contained' color='primary' onClick={()=>save()}>Save</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modad} toggle={()=>setmodad(!modad)}>
                <ModalHeader>Add New Size</ModalHeader>
                <ModalBody>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Size Name</div>
                        <input className='form-control' type='text' onChange={handleadd} name='name' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lingkar Pinggang</div>
                        <input className='form-control' type='number' onChange={handleadd} name='lingping' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lingkar Badan</div>
                        <input className='form-control' type='number' onChange={handleadd} name='lingba' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lebar Dada</div>
                        <input className='form-control' type='number' onChange={handleadd} name='leda' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Turun Leher</div>
                        <input className='form-control' type='number' onChange={handleadd} name='tule' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Panjang Muka</div>
                        <input className='form-control' type='number' onChange={handleadd} name='panmu' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lingkar Pinggul</div>
                        <input className='form-control' type='number' onChange={handleadd} name='linggul' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Panjang Punggung</div>
                        <input className='form-control' type='number' onChange={handleadd} name='panpung' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lebar Pundak</div>
                        <input className='form-control' type='number' onChange={handleadd} name='lepun' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lebar Bahu</div>
                        <input className='form-control' type='number' onChange={handleadd} name='leba' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Kerung Lengan</div>
                        <input className='form-control' type='number' onChange={handleadd} name='kele' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Panjang Lengan</div>
                        <input className='form-control' type='number' onChange={handleadd} name='panle' style={{width:'40%'}} />
                    </div>
                    <div className='d-flex justify-content-between align-items-center px-5'>
                        <div>Lubang Lengan</div>
                        <input className='form-control' type='number' onChange={handleadd} name='lule' style={{width:'40%'}} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='mr-auto' style={{color:'red'}}>{warn}</div>
                    <Button variant='contained' color='primary' onClick={()=>add()}>Add</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modelt} toggle={()=>setmodelt(!modelt)} size='sm'>
                <ModalHeader>You sure ?</ModalHeader>
                <ModalFooter>
                    <Button className='mx-2' variant='contained' color='primary' onClick={()=>setmodelt(!modelt)}>Nope</Button>
                    <Button variant='contained' color='secondary' onClick={()=>delt()}>Sure</Button>
                </ModalFooter>
            </Modal>
            <Paper elevation={5}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>no.</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Detil</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderboze()}
                    </TableBody>
                </Table>
            </Paper>
            <Button className='mt-4' variant='contained' color='primary' onClick={()=>setmodad(!modad)}>add new</Button>
        </div>
    )
}

export default Bodysize