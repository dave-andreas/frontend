import React, { useEffect } from 'react';
import Header from '../components/header';
import {useDispatch,useSelector} from 'react-redux'
import queryString from 'query-string'
import { verified } from '../redux/action';

function Verified (props) {
    const dispatch = useDispatch()
    const regis = useSelector(state=>state.auth.regis)
    const email = useSelector(state=>state.auth.email)
    console.log(email)
    
    useEffect(()=>{
        const params = queryString.parse(props.location.search)
        dispatch(verified(params))
    })

    if(email){
        if(regis){
            return(
                <div>
                    <Header/>
                    <center>
                        <div className='kotak-regis mb-4' style={{marginTop:'150px'}}>
                            <h2 className='mb-5'>CONGRATS!!1!!1</h2>
                            <div className='mt-4 mb-5' style={{fontWeight:'400'}}>
                                You have verified your account, now lets create your favourite dress!!
                            </div>
                        </div>
                    </center>
                </div>
            )
        }else{
            return(
                <div>
                    <Header/>
                    <center>
                        <div className='kotak-regis mb-4' style={{marginTop:'150px'}}>
                            <h2 className='mb-5'>WAITING FOR RESPONSE</h2>
                            <div className='mt-4 mb-5' style={{fontWeight:'400'}}>
                                This may take several seconds...
                            </div>
                        </div>
                    </center>
                </div>
            )
        }
    }else{
        return(
            <div>OOPS WHO TF ARE U?</div>
        )
    }
}

export default Verified