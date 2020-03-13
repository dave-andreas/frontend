import React, {useState} from 'react';
import { useEffect } from 'react';
import Axios from 'axios'
import {Redirect,Link} from 'react-router-dom'
import {apiurl} from '../../helper/apiurl'

import {IconButton,CardMedia,Button,TextField,Select,MenuItem,InputLabel,FormControl,Chip,Input} from '@material-ui/core'
import {Edit,Delete,AddCircle,Save} from '@material-ui/icons'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from '@material-ui/core/MobileStepper'

import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

import Header from '../../components/header'


function getStyles (val,fab) {
    var x = {fontWeight:'normal'}
    fab.forEach(fab=>{
        if(fab.idbahan===val.idbahan){
            x = {fontWeight:'bolder'}
        }
    })
    return x
}

function Editmodel ({location}) {
    // const {id} = location
    // const id = localStorage.getItem('modelid')
    const [id,setid] = useState(localStorage.getItem('modelid'))
    const [model,setmodel] = useState({})
    const [img,setimg] = useState([])
    const [kat,setkat] = useState([])
    const [fab,setfab] = useState([])
    const [newfab,setnewfab] = useState([])
    const [allfab,setallfab] = useState([])


    useEffect(()=>{
        setid(localStorage.getItem('modelid'))
        Axios.get(`${apiurl}/admin/getmodetil/${id}`)
        .then(res=>{
            setmodel(res.data.model[0])
            setimg(res.data.image)
            setkat(res.data.kat)
            Axios.get(`${apiurl}/admin/selectfab/${id}`)
            .then(res=>{
                setfab(res.data.fab)
                setnewfab(res.data.fab)
                setallfab(res.data.allfab)
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const imgedit =()=>{
        return img.map((val,index)=>{
            return (
                <div key={index} className='mt-1' onClick={()=>setActiveStep(index)} style={{paddingLeft:'30%'}}>
                    <CardMedia style={{height:0,paddingTop:'130%',borderRadius:'4px'}} image={val.path} />
                </div>
            )
        })
    }


    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0)
    const maxSteps = img.length
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleStepChange = step => {
        setActiveStep(step);
    };


    const handler = e => {
        console.log(model)
        const {id,value} = e.target
        setmodel({...model,[id]:value})
    }
    const handleselect = e => {
        console.log(model)
        const {name,value} = e.target
        setmodel({...model,[name]:value})
    }
    const [editname,seteditname] = useState(true)
    const [editdesk,seteditdesk] = useState(true)
    const [editharga,seteditharga] = useState(true)
    const [editkat,seteditkat] = useState(true)
    const [editfab,seteditfab] = useState(true)
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }  
    const handlemulti = e => {
        const {id,value} = e.target
        // setfab({...fab,[id]:value,idmodel:localStorage.getItem('modelid')})
        setfab(e.target.value)
        console.log(fab)
    }
    const saveicon = () => {
        Axios.put(`${apiurl}/admin/editmod`,model)
        .then(res=>{
            setmodel(res.data.model[0])
            setimg(res.data.image)
            setkat(res.data.kat)
            seteditname(true)
            seteditdesk(true)
            seteditharga(true)
            seteditkat(true)
        }).catch(err=>{
            console.log(err)
        })
    }


    const [modlt,setmodlt] = useState(false)
    const [modone,setmodone] = useState(false)
    const delt = () => {
        Axios.get(`${apiurl}/admin/delmod2/${id}`)
        .then(res=>{
            console.log(res)
            setmodone(!modone)
        }).catch(err=>{
            console.log(err)
        })
    }


    const chipcolor =(val,newfab)=> {
        var x = 'secondary'
        newfab.forEach(newfab=>{
            if(newfab.idbahan===val.idbahan){
                x = 'primary'
            }
        })
        return x
    }
    const renchip = () => {
        if(allfab){
            return allfab.map((val,index)=>{
                return (
                    <Chip key={index} label={val.name} color={chipcolor(val,newfab)} size='small' className='m-1' 
                        onClick={()=>{
                            newfab.push(val)
                            console.log(newfab)
                        }} />
                )
            })
        }
    }
    

    if(!id){
        return (
            <Redirect to={{pathname:'/main'}} />
        )
    }
    return (
        <div>
            <Header/>

            <Modal isOpen={modlt} toggle={()=>setmodlt(!modlt)}>
                <ModalHeader>Delete {model.name}</ModalHeader>
                <ModalBody>Are you sure want to delete this colection ?</ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant='contained' color='primary' onClick={()=>delt()}>Sure</Button>
                    <Button variant='contained' color='secondary' onClick={()=>setmodlt(!modlt)}>Nope</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modone} toggle={()=>{
                setid(0)
                localStorage.removeItem('modelid')
                }}>
                <ModalBody>The colection have been remove</ModalBody>
                <ModalFooter>
                    <Button className='mx-2' variant='contained' color='primary' onClick={()=>{
                        setid(0)
                        localStorage.removeItem('modelid')
                        }}>
                        You're Welcome</Button>
                </ModalFooter>
            </Modal>

            <div className='d-flex justify-content-center' style={{marginTop:80}}>
                <div style={{width:'80%'}}>
                    <div className='d-flex justify-content-between' style={{width:'100%',fontSize:30,paddingLeft:30,paddingRight:20}}>
                        {model.name?
                        <FormControl style={{width:'100%'}}>
                            <TextField fullWidth id="name" value={model.name} onChange={handler} disabled={editname} label='Model Name' />
                        </FormControl>
                        :null}
                        {editname ? 
                        <IconButton onClick={()=>seteditname(!editname)}>
                            <Edit />
                        </IconButton>
                        :
                        <IconButton onClick={()=>saveicon()}>
                            <Save />
                        </IconButton>
                        }
                    </div>
                    <div className='d-flex align-items-stretch' style={{width:'100%'}}>
                        <div className='d-flex align-items-stretch pt-3' style={{width:'50%'}}>
                            <div style={{width:'20%'}}>
                                {imgedit()}
                                {img.length ? 
                                    <Button variant='outlined' color='inherit' className='mt-1' style={{width:'70%',marginLeft:'30%'}}><Delete/></Button>
                                :null}
                                {img.length < 3 ? 
                                    <Button variant='outlined' color='inherit' className='mt-1' style={{width:'70%',marginLeft:'30%'}}><AddCircle/></Button>
                                :null}
                            </div>
                            <div className='pt-1 justify-content-center' style={{width:'80%',paddingRight:'10%',paddingLeft:'1%'}}>
                                <div>
                                <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={activeStep}
                                onChangeIndex={handleStepChange} >
                                    {img.map((val,index) => (
                                        <div key={index} style={{width:'100%'}}>
                                            <CardMedia style={{height:0,paddingTop:'120%'}} image={val.path}/>
                                        </div>
                                    ))}
                                    {/* <GridListTileBar titlePosition='top' actionIcon={
                                        <IconButton><Delete color='inherit' /></IconButton>
                                    }
                                    style={{backgroundColor:'transparent',border:'solid'}} 
                                    /> */}
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
                            </div>
                        </div>
                        <div className='d-flex flex-column' style={{width:'50%',paddingTop:30,height:520,paddingBottom:10}}>
                            <div className='d-flex justify-content-between mb-3' style={{width:'100%',fontSize:30,paddingLeft:30,paddingRight:20}}>
                                <FormControl style={{width:'100%'}}>
                                    {model.name?
                                        <TextField fullWidth multiline rowsMax='4' id="desk" value={model.desk} onChange={handler} disabled={editdesk} label='Description' />
                                    :null}
                                </FormControl>
                                {editdesk ? 
                                <IconButton onClick={()=>seteditdesk(!editdesk)}>
                                    <Edit />
                                </IconButton>
                                :
                                <IconButton onClick={()=>saveicon()}>
                                    <Save />
                                </IconButton>
                                }
                            </div>
                            <div className='d-flex justify-content-between mb-3' style={{width:'100%',fontSize:30,paddingLeft:30,paddingRight:20}}>
                                <FormControl style={{width:'100%'}}>
                                    {model.name?
                                        <TextField fullWidth type='number' id="harga" value={model.harga} onChange={handler} disabled={editharga} label='Price' />
                                    :null}
                                </FormControl>
                                {editharga ? 
                                <IconButton onClick={()=>seteditharga(!editharga)}>
                                    <Edit />
                                </IconButton>
                                :
                                <IconButton onClick={()=>saveicon()}>
                                    <Save />
                                </IconButton>
                                }
                            </div>
                            <div className='d-flex justify-content-between mb-3' style={{width:'100%',fontSize:30,paddingLeft:30,paddingRight:20}}>
                                <FormControl  style={{width:'100%'}}>
                                    <InputLabel>Category</InputLabel>
                                    {model.name?
                                        <Select
                                        name="kategoriid" disabled={editkat}
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={model.kategoriid}
                                        onChange={handleselect}
                                        >
                                            <MenuItem value="">
                                                <em>select category</em>
                                            </MenuItem>
                                            {kat.map((val,index)=>{
                                                return (
                                                    <MenuItem key={index} value={val.id}>{val.name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    :null}
                                </FormControl>
                                {editkat ? 
                                <IconButton onClick={()=>seteditkat(!editkat)}>
                                    <Edit />
                                </IconButton>
                                :
                                <IconButton onClick={()=>saveicon()}>
                                    <Save />
                                </IconButton>
                                }
                            </div>
                            <div className='d-flex justify-content-between mb-3' style={{width:'100%',fontSize:30,paddingLeft:30,paddingRight:20}}>
                                {allfab? 
                                    <Select
                                        id="idbahan"
                                        multiple disabled={editfab}
                                        value={fab}
                                        onChange={handlemulti}
                                        input={<Input id="select-multiple-chip" />}
                                        style={{width:'90%'}}
                                        renderValue={selected => (
                                            <div className='d-flex flex-wrap'>
                                            {selected.map((value,index) => (
                                                <Chip key={index} label={value.name} className='m-2' />
                                            ))}
                                            </div>
                                        )}
                                        >
                                            {allfab.map((val,index) => (
                                                <MenuItem key={index} value={val}
                                                style={getStyles(val, fab)}
                                                >
                                                    {val.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                :null}
                                {editfab ? 
                                <IconButton onClick={()=>seteditfab(!editfab)}>
                                    <Edit />
                                </IconButton>
                                :
                                <IconButton onClick={()=>seteditfab(!editfab)}>
                                    <Save />
                                </IconButton>
                                }
                            </div>
                            <div className='d-flex flex-wrap justify-content-start mb-3' style={{width:'100%',fontSize:30,paddingLeft:30,paddingRight:20}}>
                                {renchip()}
                            </div>
                            
                            <div className='d-flex mt-auto justify-content-end'>
                                <Button className='mx-1' variant='contained' color='primary' style={{width:'100%'}} onClick={()=>{
                                    setid(0)
                                    localStorage.removeItem('modelid')
                                    }}>
                                    Back to dashboard
                                </Button>
                                <Button className='mx-1' variant='contained' color='secondary' onClick={()=>setmodlt(!modlt)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editmodel