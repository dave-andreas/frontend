import React from 'react';
import './footer.css'
import {Facebook,Instagram,Phone} from '@material-ui/icons'

function Footer () {
    return (
        <div>
            <div className='footer'>
                <center>
                    <div className='d-flex px-5'>
                        {/* <div className='ml-3' style={{marginRight:'auto'}}>
                            INI FOOTER ... UDAH GITU AJA
                        </div> */}
                        <div className='ml-5 pilih'>
                            Carrer
                        </div>
                        <div className='ml-4 pilih'>
                            Call us
                        </div>
                        <div className='ml-4 pilih'>
                            About us
                        </div>
                        <div className='mr-5' style={{marginLeft:'auto'}}>
                            <Facebook className='mx-1 pilih'/>
                            <Instagram className='mx-1 pilih'/>
                            <Phone className='mx-1 pilih'/>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    )
}

export default Footer