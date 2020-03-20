import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import { apiurl } from '../../helper/apiurl'

import {Paper,CardMedia,IconButton,Button,Snackbar,Slide} from '@material-ui/core'
import {Modal,ModalHeader,ModalBody,ModalFooter,CustomInput} from 'reactstrap'

import mandiri from '../../gambar/logo-mandiri.png'
import bca from '../../gambar/logo-bca.png'
import bri from '../../gambar/logo-bri.png'

function Orderstatus () {
    const [order,setorder] = useState([])

    const orderstat = (stat,index) => {
        switch (stat) {
            case 0 : return (
                <IconButton className='mt-auto' style={{fontSize:13}} onClick={()=>open(index)}>
                    <div style={{color:'red',margin:-10,}} >not yet paid</div>
                </IconButton>
            )
            case 1 : return (
                <IconButton className='mt-auto' style={{fontSize:13}} onClick={()=>openordit(index)}>
                    <div style={{color:'grey',margin:-10}} >waiting for payment confirmation</div>
                </IconButton>
            )
            case 2 : return 'payment confirmed'
            case 3 : return 'clothes are being made'
            case 4 : return 'clothes are already completed'
            case 5 : return 'being sent'
            case 6 : return 'wait for user confirmation'
            case 7 : return 'order completed'
            default : return 'something hapend ...'
        }
    }

    useEffect (()=>{
        Axios.get(`${apiurl}/user/getbill/${localStorage.getItem('id')}`)
        .then(res=>{
            console.log(res.data)
            setorder(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const [modupl,setmodupl] = useState(false)
    const [ord,setord] = useState({})
    const open = (index) => {
        setmodupl(!modupl)
        setord(order[index])
    }


    const [imgfile,setimgfile]=useState({})
    const handlefile = event => {
        console.log(event.target.files[0])
        if(event.target.files[0]){
            setimgfile(event.target.files[0])
        }else{
            setimgfile({...imgfile,fileName:'no file selected',file:undefined})
        }
    }
    const saveimg = () => {
        console.log(imgfile)
        const formdata = new FormData()
        formdata.append('image', imgfile)
        formdata.append('userid', localStorage.getItem('id'))
        formdata.append('orderid', ord.id)
        Axios.post(`${apiurl}/user/uplbill`,formdata,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
        .then(res=>{
            console.log(res.data)
            setorder(res.data)
            setmodupl(!modupl)
        }).catch(err=>{
            console.log(err)
        })
    }

    const [modit,setmodit] = useState(false)
    const [ordit,setordit] = useState({})
    const [detil,setdetil] = useState([])
    const openordit = (index) => {
        setordit(order[index])
        setdetil(order[index].detil)
        console.log(ordit)
        setmodit(!modit)
    }
    const statordit = (stat) => {
        switch (stat) {
            case 1 : return 'waiting for payment confirmation'
            case 2 : return 'payment confirmed'
            case 3 : return 'clothes are being made'
            case 4 : return 'clothes are already completed'
            case 5 : return 'being sent'
            case 6 : return 'wait for user confirmation'
            case 7 : return 'order completed'
            default : return 'something hapend ...'
        }
    }
    const renmodit = () => {
        console.log(detil)
        return (
            <ModalBody>
                <div className='d-flex mb-2'>
                    <div className='mx-2' style={{width:'30%'}}>
                        <CardMedia style={{height:0,paddingTop:'130%'}} image={`${apiurl}/${ordit.buktibayar}`} />
                    </div>
                    <div className='mx-2'>
                        <div className='mb-2'>
                            <div style={{fontSize:11}}>ORDER DATE :</div>
                            <strong>{ordit.tanggalorder}</strong>
                        </div>
                        <div className='mb-2'>
                            <div style={{fontSize:11}}>PAYMENT DATE :</div>
                            <strong>{ordit.tanggalbayar}</strong>
                        </div>
                            <div className='mb-2'>
                        <div style={{fontSize:11}}>ORDER STATUS :</div>
                            <em>{statordit(ordit.statusorder)}</em>
                        </div>
                    </div>
                </div>
                <div className='mx-2 mb-3'>
                    <div style={{fontSize:11}}>SHIPPING ADDRESS :</div>
                    {ordit.alamat}
                </div>
                <div className='mx-2 mb-2'>
                    <div style={{fontSize:11}}>PURCHASE DETAILS :</div>
                    {detil.map((detil,index)=>{
                        return (
                            <div className='ml-2 mb-2' key={index}>
                                <div>
                                    <em style={{fontWeight:'bold'}}>{detil.model.toUpperCase()}</em><code> with </code><strong>{detil.warna} {detil.bahan}</strong>
                                </div>
                                <div style={{fontSize:13}}>
                                    size '{detil.size}' , {detil.jumlah} set
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ModalBody>
        )
    }

    const renorder = () => {
        return (
            order.map((order,index)=>{
                return (
                    <Paper className='py-3 px-3 my-4 d-flex' elevation={5} key={index}>
                        <div>
                            {order.detil.map((detil,index)=>{
                                return (
                                    <div className={index === order.detil.length - 1 ? 'mb-0' : 'mb-4'} key={index}>
                                        <div>
                                            <em style={{fontWeight:'bold',fontSize:20}}>{detil.model.toUpperCase()}</em><code> with </code><strong>{detil.warna} {detil.bahan}</strong>
                                        </div>
                                        <div>
                                            size '{detil.size}' , {detil.jumlah} set
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='d-flex flex-column align-items-end ml-auto'>
                            <div style={{fontWeight:'bold'}}>Rp {order.totharga}</div>
                            {orderstat(order.statusorder,index)}
                        </div>
                    </Paper>
                )
            })
        )
    }

    return (
        <div style={{marginTop:30,marginBottom:50,marginLeft:'10%',marginRight:'10%'}}>
            <Modal isOpen={modupl} toggle={()=>setmodupl(!modupl)}>
                <ModalHeader>
                    Upload the bill
                </ModalHeader>
                <ModalBody>
                    <div className='mx-2'>
                        Your order should be complete by transfering <strong>Rp {ord.totharga}</strong> to :
                        <div className='ml-4 mb-5'>
                            <div className='d-flex mt-3 align-items-center'>
                                <div className ='mr-3' style={{width:'16.5%'}}>
                                    <CardMedia style={{height:20}} image={mandiri} />
                                </div>
                                <div>
                                    <div style={{fontWeight:'bold'}}>
                                        Bank Mandiri
                                    </div>
                                    <div>xxxx-xxxx-xxxx-xxxx</div>
                                </div>
                            </div>
                            <div className='d-flex mt-3 align-items-center'>
                                <div className ='mr-3' style={{width:'16.5%'}}>
                                    <CardMedia style={{height:22}} image={bca} />
                                </div>
                                <div>
                                    <div style={{fontWeight:'bold'}}>
                                        Bank BCA
                                    </div>
                                    <div>xxxx-xxxx-xxxx-xxxx</div>
                                </div>
                            </div>
                            <div className='d-flex mt-3 align-items-center'>
                                <div className ='mr-3' style={{width:'16.5%'}}>
                                    <CardMedia style={{height:17}} image={bri} />
                                </div>
                                <div>
                                    <div style={{fontWeight:'bold'}}>
                                        Bank BRI
                                    </div>
                                    <div>xxxx-xxxx-xxxx-xxxx</div>
                                </div>
                            </div>
                        </div>
                        Then, upload the bill down here ...
                        <CustomInput className='mt-3' type="file" id="image" name="customFile" onChange={handlefile} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant='contained' color='primary' onClick={()=>saveimg()}>Upload</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modit} toggle={()=>setmodit(!modit)}>
                <ModalHeader>Detil Transaction</ModalHeader>
                {renmodit()}
                <ModalFooter>
                    <div style={{fontSize:11}}>TOTAL </div><strong>Rp {ordit.totharga}</strong>
                </ModalFooter>
            </Modal>
            <div style={{fontSize:25}}>YOUR TRANSACTION</div>
            {renorder()}
        </div>
    )
}

export default Orderstatus