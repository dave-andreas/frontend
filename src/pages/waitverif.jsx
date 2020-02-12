import React from 'react';
import Header from '../components/header';

function Waitverif () {

    return(
        <div>
            <Header/>
            <center>
                <div className='kotak-regis mb-4' style={{marginTop:'150px'}}>
                    <h2 className='mb-5'>Waiting Verification</h2>
                    <div className='mt-4 mb-5' style={{fontWeight:'400'}}>
                        Please check your email and click the link that we have send to you. Thank you...
                    </div>
                    <div className='mb-3'>if don't get any, please click button below</div>
                    <button className='btn btn-dark'>Resend email</button>
                </div>
            </center>
        </div>
    )
}

export default Waitverif