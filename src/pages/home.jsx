import React, {useState,useEffect} from 'react';
import './home.css'
import Axios from 'axios';
import {apiurl} from '../helper/apiurl'
import {Link} from 'react-router-dom'

import {Card, CardActionArea, CardContent, CardMedia, Button} from '@material-ui/core'
// import {Favorite} from '@material-ui/icons'
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
// import { useTheme } from '@material-ui/core/styles'
// import SwipeableViews from 'react-swipeable-views'
// import MobileStepper from '@material-ui/core/MobileStepper'
// import {Modal, ModalBody} from 'reactstrap'

import Header from '../components/header'
import Footer from '../components/footer'
import img1 from '../gambar/e9de9cf2b79d1946eea448060305a7e4.jpg'

function Home () {
    const [models,setmodels] = useState([])
    const [models1,setmodels1] = useState([])

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getmodhom`)
        .then(res=>{
            console.log(res.data)
            setmodels(res.data.result)
            setmodels1(res.data.result1)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const rendermaterial = () => {
        return models.map((val,index)=>{
            return (
                <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                    <CardActionArea 
                    // onClick={()=>detil(index,val.id)}
                    >
                        <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path ? (val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path) : `null`} />
                    </CardActionArea>
                    <CardContent>
                        <div className='d-flex'>
                            <div><h6>{val.name}</h6></div>
                        </div>
                    </CardContent>
                </Card>
            )
        })
    }

    const render2 = () => {
        return models1.map((val,index)=>{
            return (
                <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                    <CardActionArea 
                    // onClick={()=>detil(index,val.id)}
                    >
                        <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path ? (val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path) : `null`} />
                    </CardActionArea>
                    <CardContent>
                        <div className='d-flex'>
                            <div><h6>{val.name}</h6></div>
                        </div>
                    </CardContent>
                </Card>
            )
        })
    }

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
                    <Button className='mt-5' variant='contained' style={{backgroundColor:'#212529',color:'white'}} component={Link} to={'/models'}>start now</Button>
                </div>
                <div className='gambar1 ml-5'>
                    <img src={img1} alt='' width='100%' />
                </div>
            </div>

            <div className='d-flex flex-column align-items-center my-5'>
                <div className='mb-2' style={{fontSize:25,fontWeight:'bold'}}>Best Selling Colection</div>
                <div>
                    This is some dress models you can choose. The size will adjust according to your body preference.
                </div>
                <div>
                    And will made with love by our tailor
                </div>
                <div className='d-flex flex-wrap justify-content-center mt-5' style={{marginLeft:'10%',marginRight:'10%'}}>
                    {rendermaterial()}
                </div>
            </div>

            <div className='d-flex flex-column align-items-center mt-5'>
                <div style={{fontSize:25}}>Our newest Colection</div>
                <div className='d-flex flex-wrap justify-content-center mt-5' style={{marginLeft:'10%',marginRight:'10%'}}>
                    {render2()}
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default Home