import React, {useState} from 'react';
import {Link,Redirect} from 'react-router-dom'
import './register.css'
import Header from '../components/header'
import {useDispatch,useSelector} from 'react-redux';
import {userlogin} from '../redux/action'
import FacebookLogin from 'react-facebook-login'

function Login () {

    const checked = useSelector(state=>state.auth.checked)
    const [name,setname]=useState()
    const [email,setemail]=useState()
    const [picture,setpicture]=useState()
    const [data,setdata]=useState({})
    const dispatch = useDispatch()

    const loginhandle = e =>{
        const {name,value} = e.target
        setdata({...data,[name]:value})
        console.log(data)
        // this.setstate({data:{...data,[name]:value}})
    }

    const clicked = () => {
        console.log('click')
    }

    const responseFacebook = (response) => {
        console.log(response)
    }

    if(checked){
        return <Redirect to={'/'} />
    }

    return (
        <div>
            <Header/>
            <center>
                <div className='kotak-regis mb-4' style={{marginTop:'150px'}}>
                    <h2 className='mb-4'>Login</h2>
                    <div className='mb-3' style={{borderBottom:'black solid 1px', width:'90%'}}>
                        <input onChange={loginhandle} name='username' type='text' className='from-control' style={{border:'transparent', width:'100%'}} placeholder='username'></input>
                    </div>
                    <div className='mb-3' style={{borderBottom:'black solid 1px', width:'90%'}}>
                        <input onChange={loginhandle} name='password' type='password' className='from-control' style={{border:'transparent', width:'100%'}} placeholder='password'></input>
                    </div>
                </div>
                <div className='mb-3'>
                    <button onClick={() => dispatch(userlogin(data.username, data.password))} className='btn btn-dark mb-4'>Login</button><br/>
                    <span>don't have an account, <Link to={'/register'} className='link' style={{textDecoration:'none'}}>Regist here.</Link> </span>
                </div>
                <FacebookLogin 
                    appId='630845154333084'
                    autoLoad={true}
                    fields={name,email,picture}
                    onClick={clicked}
                    callback={responseFacebook}
                />
            </center>
        </div>
    );
}

export default Login