import React, {useEffect,useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios'
import {apiurl} from '../../helper/apiurl'
import Header from '../../components/header'

import {Paper,Button,IconButton,CardMedia,CardActionArea} from '@material-ui/core'
import {Info,Edit} from '@material-ui/icons'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

function Orderdetil () {
    const [order,setorder] = useState({})
    const [detil,setdetil] = useState([])

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/orderdetil/${localStorage.getItem('orderid')}`)
        .then(res=>{
            console.log(res.data)
            setorder(res.data.order[0])
            setdetil(res.data.detil)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const statordit = (stat) => {
        switch (stat) {
            case -1 : return 'canceled'
            case 0 : return 'not yet paid'
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

    const renlist = () => {
        return detil.map((detil,index)=>{
            return (
                <div className='ml-2 mb-2' key={index}>
                    <div>
                        <em style={{fontWeight:'bold'}}>{detil.model.toUpperCase()}</em><code> with </code><strong>{detil.warna} {detil.bahan}</strong>
                    </div>
                    <div style={{fontSize:13}}>
                        size '{detil.name}'<IconButton onClick={()=>openmodiz(index)}><Info style={{fontSize:15}} /></IconButton> ; {detil.jumlah} set
                    </div>
                </div>
            )
        })
    }

    const [modim,setmodim] = useState(false)
    const [modiz,setmodiz] = useState(false)
    const [detil1,setdetil1] = useState({})
    const openmodiz = (index) => {
        setmodiz(!modiz)
        setdetil1(detil[index])
    }

    const [modstat,setmodstat] = useState(false)
    const [data,setdata] = useState({
        orderid:localStorage.getItem('orderid'),
        statusorder:order.statusorder
    })
    const handlestat = e => {
        setdata({...data, statusorder:e.target.value})
        console.log(data)
    }
    const savestat = () => {
        Axios.post(`${apiurl}/admin/orderstat`,data)
        .then(res=>{
            setorder(res.data[0])
            setmodstat(!modstat)
        }).catch(err=>{
            console.log(err)
        })
    }

    if(!(localStorage.getItem('orderid'))){
        return (
            <Redirect to={{pathname:'/main'}} />
        )
    }

    return (
        <div>
            <Modal isOpen={modim} toggle={()=>setmodim(!modim)} size='lg'>
                <ModalBody>
                    <CardMedia style={{height:0,paddingTop:'100%'}} image={order.buktibayar ? `${apiurl}/${order.buktibayar}` :null} />
                </ModalBody>
            </Modal>
            <Modal isOpen={modiz} toggle={()=>setmodiz(!modiz)} size='sm'>
                <ModalHeader>Detail size <strong>`{detil1.name}`</strong></ModalHeader>
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
                            {detil1.lingping} cm<br/>
                            {detil1.lingba} cm<br/>
                            {detil1.leda} cm<br/>
                            {detil1.tule} cm<br/>
                            {detil1.panmu} cm<br/>
                            {detil1.linggul} cm<br/>
                            {detil1.panpung} cm<br/>
                            {detil1.lepun} cm<br/>
                            {detil1.leba} cm<br/>
                            {detil1.kele} cm<br/>
                            {detil1.panle} cm<br/>
                            {detil1.lule} cm<br/>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            <Modal isOpen={modstat} toggle={()=>setmodstat(!modstat)}>
                <ModalHeader>Change Order Status</ModalHeader>
                <ModalBody>
                    <div className='mx-3 mb-3'>
                        put -1 : 'canceled' <br/>
                        put 0 : 'not yet paid' <br/>
                        put 1 : 'waiting for payment confirmation' <br/>
                        put 2 : 'payment confirmed' <br/>
                        put 3 : 'clothes are being made' <br/>
                        put 4 : 'clothes are already completed' <br/>
                        put 5 : 'being sent' <br/>
                        put 6 : 'wait for user confirmation' *for user <br/>
                        put 7 : 'order completed' *for user
                    </div>
                    <input className='form-control' type='number' defaultValue={order.statusorder} placeholder='put between 1 to 7' onChange={handlestat} />
                </ModalBody>
                <ModalFooter>
                    <Button variant='contained' color='primary' onClick={()=>savestat()} disabled={data.statusorder > 6 || data.statusorder < -1 ? true : false}>save</Button>
                </ModalFooter>
            </Modal>
            <Header/>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column align-items-end' style={{marginTop:20,width:'40%'}}>
                    <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                        <div className='m-3 pl-2' style={{borderBottom:'1px dashed',fontSize:30}}>Order Detail from '{order.username}'</div>
                        <div className='d-flex mb-3'>
                            <CardActionArea className='ml-4' style={{width:'25%'}} onClick={()=>setmodim(!modim)}>
                                {order.buktibayar ? 
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={order.buktibayar ? `${apiurl}/${order.buktibayar}` :null}/>
                                :
                                <div style={{color:'red'}}>not posted yet</div>}
                            </CardActionArea>
                            <div className='ml-3 MT-2'>
                                <div className='mb-2'>
                                    <div style={{fontSize:11}}>ORDER DATE :</div>
                                    <strong>{order.tanggalorder}</strong>
                                </div>
                                <div className='mb-2'>
                                    <div style={{fontSize:11}}>PAYMENT DATE :</div>
                                    <strong>{order.tanggalbayar}</strong>
                                </div>
                                <div className='mb-2'>
                                    <div style={{fontSize:11}}>ORDER STATUS :</div>
                                    <div className='d-flex'>
                                        <em>{statordit(order.statusorder)}</em>
                                        <IconButton className='ml-auto' style={{marginTop:-7}} onClick={()=>setmodstat(!modstat)}>
                                            <Edit style={{fontSize:15}} />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <div style={{fontSize:11}}>SHIPPING ADDRESS :</div>
                                    <div>{order.alamat}</div>
                                </div>
                            </div>
                        </div>
                        <div className='ml-4'>
                            <div>Order List :</div>
                            {renlist()}
                        </div>
                    </Paper>
                    <Button variant='contained' color='inherit' component={Link} to={'/main'} onClick={()=>localStorage.removeItem('orderid')}>Back to dashboard</Button>
                    <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                        <div className='m-3' style={{fontSize:25}}>User's Review</div>
                        <div className='mx-3 mb-3' style={{border:'solid 1px #d1cada'}} />
                        {order.komen ? 
                        <div className='m-3'><strong>{order.username}</strong> {order.komen}</div>
                        : <div className='m-3'>no comment yet</div> }
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Orderdetil