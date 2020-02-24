import React from 'react';
import './home.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Cardmodel from '../components/cardmodel'
import Cardfabric from '../components/cardfabric'
import img1 from '../gambar/e9de9cf2b79d1946eea448060305a7e4.jpg'

function Home () {
    return (
        <div>
            <Header/>
            <div className='boxbesar'>
                <div className='mr-5 mt-5'>
                    <div className='' style={{fontWeight:'bold', fontSize:'40px', width:'80%'}}>
                        we create your dress
                    </div>
                    <div className='mt-4' style={{fontSize:'20px'}}>
                        when the thing from boutique dosn't complete<br/>
                        your needs, we are ready to serve you something<br/>
                        you desire
                    </div>
                    <div className='btn btn-outline-dark mt-5'>Start Now</div>
                </div>
                <div className='gambar1 ml-5'>
                    <img src={img1} alt='' width='100%' />
                </div>
            </div>

            <center id='divmodel' className='boxbesar2'>
                <div className='mb-3' style={{fontWeight:'bold',fontSize:'30px'}}>
                    Featured Dress Models
                </div>
                <div className='mb-5' style={{fontSize:'15px'}}>
                    This is some dress models you can choose. The size will adjust according to your body preference.<br/>
                    And will made with love by our tailor
                </div>
                <Cardmodel/>
            </center>

            <center className='mb-5'>
            <div className='mb-3 mt-5' style={{fontWeight:'bold',fontSize:'30px'}}>
                    Featured Fabrics
                </div>
                <div className='mb-5' style={{fontSize:'15px'}}>
                    With wide variant of fabrics and color, there is no better place to choose the choices that suit your needs 
                </div>
                <Cardfabric/>
            </center>
            <Footer/>
        </div>
    )
}

export default Home