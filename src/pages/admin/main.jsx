import React from 'react';

import Models from './admin-models'
import Fabrics from './admin-fabrics'
import Orderlist from './orderlist'
import Statistics from './statistics'
import Sidemenu from '../../components/sidemenu'
import Header from '../../components/header'

import {connect} from 'react-redux'

function Main ({admin}) {

    const rencom = () => {
        switch (admin) {
            case 'models' : return <Models/>
            case 'fabrics' : return <Fabrics/>
            case 'orderlist' : return <Orderlist/>
            case 'statistics' : return <Statistics/>
            default : return <Models/>
        }
    }

    return (
        <div>
            <Header/>
            <div className='d-flex'>
                <Sidemenu/>
                {rencom()}
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