import React, { useState } from 'react';
import './header.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../redux/action'

function Header ({username,role,logout}) {
    const [a] = useState(localStorage.getItem('id'))

    if(a){
        return(
            <div>
                <div className='d-flex p-3 justify-content-between align-items-center'>
                    <div className='d-flex'>
                        <Link to={'/'} className='mx-3 mt-1' style={{textDecoration:'none',color:'black'}}>
                            <h5>HOME</h5>
                        </Link>
                        <Link to={'/models'} className='mx-3 mt-1' style={{textDecoration:'none',color:'black'}}>
                            <h5>MODELS</h5>
                        </Link>
                        <Link to={'/'} className='mx-3 mt-1' style={{textDecoration:'none',color:'black'}}>
                            <h5>ABOUT</h5>
                        </Link>
                    </div>
                    <h2>jAHiTiN.</h2>
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
                            <div onClick={()=>logout()} className='menukiri mt-2 mx-2' style={{fontWeight:'500'}}>LOGOUT</div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div>
            <div className='d-flex p-3 justify-content-between align-items-center'>
                <div className='d-flex'>
                    <Link to={'/'} className='mx-3 mt-1' style={{textDecoration:'none',color:'black'}}>
                        <h5>HOME</h5>
                    </Link>
                    <Link to={'/models'} className='mx-3 mt-1' style={{textDecoration:'none',color:'black'}}>
                        <h5>MODELS</h5>
                    </Link>
                    <Link to={'/'} className='mx-3 mt-1' style={{textDecoration:'none',color:'black'}}>
                        <h5>ABOUT</h5>
                    </Link>
                </div>
                <h2>jAHiTiN.</h2>
                <div className='d-flex'>
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

const statetoprops = ({auth}) => {
    return {
        username:auth.username,
        role:auth.role
    }
}

export default connect(statetoprops,{logout}) (Header)