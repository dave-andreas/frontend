import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import './user-profile.css'
import Header from '../../components/header'
import Infosetting from '../../components/profile-setting/info-setting'
import Bodysize from '../../components/profile-setting/body-size'
import Accountinfo from '../../components/profile-setting/account-info'
import Orderstatus from '../../components/profile-setting/order-status'
import Savedproduct from '../../components/profile-setting/saved-product'

//jika logout dari sini seharusnya redirect ke home

function Profile () {
    const username = useSelector(state=>state.auth.username)
    const [arr,setarr] = useState(['your info','body size','account info','order stat','saved'])
    const [sty,setsty] = useState([])
    var konten = [
        <Infosetting/>,
        <Bodysize/>,
        <Accountinfo/>,
        <Orderstatus/>,
        <Savedproduct/>
    ]
    const [cont,setcont] = useState()

    const gatlik=(x)=>{
        var nesty=[]
        setsty([])
        nesty[x]={backgroundColor:'whitesmoke',color:'#151729'}
        setsty(nesty)
        setcont(konten[x])
    }

    const rendermenu=()=>{
        return arr.map((val,index)=>{
            return (
                <div className='menu' key={index} style={sty[index]} onClick={()=>gatlik(index)}>
                    {val}
                </div>
            )
        })
    }

    return (
        <div>
            <Header/>
            <div className='boxutama'>
                <div className='boxsamping pt-5'>
                    <center>
                        <div className='ava'>
                            AVA
                        </div>
                        <div className='mb-5'>
                            {username}
                        </div>
                        {rendermenu()}
                    </center>
                </div>
                <div className='boxkanan'>
                    <div className='isi'>
                        We recommend you to fill in all sections for your convenience in surfing on our website
                    </div>
                    {cont}
                </div>
            </div>
        </div>
    )
}

export default Profile