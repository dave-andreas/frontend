import React, {useEffect,useState} from 'react'
import Axios from 'axios'
import {apiurl} from '../../helper/apiurl'
import {connect} from 'react-redux'
import {stepaction,savecart} from '../../redux/action'

import {Button,CardMedia,Paper} from '@material-ui/core'

function Orderingconfirm ({order,stepaction,savecart}) {
    const [model,setmodel] = useState()
    const [bahan,setbahan] = useState()
    const [bodysize,setbodysize] = useState()
    const harga = model && bahan ? ((model.harga + bahan.harga)*order.jumlah) :null

    useEffect(()=>{
        Axios.get(`${apiurl}/user/confirm?userid=${order.userid}&modelid=${order.modelid}&bahanid=${order.bahanid}&bodysizeid=${order.bodysizeid?order.bodysizeid:0}`)
        .then(res=>{
            console.log(res.data)
            setmodel(res.data.model[0])
            setbahan(res.data.bahan[0])
            setbodysize(res.data.bodysize[0])
        }).catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <div style={{width:'60%',marginTop:40}}>
            <Paper className='py-3 px-4 d-flex' elevation={5}>
                <div style={{width:'20%'}}>
                    <CardMedia style={{height:0,paddingTop:'130%'}} image={model ? (model.path[0] === 'p' ? `${apiurl}/${model.path}` :model.path) : null}/>
                </div>
                {model && bahan ? 
                    <div className='ml-4'>
                        <div className='d-flex align-items-center'>
                            <div style={{fontSize:25}}>{model.name}</div>
                            <div className='ml-2 mt-2' style={{fontSize:12}}>(Rp {model.harga}/set)</div>
                        </div>
                        <div className='d-flex align-items-center mb-5'>
                            <div style={{fontSize:20}}>{order.warna} {bahan.name}</div>
                            <div className='ml-2 mt-1' style={{fontSize:12}}>(Rp {bahan.harga}/set)</div>
                        </div>
                        <div>Size : {bodysize ? bodysize.name :'default medium size'}</div>
                        <div>Qty : {order.jumlah} set</div>
                    </div>
                :null}
                {model && bahan ? 
                    <div className='d-flex flex-column align-items-end ml-auto'>
                        <div style={{fontSize:12,marginBottom:-10}}>{model.kategori}</div>
                        <div className='d-flex align-items-end mt-auto'>
                            <div className='mr-2'>Total</div>
                            <div style={{fontWeight:'bold'}}>Rp. {harga}</div>
                        </div>
                    </div>
                :null}
            </Paper>
            <div className='d-flex justify-content-end mt-2'>
                <Button className='m-2' variant='contained' color='inherit' onClick={()=>stepaction('BACK')}>
                    Back
                </Button>
                <Button className='m-2' variant="contained" color="primary" onClick={()=>savecart({...order,harga})}>
                    Save to cart
                </Button>
            </div>
        </div>
    )
}

const statetoprops = ({ordering}) => {
    return {
        actvstep:ordering.activestep,
        order:ordering.order
    }
}

export default connect(statetoprops,{stepaction,savecart}) (Orderingconfirm)