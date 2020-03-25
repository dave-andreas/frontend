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
    const [kat,setkat] = useState([])
    const [models,setmodels] = useState([])
    const [cat,setcat] = useState(0)
    const [gambar,setgambar] = useState([])

    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = gambar.length
    const [modal,setmodal] = useState(false)
    const [id,setid] = useState()

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getmod/0`)
        .then(res=>{
            setmodels(res.data)
            Axios.get(`${apiurl}/admin/getkat`)
            .then(res=>{
                setkat(res.data)
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    },[])

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/getmod/${cat}`)
        .then(res=>{
            setmodels(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[cat])

    const [cari,setcari] = useState('') //hanya menambahkan petik, jadi ga ilang2an porduk nya
    const handle = e => {
        setcari(e.target.value)
    }

    useEffect (()=>{
        Axios.get(`${apiurl}/admin/carimod?cari=${cari}`)
        .then(res=>{
            setmodels(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[cari])

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleStepChange = step => {
        setActiveStep(step);
    };

    const [modit,setmodit] = useState({})
    const [bahan,setbahan] = useState([])
    const [komen,setkomen] = useState([])
    const detil =(index,id)=>{
        console.log(id)
        setmodit(models[index])
        setid(id)
        Axios.get(`${apiurl}/admin/getgmb/${id}`)
        .then(res=>{
            setgambar(res.data.gambar)
            setbahan(res.data.bahan)
            setkomen(res.data.komen)
            console.log(res.data.komen)
            setmodal(!modal)
        }).catch(err=>{
            console.log(err)
        })
    }

    const rendermenu=()=>{
        return kat.map((kat,index)=>{
            return (
                <div className='cat' key={index} onClick={()=>setcat(kat.id)}>
                    {kat.name}
                </div>
            )
        })
    }

    const rendermaterial =()=>{
        return models.map((val,index)=>{
            return (
                <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                    <CardActionArea onClick={()=>detil(index,val.id)}>
                        <CardMedia style={{height:0,paddingTop:'130%'}} image={val.path ? (val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path) : `null`} />
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
    }

    return (
        <div>
            <Header/>
            <Modal isOpen={modal} toggle={()=>{setmodal(!modal);setActiveStep(0)}} size='lg'>
                <ModalBody>
                    <div className='d-flex mr-4'>
                        <div style={{marginLeft:-14,marginTop:-14,marginBottom:-14,marginRight:40,maxWidth:360}}>
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
                            <div >
                                <h2>{modit.name}</h2>
                                <div className='mt-2 mb-4' style={{borderBottomColor:'black',width:'100%',border:'solid',borderWidth:2}}/>
                                <div className='mb-3' >
                                    {modit.desk}
                                </div>
                                <div className='mb-3'>
                                    Available Fabric : <br/>
                                    {bahan.map((bahan,index)=>{
                                        return (
                                            <div key={index}>- {bahan.name}, <em>Rp {bahan.harga}/set</em></div>
                                        )
                                    })}

                                </div>
                                <div className='d-flex justify-content-end mb-5'><strong>Rp {modit.harga}</strong>/set</div>
                                <div className='mb-3' style={{width:'100%',border:'solid 1px #d1cada'}}/>
                                <div className='mt-3'>
                                    <div><h5>Reveiw ({komen.length})</h5></div>
                                    {komen.length ?
                                    komen.map((komen,index)=>{
                                        return <div key={index}><strong>{komen.username}</strong> {komen.komen}</div>
                                    })
                                    :<div>no comment yet</div>}
                                </div>
                            </div>
                            <div className='d-flex justify-content-end mt-auto' >
                                {/* <IconButton>
                                    <Favorite color='secondary' fontSize='large' style={{marginRight:10}} />
                                </IconButton> */}
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
                <div className='cat' onClick={()=>setcat(0)}>
                    ALL
                </div>
                {rendermenu()}
                <input type='text' placeholder='find here' onChange={handle} style={{marginLeft:'auto'}}/>
            </div>
            <div className='row' style={{marginLeft:'200px',marginRight:'200px'}}>
                {rendermaterial()}
            </div>
            <Footer/>
        </div>
    )
}

export default Models
