import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {apiurl} from '../../helper/apiurl'
import Header from '../../components/header'

import {Paper,Button,CardMedia,TextField} from '@material-ui/core'


function Finishorder () {
    const [order,setorder] = useState({})
    const [detil,setdetil] = useState([])

    useEffect (()=>{
        Axios.get(`${apiurl}/user/finishorder/${localStorage.getItem('orderid')}`)
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

    const confirm = () => {
        // console.log(localStorage.getItem('orderid'),7)
        // setorder({...order,statusorder:7})
        Axios.post(`${apiurl}/user/confirm?orderid=${localStorage.getItem('orderid')}&statusorder=7`)
        .then(res=>{
            setorder(res.data.order[0])
            setdetil(res.data.detil)
        }).catch(err=>{
            console.log(err)
        })
    }

    const renlist = () => {
        return detil.map((detil,index)=>{
            return (
                <div className='d-flex my-2' key={index}>
                    <div style={{width:'20%'}}>
                        <CardMedia style={{height:0,paddingTop:'130%'}} image={detil.path ? (detil.path[0] === 'p' ? `${apiurl}/${detil.path}` :detil.path) : `null`}/>
                    </div>
                    <div>
                        <div className='ml-2 mb-2'>
                            <div>
                                <em style={{fontWeight:'bold'}}>{detil.model.toUpperCase()}</em><code> with </code><strong>{detil.warna} {detil.bahan}</strong>
                            </div>
                            <div style={{fontSize:13}}>
                                size '{detil.size}' ; {detil.jumlah} set
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <Header/>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column align-items-end' style={{marginTop:100,width:'40%'}}>
                    <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                        <div className='m-3 pl-2' style={{borderBottom:'1px dashed',fontSize:25}}>Did you get your order ?</div>
                        <div className='d-flex mb-3'>
                            <div className='ml-4' style={{width:'20%'}}>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={order.buktibayar ? `${apiurl}/${order.buktibayar}` :'notfoun'}/>
                            </div>
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
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <div style={{fontSize:11}}>SHIPPING ADDRESS :</div>
                                    <div>{order.alamat}</div>
                                </div>
                            </div>
                        </div>
                        <div className='ml-4 mb-3'>
                            <div>Order List :</div>
                            {renlist()}
                        </div>
                    </Paper>
                    <div className='d-flex mb-3'>
                        <Button className='mx-1' variant='contained' color='inherit' component={Link} to={'/profile'} onClick={()=>localStorage.removeItem('orderid')}>Back to dashboard</Button>
                        {order.statusorder === 6 ? 
                        <div>
                            <Button className='mx-1' variant='contained' color='secondary' component={Link} to={'/profile'} onClick={()=>localStorage.removeItem('orderid')}>Not Yet</Button>
                            <Button className='mx-1' variant='contained' color='primary' onClick={()=>confirm()}>I got it</Button>
                        </div>
                        :null}
                    </div>
                    {order.statusorder === 7 ?
                    <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                        <div className='d-flex px-2'>
                            <div className='m-2' style={{fontSize:25}}>How do you feel ?</div>
                            <Button className='ml-auto'>Submit</Button>
                        </div>
                        <div className='m-3'>
                            <TextField variant='outlined' label="Give us a nice comment :)" multiline rows="4" placeholder="type here" style={{widt:'100%'}} fullWidth />
                        </div>
                    </Paper>
                    :null}
                </div>
            </div>
        </div>
    )
}

export default Finishorder