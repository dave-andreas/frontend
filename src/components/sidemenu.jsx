import React from 'react';
import {IconButton} from '@material-ui/core'
import {Settings,Waves,Palette,ListAlt,Equalizer,SupervisorAccount} from '@material-ui/icons'

import {connect} from 'react-redux'
import {menuaction} from '../redux/action'

function Sidemenu ({menuaction}) {
    return (
        <div style={{marginTop:80,position:'sticky',minWidth:230,display:'flex',flexDirection:'column'}}>
            <IconButton style={{marginLeft:15,marginBottom:30,marginTop:5,justifyContent:'flex-start'}}>
                <Settings/>
                <div style={{marginLeft:10, fontSize:15,justifyContent:'flex-start',fontWeight:'bolder'}}>
                    Admin Dashboard
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('models')}>
                <Palette/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Models
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('fabrics')}>
                <Waves/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Fabrics
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('orderlist')}>
                <ListAlt/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Orders List
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('statistics')}>
                <Equalizer/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Statistics
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('userslist')}>
                <SupervisorAccount/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Users List
                </div>
            </IconButton>
        </div>
    )
}

export default connect(null,{menuaction}) (Sidemenu)