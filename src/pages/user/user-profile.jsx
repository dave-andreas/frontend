import React, {useState} from 'react';
import Header from '../../components/header'
import Infosetting from '../../components/profile-setting/info-setting'
import Bodysize from '../../components/profile-setting/body-size'
import Accountinfo from '../../components/profile-setting/account-info'
import Orderstatus from '../../components/profile-setting/order-status'
import Savedproduct from '../../components/profile-setting/saved-product'
import Cart from '../../components/profile-setting/cart'

import {IconButton} from '@material-ui/core'
import {Settings,ListAlt,ShoppingCart,Person,Accessibility,Lock,Favorite} from '@material-ui/icons'

function content (x) {
    switch (x) {
        case 1 : return <Cart/>
        case 2 : return <Infosetting/>
        case 3 : return <Bodysize/>
        case 4 : return <Accountinfo/>
        case 5 : return <Orderstatus/>
        case 6 : return <Savedproduct/>
        default : return <Cart/>
    }
}

function Profile () {
    const [part,setpart] = useState()

    const dashboard = () => {
        return (
            <div style={{position:'sticky',minWidth:230,display:'flex',flexDirection:'column'}}>
                <IconButton style={{marginLeft:15,marginBottom:30,marginTop:5,justifyContent:'flex-start'}} onClick={()=>setpart(0)}>
                    <Settings/>
                    <div style={{marginLeft:10, fontSize:15,justifyContent:'flex-start',fontWeight:'bolder'}}>
                        Your Dashboard
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>setpart(1)}>
                    <ShoppingCart/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Cart
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>setpart(2)}>
                    <Person/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Info Setting
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>setpart(3)}>
                    <Accessibility/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Body Size
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>setpart(4)}>
                    <Lock/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Account Info
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>setpart(5)}>
                    <ListAlt/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Order Status
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>setpart(6)}>
                    <Favorite/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Saved Product
                    </div>
                </IconButton>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <div className='d-flex' style={{marginTop:80}}>
                {dashboard()}
                <div style={{width:'100%'}}>
                    {content(part)}
                </div>
            </div>
        </div>
    )
}

export default Profile