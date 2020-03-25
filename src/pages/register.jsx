import React, {useState} from 'react';
import {Link,Redirect} from 'react-router-dom'
import './register.css'
import Header from '../components/header'
import {register} from '../redux/action'
import {useDispatch,useSelector} from 'react-redux'

function Register () {

    const dispatch = useDispatch()
    const checked = useSelector(state=>state.auth.checked)
    const message = useSelector(state=>state.auth.message)
    const email = useSelector(state=>state.auth.email)
    const [data,setdata]=useState({})
    const [msg,setmsg] = useState()

    const regishandle = e =>{
        const {name,value} = e.target
        setdata({...data,[name]:value})
        console.log(data)
    }

    const regisclick=()=>{
        if(data.email && data.username && data.password && data.repassword){
            if(data.password===data.repassword){
                setmsg('')
                dispatch(register(data))
                console.log(msg)
                setmsg(message)
            }else{
                setmsg('re-enter same password')
            }
        }else{
            setmsg('data is not complete')
        }
    }

    if(checked){
        return <Redirect to={'/'} />
    }

    if(email){
        return <Redirect to={'/waitverif'}/>
    }
    
    return (
        <div>
            <Header/>
            <center>
                <div className='kotak-regis mb-4' style={{marginTop:'150px'}}>
                    <h2>Registration</h2>
                    <div className='mt-4 mb-4' style={{fontWeight:'400'}}>
                        Before we begin, put your <text style={{fontWeight:'700'}}>email</text> and <text style={{fontWeight:'700'}}>password</text> below, so we can make an account for you
                    </div>
                    <div className='mb-3' style={{borderBottom:'black solid 1px', width:'90%'}}>
                        <input onChange={regishandle} name='email' type='text' className='from-control' style={{border:'transparent', width:'100%'}} placeholder='email'></input>
                    </div>
                    <div className='mb-3' style={{borderBottom:'black solid 1px', width:'90%'}}>
                        <input onChange={regishandle} name='username' type='text' className='from-control' style={{border:'transparent', width:'100%'}} placeholder='username'></input>
                    </div>
                    <div className='mb-3' style={{borderBottom:'black solid 1px', width:'90%'}}>
                        <input onChange={regishandle} name='password' type='password' className='from-control' style={{border:'transparent', width:'100%'}} placeholder='password'></input>
                    </div>
                    <div className='mb-3' style={{borderBottom:'black solid 1px', width:'90%'}}>
                        <input onChange={regishandle} name='repassword' type='password' className='from-control' style={{border:'transparent', width:'100%'}} placeholder='re-enter password'></input>
                    </div>
                    {/* <div style={{color:'red'}}>{message}</div> */}
                    {msg?<div style={{color:'red'}}>{msg}</div>:null}
                </div>
                <button onClick={regisclick} className='btn btn-dark mb-4'>Regist it!</button><br/>
                <text>or you already have an account, <Link to={'/login'} className='link' style={{textDecoration:'none'}}>Login here.</Link> </text>
            </center>
        </div>
    );
}

export default Register