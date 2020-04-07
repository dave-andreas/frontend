import React from 'react';
import Header from '../../components/header'
import Cart from '../../components/profile-setting/cart'
import Infosetting from '../../components/profile-setting/info-setting'
import Bodysize from '../../components/profile-setting/body-size'
import Orderstatus from '../../components/profile-setting/order-status'
// import Accountinfo from '../../components/profile-setting/account-info'
// import Savedproduct from '../../components/profile-setting/saved-product'

import {connect} from 'react-redux'
import {dashaction} from '../../redux/action'

import {IconButton} from '@material-ui/core'
import {Settings,ListAlt,ShoppingCart,Person,Accessibility} from '@material-ui/icons'


function Profile ({dash,dashaction}) {

    function content () {
        switch (dash) {
            case 1 : return <Cart/>
            case 2 : return <Infosetting/>
            case 3 : return <Bodysize/>
            case 4 : return <Orderstatus/>
            // case 5 : return <Accountinfo/>
            // case 6 : return <Savedproduct/>
            default : return <Cart/>
        }
    }

    const dashboard = () => {
        return (
            <div style={{position:'sticky',minWidth:230,display:'flex',flexDirection:'column'}}>
                <IconButton style={{marginLeft:15,marginBottom:30,marginTop:5,justifyContent:'flex-start'}} onClick={()=>dashaction(1)}>
                    <Settings/>
                    <div style={{marginLeft:10, fontSize:15,justifyContent:'flex-start',fontWeight:'bolder'}}>
                        Your Dashboard
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>dashaction(1)}>
                    <ShoppingCart/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Cart
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>dashaction(2)}>
                    <Person/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Info Setting
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>dashaction(3)}>
                    <Accessibility/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Body Size
                    </div>
                </IconButton>
                <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>dashaction(4)}>
                    <ListAlt/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Order Status
                    </div>
                </IconButton>
                {/* <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>dashaction(5)}>
                    <Lock/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Account Info
                    </div>
                </IconButton> */}
                {/* <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>dashaction(6)}>
                    <Favorite/>
                    <div style={{marginLeft:10, fontSize:15}}>
                        Saved Product
                    </div>
                </IconButton> */}
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <div className='d-flex'>
                {dashboard()}
                <div style={{width:'100%'}}>
                    {content()}
                </div>
            </div>
        </div>
    )
}

const statetoprops = ({user}) => {
    return {
        dash:user.dashboard
    }
}

export default connect(statetoprops,{dashaction}) (Profile)