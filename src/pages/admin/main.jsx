import React from 'react';

import Models from './admin-models'
import Fabrics from './admin-fabrics'
import Sidemenu from '../../components/sidemenu'
import Header from '../../components/header'

import {connect} from 'react-redux'

function Main ({admin}) {
    const render = () => {
        if (admin === 'models') {
            return <Models/>
        }else if (admin === 'fabrics') {
            return <Fabrics/>
        }
    }
    return (
        <div>
            <Header/>
            <div className='d-flex'>
                <Sidemenu/>
                {render()}
            </div>
        </div>
    )
}

const statetoprops = ({adm}) => {
    return {
        admin:adm.admin
    }
}

export default connect(statetoprops) (Main)