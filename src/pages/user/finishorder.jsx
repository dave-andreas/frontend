import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {apiurl} from '../../helper/apiurl'
import Header from '../../components/header'

import {Paper,Button,CardMedia,TextField} from '@material-ui/core'


function Finishorder () {
    const [order,setorder] = useState({})
    const [detil,setdetil] = useState([])
    const [komen,setkomen] = useState([])

    useEffect (()=>{
        Axios.get(`${apiurl}/user/finishorder?id=${localStorage.getItem('orderid')}&userid=${localStorage.getItem('id')}`)
        .then(res=>{
            console.log(res.data)
            setorder(res.data.order[0])
            setdetil(res.data.detil)
            setkomen(res.data.komen)
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
                        <div className='ml-4 mb-2'>
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

    const [data,setdata] = useState({})
    const [warn,setwarn] = useState('')
    const handler = e => {
        const {name,value} = e.target
        setdata({...data, [name]:value, modelid:detil[0].modelid, userid:localStorage.getItem('id'), orderid:localStorage.getItem('orderid')})
        console.log(data)
    }
    const submit = () => {
        if (data.komen) {
            Axios.post(`${apiurl}/user/addkomen`,data)
            .then(res=>{
                console.log(res.data)
                setkomen(res.data)
                setwarn('')
            }).catch(err=>{
                console.log(err)
            })
        } else {
            setwarn('you dont type a comment yet')
        }
    }

    return (
        <div>
            <Header/>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column align-items-end' style={{marginTop:20,width:'40%'}}>
                    <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                        <div className='m-3 pl-2' style={{borderBottom:'1px dashed',fontSize:25}}>Did you get your order ?</div>
                        <div className='d-flex mb-3'>
                            <div className='ml-4' style={{width:'20%'}}>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={order.buktibayar ? `${apiurl}/${order.buktibayar}` :'notfoun'}/>
                            </div>
                            <div className='ml-4'>
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
                        komen.length ? 
                        <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                            <div className='m-3' style={{fontSize:25}}>You already have a comment on this</div>
                            <div className='mx-3 mb-3' style={{border:'solid 1px #d1cada'}} />
                            <div className='m-3'><strong>you</strong> {komen[0].komen}</div>
                        </Paper>
                        :
                        <Paper elevation={5} className='mb-3' style={{width:'100%'}}>
                            <div className='m-3' style={{fontSize:25}}>How do you feel ?</div>
                            <div className='m-3'>
                                <TextField variant='outlined' label="Give us a nice comment :)" multiline rows="4" placeholder="type here" fullWidth
                                name='komen' onChange={handler} />
                            </div>
                            <div className='d-flex justify-content-end m-3 align-items-center'>
                                <div className='mr-2' style={{fontSize:12,color:'red'}}>{warn}</div>
                                <Button variant='contained' color='primary' size='small' onClick={()=>submit()}>Submit</Button>
                            </div>
                        </Paper>
                    :null}
                </div>
            </div>
        </div>
    )
}

export default Finishorder