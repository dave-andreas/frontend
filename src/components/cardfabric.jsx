import React from 'react';
import card11 from '../gambar/ec66c712b835674aac97f4fd32003c2a.jpg'
import card12 from '../gambar/fad94aa69b8beec624d5aead41be0861.jpg'
import card13 from '../gambar/fb70ab8a8ccceda9a9cfe65c8a5a3da5.jpg'
import card14 from '../gambar/729a02b822f80552003571d30c104c39.jpg'

function cardfabric(){
    return(
        <div className='row mx-5'>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card11} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Nama Bahan</h5>
                        <p className='card-text'>Detail bahan dan deskripsi nya</p>
                    </div>
                </div>
            </div>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card12} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Nama Bahan</h5>
                        <p className='card-text'>Detail bahan dan deskripsi nya</p>
                    </div>
                </div>
            </div>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card13} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Nama Bahan</h5>
                        <p className='card-text'>Detail bahan dan deskripsi nya</p>
                    </div>
                </div>
            </div>
            <div className='col-sm-3 mb-4'>
                <div className='card'>
                    <img className='card-img-top' src={card14} alt="" style={{width:''}} />
                    <div className='card-body'>
                        <h5 className='card-title'>Nama Bahan</h5>
                        <p className='card-text'>Detail bahan dan deskripsi nya</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default cardfabric