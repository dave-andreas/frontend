import React, {useState} from 'react';
import './user-profile.css'
import Header from '../../components/header'
import Infosetting from '../../components/profile-setting/info-setting'
import Bodysize from '../../components/profile-setting/body-size'
import Accountinfo from '../../components/profile-setting/account-info'
import Orderstatus from '../../components/profile-setting/order-status'
import Savedproduct from '../../components/profile-setting/saved-product'

function Profile () {
    const [info,setinfo] = useState('')
    const [size,setsize] = useState('')
    const [account,setaccount] = useState('')
    const [order,setorder] = useState('')
    const [saved,setsaved] = useState('')
    const [edit,setedit] = useState()

    const gantiinfo =()=>{
        setinfo('putih')
        setsize('')
        setaccount('')
        setorder('')
        setsaved('')
    }

    const gantisize =()=>{
        setinfo('')
        setsize('putih')
        setaccount('')
        setorder('')
        setsaved('')
    }

    const gantiaccount =()=>{
        setinfo('')
        setsize('')
        setaccount('putih')
        setorder('')
        setsaved('')
    }

    const gantiorder =()=>{
        setinfo('')
        setsize('')
        setaccount('')
        setorder('putih')
        setsaved('')
    }

    const gantisaved =()=>{
        setinfo('')
        setsize('')
        setaccount('')
        setorder('')
        setsaved('putih')
    }

    const content =()=>{
        if(info){
            // setedit(Infosetting)
            return(
                <div className='judul'>
                    Set up your Info here
                </div>
            )
        }else if(size){
            // setedit(Bodysize)
            return(//bisa diganti componen aja biar rapih
                <div className='judul'>
                    Set up your Size here
                </div>
            )
        }else if(account){
            // setedit(Accountinfo)
            return(
                <div className='judul'>
                    Set up your Account here
                </div>
            )
        }else if(order){
            // setedit(Orderstatus)
            return(
                <div className='judul'>
                    View your Order list here
                </div>
            )
        }else if(saved){
            // setedit(Savedproduct)
            return(
                <div className='judul'>
                    Set up your Saved product here
                </div>
            )
        }else{
            return(
                <div className='judul'>
                    Set up your profile here
                </div>
            )
        }
    }

    return(
        <div>
            <Header/>
            <div className='boxutama'>
                <div className='boxsamping pt-5'>
                    <center>
                        <div className='ava'>
                            AVA
                        </div>
                        <div className='mb-5'>
                            nama user (link to profile)
                        </div>
                        <div className={`menu ${info}`} onClick={gantiinfo}>
                            Your Info
                        </div>
                        <div className={`menu ${size}`} onClick={gantisize}>
                            Body Size
                        </div>
                        <div className={`menu ${account}`} onClick={gantiaccount}>
                            Account Info
                        </div>
                        <div className={`menu ${order}`} onClick={gantiorder}>
                            Order Status
                        </div>
                        <div className={`menu ${saved}`} onClick={gantisaved}>
                            Saved Product
                        </div>
                    </center>
                </div>
                <div className='boxkanan'>
                    {/* <div className='judul'>
                        Set up your profile here
                    </div> */}
                    {content()}
                    <div className='isi'>
                        We recommend you to fill in all sections for your convenience in surfing on our website
                    </div>
                    {info?
                    <Infosetting/>
                    :null}
                    {size?
                    <Bodysize/>
                    :null}
                    {account?
                    <Accountinfo/>
                    :null}
                    {order?
                    <Orderstatus/>
                    :null}
                    {saved?
                    <Savedproduct/>
                    :null}
                </div>
            </div>
        </div>
    )
}

export default Profile