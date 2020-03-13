import React, { useState } from 'react';
import './header.css'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from '../redux/action'

function Header () {
    const username = useSelector(state=>state.auth.username)
    const role = useSelector(state=>state.auth.role)
    const dispatch = useDispatch()
    const [a] = useState(localStorage.getItem('id'))

    const logoutclick = () => {
        dispatch(logout)
        window.location.reload()
    }

    if(a){
        return(
            <div>
                <div className='header-container'>
                    <div className='menu-kiri'>
                        <Link to={'/'} style={{textDecoration:'none'}} >
                            <div className='menukiri'>
                                HOME
                            </div>
                        </Link>
                        <Link to={'/models'} style={{textDecoration:'none'}}>
                            <div className='menukiri'>
                                MODELS
                            </div>
                        </Link>
                        <Link to={role === 'admin' ? '/' : '/'} style={{textDecoration:'none'}}>
                            <div className='menukiri'>
                                FABRICS
                            </div>
                        </Link>
                    </div>
                    <div className='logo'>
                        jAHiTiN.
                        {username}
                    </div>
                    <div className='menu-kanan'>
                        <Link to={role === 'admin' ? '/main' : '/profile'} style={{textDecoration:'none'}}>
                            <div className='menukiri mt-2' style={{fontWeight:'bold'}}>
                                Henloo {username} !
                            </div>
                        </Link>
                        <div className='mr-2' style={{fontSize:'35px',marginTop:'-10px',fontWeight:'lighter'}}>
                            |
                        </div>
                        <Link to={'/'} style={{textDecoration:'none'}}>
                            <div onClick={logoutclick} className='menukiri mt-2 mx-2' style={{fontWeight:'500'}}>LOGOUT</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <div className='header-container'>
                <div className='menu-kiri'>
                    <Link to={'/'} style={{textDecoration:'none'}} >
                        <div className='menukiri'>
                            HOME
                        </div>
                    </Link>
                    <div className='menukiri'>
                        MODELS
                    </div>
                    <div className='menukiri'>
                        FABRICS
                    </div>
                </div>
                <div className='logo'>
                    jAHiTiN.
                    {username}
                </div>
                <div className='menu-kanan'>
                    <Link to={'/login'} style={{textDecoration:'none'}}>
                        <div className='btn btn-outline-dark mx-2' style={{fontWeight:'500'}}>LOGIN</div>
                    </Link>
                    <Link to={'/register'} style={{textDecoration:'none'}}>
                        <div className='btn btn-outline-dark mx-2' style={{fontWeight:'500'}}>REGISTER</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header