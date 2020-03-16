import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { apiurl } from '../../helper/apiurl'
import {stepaction} from '../../redux/action'
import Header from '../../components/header'
import Orderingdetil from './orderingdetail'
import Orderingconfirm from './orderingconfirm'

import { useTheme } from '@material-ui/core/styles'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import SwipeableViews from 'react-swipeable-views'
import MobileStepper from '@material-ui/core/MobileStepper'

import {Stepper,Step,StepLabel,Button,Typography,CardMedia,FormControl,InputLabel,Select,MenuItem,TextField,Paper} from '@material-ui/core'
import orderingconfirm from './orderingconfirm'
  
function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Orderingdetil/>
        case 1:
            return <Orderingconfirm/>
        case 2:
            return 'Save To chart';
        default:
            return 'Unknown stepIndex';
    }
}

function Ordering ({actvstep,stepaction}) {
    const steps = ['Make your own', 'Check again', 'Save it !'];

    return (
        <div>
            <Header />
            <div className='d-flex flex-column mx-5' style={{marginTop:80,height:575}}>
                <div className='d-flex justify-content-center'>
                    {actvstep === steps.length ? (
                        <div className='d-flex flex-column align-items-center'>
                            <Typography>Go to chart</Typography>
                            <Button variant='contained' color='inherit' onClick={()=>stepaction('RESET')}>Make a new one</Button>
                        </div>
                    ) : (
                        getStepContent(actvstep)
                    )}
                </div>
                <Stepper className='mt-auto' activeStep={actvstep} alternativeLabel>
                    {steps.map(steps => (
                        <Step key={steps}>
                            <StepLabel>{steps}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </div>
    )
}

const statetoprops = ({ordering}) => {
    return {
        actvstep:ordering.activestep
    }
}

export default connect(statetoprops,{stepaction}) (Ordering)