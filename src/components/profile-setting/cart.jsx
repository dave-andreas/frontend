import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import { apiurl } from '../../helper/apiurl'

import {Paper,CardMedia,IconButton,Button,Snackbar,Slide,CircularProgress} from '@material-ui/core'
import {Clear,PlaylistAddCheck} from '@material-ui/icons'

import {Modal,ModalHeader,ModalFooter,ModalBody} from 'reactstrap'

function Cart () {
    const [load,setload] = useState(true)
    const [cart,setcart] = useState([])
    const [address,setaddress] = useState('')
    const [snack,setsnack] = useState({
        open: false,
        message: ''
    })
    
    const [totharga,settotharga] = useState(0)
    
    useEffect(()=>{
        Axios.get(`${apiurl}/user/getcart/${localStorage.getItem('id')}`)
        .then(res=>{
            console.log(res.data.cart)
            setcart(res.data.cart)
            res.data.cart.forEach(cart=>{
                settotharga(prev => prev+=cart.harga)
            })
            setaddress(res.data.address[0].address)
            setload(false)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const delcart = (id) => {
        Axios.post(`${apiurl}/user/delcart?id=${id}&userid=${localStorage.getItem('id')}`)
        .then(res=>{
            setcart(res.data)
            setsnack({...snack, open:!snack.open, message:'deleted cart'})
        }).catch(err=>{
            console.log(err)
        })
    }

    const checkout = (id,userid,harga,jumlah,bahanid,modelid) => {
        Axios.post(`${apiurl}/user/checkout?id=${id}&userid=${userid}&harga=${harga}&alamat=${address}&jumlah=${jumlah}&bahanid=${bahanid}&modelid=${modelid}`)
        .then(res=>{
            setcart(res.data)
            setmod(false)
            setmod2(false)
            setsnack({...snack, open:!snack.open, message:'Ordering Successfuly!'})
        }).catch(err=>{
            console.log(err)
        })
    }

    const [mod,setmod] = useState(false)

    const [mod2,setmod2] = useState(false)
    const [cart2,setcart2] = useState({})
    const openmod2 = (cart) => {
        setcart2(cart)
        setmod2(!mod2)
    }

    const handler = e => {
        setaddress(e.target.value)
        console.log(address)
    }

    const rencart = () => {
        return cart.map((cart,index)=>{
            return (
                <Paper className='py-3 px-3 my-3 d-flex' elevation={5} key={index}>
                    <div style={{width:'12%'}}>
                        <CardMedia style={{height:0,paddingTop:'130%'}} image={cart.path ? (cart.path[0] === 'p' ? `${apiurl}/${cart.path}` :cart.path) :null}/>
                    </div>
                    <div className='ml-4 d-flex flex-column'>
                        <div className='d-flex align-items-center'>
                            <div style={{fontSize:22,marginTop:-5}}>{cart.model}</div>
                            <div className='ml-2 mt-1' style={{fontSize:11}}>(Rp {cart.mharga}/set)</div>
                        </div>
                        <div className='d-flex align-items-center mb-3'>
                            <div style={{fontSize:18}}>{cart.warna} {cart.bahan}</div>
                            <div className='ml-2 mt-1' style={{fontSize:11}}>(Rp {cart.bharga}/set)</div>
                        </div>
                        <div className='mt-auto'>
                            <div style={{fontSize:15}}>Size : {cart.size ? cart.size :'default medium size'}</div>
                            <div style={{fontSize:15}}>Qty : {cart.jumlah} set</div>
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-end ml-auto'>
                        <IconButton style={{marginRight:3}} onClick={()=>delcart(cart.id)}>
                            <Clear style={{fontSize:17}} />
                        </IconButton>
                        <IconButton onClick={()=>{
                            // checkout(cart.id,cart.userid,cart.harga)
                            openmod2(cart)
                            }}>
                            <PlaylistAddCheck style={{fontSize:20}} />
                        </IconButton>
                        <div className='d-flex align-items-end mt-auto'>
                            <div className='mr-2'>Total</div>
                            <div style={{fontWeight:'bold'}}>Rp. {cart.harga}</div>
                        </div>
                    </div>
                </Paper>
            )
        })
    }

    return (
        <div style={{marginTop:30,marginBottom:50,marginLeft:'10%',marginRight:'10%'}}>
            <Modal isOpen={mod} toggle={()=>setmod(!mod)}>
                <ModalHeader>
                    All gona be Rp {totharga}
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className='mb-2'>
                            your order will be sent to ...<br/>
                            <strong>{address}</strong>
                        </div>
                        <div className='mb-2'>
                            or you can set another addres :
                            <input type='text' className='form-control' placeholder='other address' onChange={handler} defaultValue={address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='m-1' variant='contained' color='secondary' onClick={()=>setmod(!mod)}>change my mind</Button>
                    <Button className='m-1' variant='contained' color='primary' onClick={()=>checkout(0,localStorage.getItem('id'),totharga)}>okay</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={mod2} toggle={()=>setmod2(!mod2)}>
                <ModalHeader>
                    All gona be Rp {cart2.harga}
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div className='mb-2'>
                            your order will be sent to ...<br/>
                            <strong>{address}</strong>
                        </div>
                        <div className='mb-2'>
                            or you can set another addres :
                            <input type='text' className='form-control' placeholder='other address' onChange={handler} defaultValue={address} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='m-1' variant='contained' color='secondary' onClick={()=>setmod2(!mod2)}>change my mind</Button>
                    <Button className='m-1' variant='contained' color='primary' onClick={()=>checkout(cart2.id,cart2.userid,cart2.harga,cart2.jumlah,cart2.bahanid,cart2.modelid)}>okay</Button>
                </ModalFooter>
            </Modal>
            <div className='d-flex' style={{fontSize:25}}>
                YOUR CART
                {load ? <CircularProgress className='ml-3' /> : null}
            </div>
            {rencart()}
            {cart.length?
            <div className='d-flex justify-content-end mt-2'>
                <Button className='m-1' variant='contained' color='secondary' onClick={()=>delcart(0)}>Clear Cart</Button>
                <Button className='m-1' variant='contained' color='primary' onClick={()=>setmod(!mod)}>Checkout All</Button>
            </div>
            :null}
            <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'left'}} open={snack.open} autoHideDuration={2000} message={snack.message}
            onClose={()=>setsnack(!snack.open)}
            TransitionComponent={Slide} direction='up' />
        </div>
    )
}

export default Cart