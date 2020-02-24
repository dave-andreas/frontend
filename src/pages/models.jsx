import React, {useState,useEffect} from 'react';
import './models.css'
import Axios from 'axios';
import {apiurl} from '../helper/apiurl'
import {Card,CardActionArea,CardContent,CardMedia, Button, IconButton} from '@material-ui/core'
import {Favorite} from '@material-ui/icons'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from '@material-ui/core/MobileStepper'
import {Modal, ModalBody} from 'reactstrap'

import Header from '../components/header'
import Footer from '../components/footer'
import img3 from '../gambar/photo-128278505_1.jpg'
import card1 from '../gambar/6d5600ad1831e5dd2a8e0cd047b07e80.jpg'
import card2 from '../gambar/8ab694d24ee297d3bcab1e386ac656e3.jpg'
import card3 from '../gambar/7316221a0e76458b24d28b245b9a3b2a.jpg'
import card4 from '../gambar/e2b792f11b940e11599351c13a81e009.jpg'

const card = [card1,card2,card3,card4]

function Models () {
    const [arr,setarr] = useState(['ALL','Outwear','Topwear','Dress','Jumpsuit','Pants','Skirt'])
    const [sty,setsty] = useState([{color:'salmon'}])
    const [models,setmodels] = useState([])
    const [cat,setcat] = useState(0)
    const [gambar,setgambar] = useState([])

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = gambar.length
    const [modal,setmodal] = useState(false)

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    
    const handleStepChange = step => {
        setActiveStep(step);
    };

    const detil =(id)=>{
        setmodal(!modal)
        Axios.get(`${apiurl}/admin/getgmb/${id}`)
        .then(res=>{
            setgambar(res.data)
            console.log(gambar)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getmod`)
        .then(res=>{
            console.log(res.data)
            setmodels(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const gatlik=(x)=>{
        var nesty=[]
        setsty([])
        nesty[x]={color:'salmon'}
        setsty(nesty)
        setcat(x)
    }

    const klikgmb =()=>{
        console.log('oke')
    }

    const rendermenu=()=>{
        return arr.map((val,index)=>{
            return (
                <div className='cat' key={index} style={sty[index]} onClick={()=>gatlik(index)}>
                    {val}
                </div>
            )
        })
    }

    const rendermaterial =()=>{
        if(cat===0){
            return models.map((val,index)=>{
                return (
                    <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                        <CardActionArea onClick={()=>detil(val.id)}>
                            <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path} />
                        </CardActionArea>
                        <CardContent>
                            <div className='d-flex'>
                                <h5 className='card-title' style={{fontSize:'13px'}}>{val.name}</h5>
                                <IconButton style={{marginLeft:'auto', marginTop:'-15px', marginRight:'-15px'}}>
                                    <Favorite style={{fontSize:'20'}} />
                                </IconButton>
                            </div>
                            <div>Rp {val.harga},00</div>
                        </CardContent>
                    </Card>
                )
            })
        }else{
            return models.map((val,index)=>{
                if(val.kategoriid===cat){
                    return (
                        <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                            <CardActionArea onClick={()=>detil(val.id)}>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path} />
                            </CardActionArea>
                            <CardContent>
                                <div className='d-flex'>
                                    <h5 className='card-title' style={{fontSize:'13px'}}>{val.name}</h5>
                                    <IconButton style={{marginLeft:'auto', marginTop:'-15px', marginRight:'-15px'}}>
                                        <Favorite style={{fontSize:'20'}} />
                                    </IconButton>
                                </div>
                                <div>Rp {val.harga},00</div>
                            </CardContent>
                        </Card>
                    )
                }
            })
        }
    }

    return (
        <div>
            <Header/>
            <Modal isOpen={modal} toggle={()=>{setmodal(!modal);setActiveStep(0)}} size='lg'>
                <ModalBody>
                    <div className='d-flex mr-4'>
                    <div style={{marginLeft:-16,marginTop:-16,marginBottom:-16,marginRight:40,maxWidth:360}}>
                        <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        >
                        {gambar.map((val,index) => (
                        <div key={index}>
                            <img src={val.path} alt='' style={{width:'100%',overflow:'hidden'}} />
                        </div>
                        ))}
                        </SwipeableViews>
                        <MobileStepper
                        steps={maxSteps}
                        position="static"
                        variant="text"
                        activeStep={activeStep}
                        nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                        }
                        backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        </Button>
                        }
                        />
                    </div>
                    <div style={{maxWidth:400}}>
                        <div>
                        <h3>V-neck Sweater</h3>
                        <div className='my-4' style={{borderBottomColor:'black',width:'100%',border:'solid',borderWidth:2}}/>
                        <div>A beautiful cashmere sweater. 
                            It's amazingly comfortable and held up with a cold wash/flat dry. 
                            Because its cashmere it takes a bit of work to keep it clean but its worth it with the look. 
                            It fits well, has a bit of room so you can wear an undershirt if needed. 
                            It didn't itch or scratch though. 
                            The sleeves are a little long but look good pushed up on the forearms. 
                            Overall, lovely shirt and soooo soft.</div>
                        </div>
                        <div className='d-flex' style={{marginTop:180,marginLeft:205}}>
                        <IconButton>
                            <Favorite color='secondary' fontSize='large' style={{marginRight:10}} />
                        </IconButton>
                        <Button variant='contained' color='primary' size='large'>Get it!</Button>
                        </div>
                    </div>
                    </div>
                </ModalBody>
            </Modal>
            <div className='boxhead gmb0'>
                <img src={img3} alt='' width='100%' />
                <div className='txt0'>
                    <div className='txt1'>
                        <div style={{marginLeft:'50px'}}>It start ...</div>
                        <div style={{marginLeft:'100px'}}>with you</div>
                    </div>
                </div>
            </div>
            <div className='d-flex' style={{justifyContent:'center',marginLeft:'200px',marginRight:'200px',marginBottom:'40px'}}>
                {rendermenu()}
                <input type='text' style={{marginLeft:'auto'}}/>
                <div className='cat1' style={{marginLeft:'10px'}}>Search</div>
            </div>
            <div className='row' style={{marginLeft:'200px',marginRight:'200px'}}>
                {rendermaterial()}
            </div>
            <Footer/>
        </div>
    )
}

export default Models