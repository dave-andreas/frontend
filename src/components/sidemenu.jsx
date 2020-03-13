import React from 'react';
import {IconButton,Icon} from '@material-ui/core'
import {Settings,Waves,Palette,ListAlt} from '@material-ui/icons'

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
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('MODELS')}>
                <Palette/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Models
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}} onClick={()=>menuaction('FABRICS')}>
                <Waves/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Fabrics
                </div>
            </IconButton>
            <IconButton style={{marginLeft:15,justifyContent:'flex-start'}}>
                <ListAlt/>
                <div style={{marginLeft:10, fontSize:15}}>
                    Order List
                </div>
            </IconButton>
        </div>
    )
}

export default connect(null,{menuaction}) (Sidemenu)