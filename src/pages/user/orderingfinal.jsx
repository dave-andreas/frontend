import React, {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {stepaction} from '../../redux/action'

import {Button,Paper,CardMedia} from '@material-ui/core'

import mandiri from '../../gambar/logo-mandiri.png'
import bca from '../../gambar/logo-bca.png'
import bri from '../../gambar/logo-bri.png'

function Orderingfinal ({order,stepaction}) {
    return (
        <div style={{width:'60%',marginTop:40}}>
            <Paper className='py-3 px-4 mb-2' elevation={5}>
                <div style={{fontSize:25,fontWeight:'bold'}}> Completing the payment</div>
                Your order should be complete by transfering Rp {order.harga} to :
                <div className='d-flex mt-3 align-items-center'>
                    <div className ='mr-3' style={{width:'10%'}}>
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
                    <div className ='mr-3' style={{width:'10%'}}>
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
                    <div className ='mr-3' style={{width:'10%'}}>
                        <CardMedia style={{height:17}} image={bri} />
                    </div>
                    <div>
                        <div style={{fontWeight:'bold'}}>
                            Bank BRI
                        </div>
                        <div>xxxx-xxxx-xxxx-xxxx</div>
                    </div>
                </div>
            </Paper>
            <div className='d-flex justify-content-end'>
                <Button className='m-2' variant='outlined' color='primary' onClick={()=>stepaction('SKIP')}>Skip</Button>
                {/* atau langsung checkout ? */}
                <Button className='m-2' variant='contained' color='primary'>Checkout</Button>
                <Button className='m-2' variant='contained' color='primary'>Pay Now</Button>
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

export default connect(statetoprops,{stepaction}) (Orderingfinal)