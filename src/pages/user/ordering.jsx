import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {stepaction} from '../../redux/action'
import Header from '../../components/header'
import Orderingdetil from './orderingdetail'
import Orderingconfirm from './orderingconfirm'
import Orderingfinal from './orderingfinal'

import {Stepper,Step,StepLabel,Button} from '@material-ui/core'
  
function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Orderingdetil/>
        case 1:
            return <Orderingconfirm/>
        case 2:
            return <Orderingfinal/>
        default:
            return 'Unknown stepIndex'
    }
}

function Ordering ({actvstep,stepaction}) {
    const steps = ['Make your own', 'Check again', 'Finally !'];

    return (
        <div>
            <Header />
            <div className='d-flex flex-column mx-5' style={{height:575,border:'solid 1px'}}>
                <div className='d-flex justify-content-center'>
                    {actvstep === steps.length ? (
                        <div className='d-flex flex-column mt-5' style={{width:'50%'}}>
                            <Button className='m-2' variant='contained' style={{backgroundColor:'salmon',color:'white',width:'100%'}} component={Link} to={'/profile'} onClick={()=>stepaction('RESET')}>go to cart</Button>
                            <Button className='m-2' variant='outlined' style={{width:'100%'}} color='primary' onClick={()=>stepaction('RESET')}>make a new one</Button>
                            <Button className='m-2' variant='contained' style={{width:'100%',color:'white'}} color='primary' component={Link} to={{pathname:'/models'}} onClick={()=>stepaction('RESET')}>choose other model</Button>
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