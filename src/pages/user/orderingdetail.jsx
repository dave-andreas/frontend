import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import { apiurl } from '../../helper/apiurl'
import {connect} from 'react-redux'
import {stepaction,firststep} from '../../redux/action'

import { useTheme } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from '@material-ui/core/MobileStepper'

import {Button,CardMedia,FormControl,InputLabel,Select,MenuItem,TextField} from '@material-ui/core'

function Orderingdetil ({actvstep,stepaction,firststep}) {
    const warna = ['Red','Orange','Yellow','Green','Blue','Nila','Purple']
    const [model,setmodel] = useState({})
    const [gmbmodel,setgmbmodel] = useState([])
    const [bahan,setbahan] = useState([])
    const [size,setsize] = useState([])

    useEffect (()=>{
        Axios.get(`${apiurl}/user/ordering?userid=${order.userid}&modelid=${order.modelid}`)
        .then(res=>{
            console.log(res.data)
            setmodel(res.data.model[0])
            setgmbmodel(res.data.gmbmodel)
            setbahan(res.data.bahan)
            setsize(res.data.size)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const [order,setorder] = useState({
        userid: localStorage.getItem('id'),
        modelid: localStorage.getItem('modelid'),
        bahanid:'',
        warna:'',
        bodysizeid:'',
        jumlah:''
    })

    const handle = e => {
        const {name,value} = e.target
        setorder({...order,[name]:value})
        console.log(order)
    }

    const theme = useTheme();
    const [gmbstep, setgmbstep] = useState(0)
    const maxSteps = gmbmodel.length

    const [openkat, setopenkat] = useState(false)
    const [openwar, setopenwar] = useState(false)
    const [opensize, setopensize] = useState(false)
    
    return (
        <div className='mt-4' style={{width:'80%'}}>
            <div className='d-flex justify-content-center' >
                <div style={{width:'50%',paddingRight:'9.5%'}}>
                    <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={gmbstep}
                    onChangeIndex={()=>setgmbstep(gmbstep)} >
                        {gmbmodel.map((val,index) => (
                            <div key={index} style={{width:'100%'}}>
                                <CardMedia style={{height:0,paddingTop:'120%'}} image={val.path[0] === 'p' ? `${apiurl}/${val.path}` :val.path}/>
                            </div>
                        ))}
                    </SwipeableViews>
                    
                    <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={gmbstep}
                    nextButton={
                        <Button size="small" onClick={()=>setgmbstep(gmbstep+1)} disabled={gmbstep === maxSteps - 1}>
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={()=>setgmbstep(gmbstep-1)} disabled={gmbstep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        </Button>
                    }
                    />
                </div>
                <div className='d-flex flex-column' style={{width:'50%',}}>
                    <div className='my-2'>
                        <div style={{fontSize:25}}>{model.name}</div>
                        <div style={{color:'#757575',fontSize:13}}>{model.kategori}</div>
                    </div>
                    <div className='mt-5'>
                        <FormControl  style={{width:'100%'}}>
                            <InputLabel>Fabric</InputLabel>
                            {bahan?
                                <Select
                                name="bahanid"
                                open={openkat}
                                onClose={()=>{setopenkat(false)}}
                                onOpen={()=>{setopenkat(true)}}
                                onChange={handle}
                                >
                                    <MenuItem value="">
                                        <em>choose your favorite</em>
                                    </MenuItem>
                                    {bahan.map((val,index)=>{
                                        return (
                                            <MenuItem key={index} value={val.idbahan}>{val.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            :null}
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <FormControl  style={{width:'100%'}}>
                            <InputLabel>Color</InputLabel>
                            {bahan?
                                <Select
                                name="warna"
                                open={openwar}
                                onClose={()=>{setopenwar(false)}}
                                onOpen={()=>{setopenwar(true)}}
                                onChange={handle}
                                >
                                    <MenuItem value="">
                                        <em>choose your mood</em>
                                    </MenuItem>
                                    {warna.map((val,index)=>{
                                        return (
                                            <MenuItem key={index} value={val}>{val}</MenuItem>
                                        )
                                    })}
                                </Select>
                            :null}
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <FormControl  style={{width:'100%'}}>
                            <InputLabel>Size</InputLabel>
                            {size?
                                <Select
                                name="bodysizeid"
                                open={opensize}
                                onClose={()=>{setopensize(false)}}
                                onOpen={()=>{setopensize(true)}}
                                onChange={handle}
                                >
                                    <MenuItem value="">
                                        <em>how are you</em>
                                    </MenuItem>
                                    {size.map((val,index)=>{
                                        return (
                                            <MenuItem key={index} value={val.id}>{val.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            :null}
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <FormControl style={{width:'100%'}}>
                            <TextField fullWidth type='number' name="jumlah" onChange={handle} label='How many?' />
                        </FormControl>
                    </div>
                    <div className='mt-auto mb-3 d-flex justify-content-end'>
                        <Button className='m-2' style={{color:'white'}} variant='contained' color='secondary' component={Link} to={'/models'}>cancle</Button>
                        <Button className='m-2' variant='contained' color='inherit' onClick={()=>stepaction('BACK')} disabled={actvstep === 0}>
                            Back
                        </Button>
                        <Button className='m-2' variant="contained" color="primary" onClick={()=>firststep(order)} disabled={order.bahanid && order.warna && order.jumlah ? false : true}>
                            {actvstep === 2 ? 'Save' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const statetoprops = ({ordering}) => {
    return {
        actvstep:ordering.activestep
    }
}

export default connect(statetoprops,{stepaction,firststep}) (Orderingdetil)