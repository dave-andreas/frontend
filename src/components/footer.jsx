import React from 'react';
import './footer.css'
import {IconButton} from '@material-ui/core'
import {Facebook,Instagram,Phone} from '@material-ui/icons'

function Footer () {
    return (
        <div>
            <div className='d-flex mt-5 px-5 py-4 align-items-center' style={{backgroundColor:'#141625',color:'white'}}>
                <div className='ml-5' style={{cursor:'pointer'}}>
                    Carrer
                </div>
                <div className='ml-4' style={{cursor:'pointer'}}>
                    Call us
                </div>
                <div className='ml-4' style={{cursor:'pointer'}}>
                    About us
                </div>
                <div className='mr-5 ml-auto'>
                    <IconButton><Facebook style={{color:'white'}} /></IconButton>
                    <IconButton><Instagram style={{color:'white'}} /></IconButton>
                    <IconButton><Phone style={{color:'white'}} /></IconButton>
                </div>
            </div>
        </div>
    )
}

export default Footer