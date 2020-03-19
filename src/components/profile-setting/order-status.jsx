import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import { apiurl } from '../../helper/apiurl'

import {Paper,CardMedia,IconButton,Button,Snackbar,Slide} from '@material-ui/core'
import {Modal,ModalHeader,ModalBody,ModalFooter,CustomInput} from 'reactstrap'

import mandiri from '../../gambar/logo-mandiri.png'
import bca from '../../gambar/logo-bca.png'
import bri from '../../gambar/logo-bri.png'

function orderstat (stat) {
    switch (stat) {
        case 0 : return 'not yet paid'
        case 1 : return 'waiting for payment confirmation'
        case 2 : return 'payment confirmed'
        case 3 : return 'clothes are being made'
        case 4 : return 'clothes are already completed'
        case 5 : return 'being sent'
        case 6 : return 'wait for user confirmation'
        case 7 : return 'order completed'
    }
}

function Orderstatus () {
    const [order,setorder] = useState([])

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
    const [harga,setharga] = useState(0)
    const open = (index) => {
        setmodupl(!modupl)
        setharga(order[index].totharga)
    }

    const renorder = () => {
        return order.map((order,index)=>{
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
                        <IconButton className='mt-auto' style={{fontSize:13}} onClick={()=>open(index)}>
                            <div style={{color:'grey',margin:-10}} >{orderstat(order.statusorder)}</div>
                        </IconButton>
                    </div>
                </Paper>
            )
        })
    }

    return (
        <div style={{marginTop:30,marginBottom:50,marginLeft:'10%',marginRight:'10%'}}>
            <Modal isOpen={modupl} toggle={()=>setmodupl(!modupl)}>
                <ModalHeader>
                    Upload the bill
                </ModalHeader>
                <ModalBody>
                    <div className='mx-2'>
                        Your order should be complete by transfering <strong>Rp {harga}</strong> to :
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
                        <CustomInput className='mt-3' type="file" id="image" name="customFile" />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant='contained' color='primary'>Upload</Button>
                </ModalFooter>
            </Modal>
            <div style={{fontSize:25}}>YOUR TRANSACTION</div>
            {renorder()}
        </div>
    )
}

export default Orderstatus