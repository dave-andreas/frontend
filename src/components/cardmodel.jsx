import React from 'react';
import card1 from '../gambar/6d5600ad1831e5dd2a8e0cd047b07e80.jpg'
import card2 from '../gambar/8ab694d24ee297d3bcab1e386ac656e3.jpg'
import card3 from '../gambar/7316221a0e76458b24d28b245b9a3b2a.jpg'
import card4 from '../gambar/e2b792f11b940e11599351c13a81e009.jpg'

function cardmodel(){
    return(
        <div className='row mx-5'>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card1} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Model Baju</h5>
                        <p className='card-text'>Detail model dan deskripsi nya</p>
                    </div>
                </div>
            </div>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card2} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Model Baju</h5>
                        <p className='card-text'>Detail model dan deskripsi nya</p>
                    </div>
                </div>
            </div>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card3} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Model Baju</h5>
                        <p className='card-text'>Detail model dan deskripsi nya</p>
                    </div>
                </div>
            </div>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card4} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Model Baju</h5>
                        <p className='card-text'>Detail model dan deskripsi nya</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cardmodel