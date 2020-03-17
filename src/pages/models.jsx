import React, {useState,useEffect} from 'react';
import './models.css'
import Axios from 'axios';
import {apiurl} from '../helper/apiurl'
import {Link} from 'react-router-dom'

import {Favorite} from '@material-ui/icons'
import {Card, CardActionArea, CardContent, CardMedia, Button, IconButton} from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from '@material-ui/core/MobileStepper'
import {Modal, ModalBody} from 'reactstrap'

import Header from '../components/header'
import Footer from '../components/footer'
import img3 from '../gambar/photo-128278505_1.jpg'

function Models () {
    const arr = ['ALL','Outwear','Topwear','Dress','Jumpsuit','Traditional','Pants','Skirt']
    const [sty,setsty] = useState([{color:'salmon'}])
    const [models,setmodels] = useState([])
    const [cat,setcat] = useState(0)
    const [gambar,setgambar] = useState([])

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = gambar.length
    const [modal,setmodal] = useState(false)
    const [index,setindex] = useState()
    const [id,setid] = useState()

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getmod`)
        .then(res=>{
            console.log(res.data)
            setmodels(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleStepChange = step => {
        setActiveStep(step);
    };

    const detil =(index,id)=>{
        setindex(index)
        setid(id)
        setmodal(!modal)
        Axios.get(`${apiurl}/admin/getgmb/${id}`)
        .then(res=>{
            setgambar(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const gatlik=(x)=>{
        var nesty=[]
        setsty([])
        nesty[x]={color:'salmon'}
        setsty(nesty)
        setcat(x)
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
                        <CardActionArea onClick={()=>detil(index,val.id)}>
                            <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path ? (val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path) :null} />
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
                            <CardActionArea onClick={()=>detil(index,val.id)}>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path ? (val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path) :null} />
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
                                    <div key={index} style={{width:360}}>
                                        <CardMedia style={{height:0,paddingTop:'150%'}} image={val.path ? (val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path) :null}/>
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
                        <div className='d-flex flex-column' style={{width:400}}>
                            <div>
                                {index >= 0 ? <h3>{models[index].name}</h3> : null}
                                <div className='my-4' style={{borderBottomColor:'black',width:'100%',border:'solid',borderWidth:2}}/>
                                <div>
                                    {index >= 0 ? models[index].desk :null}
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-auto'>
                                <IconButton>
                                    <Favorite color='secondary' fontSize='large' style={{marginRight:10}} />
                                </IconButton>
                                <Button variant='contained' color='primary' size='large' component={Link} to={{pathname:'/ordering'}} style={{color:'white'}} onClick={()=>localStorage.setItem('modelid',id)}>Get it!</Button>
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