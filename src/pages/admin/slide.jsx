// import React from 'react';
// import SwipeableViews from 'react-swipeable-views';

// const styles = {
//   slide: {
//     padding: 15,
//     minHeight: 100,
//     color: '#fff',
//   },
//   slide1: {
//     background: '#FEA900',
//   },
//   slide2: {
//     background: '#B3DC4A',
//   },
//   slide3: {
//     background: '#6AC0FF',
//   },
// };

// function MyComponent () {
//     return (
//         <div style={{margin:100,borderColor:'yellow'}}>
//             <SwipeableViews>
//                 <div style={Object.assign({}, styles.slide, styles.slide1)}>
//                     slide n°1
//                 </div>
//                 <div style={Object.assign({}, styles.slide, styles.slide2)}>
//                     slide n°2
//                 </div>
//                 <div style={Object.assign({}, styles.slide, styles.slide3)}>
//                     slide n°3
//                 </div>
//             </SwipeableViews>
//         </div>
//     )
// }

// export default MyComponent;

import React from 'react';
import { makeStyles,useTheme } from '@material-ui/core/styles';// useTheme u/ corsl
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';// u/ corsl
import { Modal,ModalBody,CustomInput,Table } from 'reactstrap'
import { useState,useEffect,useRef } from 'react';
import Axios from 'axios';
import { apiurl } from '../../helper/apiurl';
import {Redirect,Link} from 'react-router-dom'
// sisahnya akal2an super dari material developer

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://www.johnstonsofelgin.com/media/catalog/product/cache/7/image/1200x1800/85e4522595efc69f496374d01ef2bf13/k/a/kal01138_sc7122_55a7333_1.jpg',
  },
  {
    label: 'Bird',
    imgPath:
      'https://www.johnstonsofelgin.com/media/catalog/product/cache/7/image/1200x1800/85e4522595efc69f496374d01ef2bf13/k/a/kal01138_sc7122_55a7316_1.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://www.johnstonsofelgin.com/media/catalog/product/cache/7/image/1200x1800/85e4522595efc69f496374d01ef2bf13/k/a/kal01138_sc7122_55a7335_1.jpg',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://www.johnstonsofelgin.com/media/catalog/product/cache/7/image/1200x1800/85e4522595efc69f496374d01ef2bf13/k/a/kal01138_sc7122_55a7331_1.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
    flexGrow: 1,
    margin:50,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    // height: 100,
    // paddingTop: '130%',
    // display: 'block',
    // maxWidth: 400,
    // overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;
  const [open,setopen] = useState (false)
  const [modal,setmodal] = useState (false)

  var datas = [
    {bahanid:1,path:'ada'},
    {bahanid:1,path:'apa'},
    {bahanid:1,path:'dengan'},
    {bahanid:1,path:'cinta'},
  ]

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  const maut = () => {
    Axios.post(`${apiurl}/admin/coba`, datas)
    .then(res=>{
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  // ====================================== upload ======================================

  const [addimagefile,setimageadd]=useState({
    // addImageFileName:'pilih foto..',
    // addImageFile:undefined,
  })
  const [data,setdata]=useState(null)
  const [datainput]=useState({
    userid:useRef()
  })

  // useEffect(()=>{
  //   const fetchdata= async()=>{
  //     try {
  //       const fahkran=await Axios.get(`${apiurl}product/gettrans`)
  //       // datainput.userid.current.focus()
  //       setdata(fahkran.data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchdata()
  // },[])

  const adddata=()=>{
    var formdata=new FormData()
    console.log(datainput)
    console.log(datainput.userid.current.value)
    const {userid}=datainput
    const data={
      userid:userid.current.value,
    }
    
    // const token=localStorage.getItem('token')
    // var Headers={
    //   headers:
    //   {
    //     'Content-Type':'multipart/form-data',
    //     'Authorization':`Bearer ${token}`
    //   },
    // }

    formdata.append('image',addimagefile.addImageFile)
    formdata.append('data',JSON.stringify(data))
    Axios.post(`${apiurl}/admin/upload`,formdata,{
      headers:{
        'Content-Type':'multipart/form-data',
        // 'Authorization':`Bearer ${token}`
      },
    })
    .then((res)=>{
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  const mtfckr = () => {
    console.log(addimagefile)
    const formdata = new FormData()
    formdata.append('image', addimagefile.addImageFile)
    // formdata.append('name', 'apalah')
    formdata.append('bahanid', 333)
    Axios.post(`${apiurl}/admin/upload`,formdata,
    {
      headers:{
        'Content-Type':'multipart/form-data'
      },
    })
    .then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  const onAddImageFileChange=(event)=>{
    // console.log(document.getElementById('addImagePost').files[0])
    console.log(event.target.files[0])
    var file=event.target.files[0]
    if(file){
      setimageadd({...addimagefile,addImageFile:event.target.files[0]})
    }else{
      setimageadd({...addimagefile,addImageFileName:'pilih foto',addImageFile:undefined})
    }
  }

  // const renderdata=()=>{
  //   if(data===null){
  //     return (
  //       <tr>
  //         <td>loading...</td>
  //       </tr>
  //     )
  //   }else if(data.length===0){
  //     return(
  //       <tr>
  //         <td>tidak ada data...</td>
  //       </tr>
  //     )
  //   }else{
  //     return data.map((val,index)=>{
  //       return (
  //         <tr key={index}>
  //           <td>{index+1}</td>
  //           <td>{val.userid}</td>
  //           <td>{val.status}</td>
  //           <td>{val.tanggal}</td>
  //           <td><img src={`${apiurl+val.paymentimg}`} alt={val.image} height='100px'/></td>
  //         </tr>
  //       )
  //     })
  //   }
  // }

  const [bool,setbool] = useState(false)

  const [direc,setdirec] = useState(false)

  if(direc){
    return(
      <Redirect to={{pathname:'/coba', state:datas}} />
    )
  }
  return (
    <div>
        <div className='btn btn-primary' onClick={()=>setopen(!open)} style={{margin:5}}>Klik</div>
        <div className='btn btn-danger' onClick={()=>setmodal(!modal)} style={{margin:5}}>Modal</div>
        <Button variant='contained' color='default' onClick={()=>maut()} style={{margin:5}} size='small'>Tombol maut</Button>
        <Button variant='contained' color='primary' style={{margin:5}}>apalahitu</Button>
        <Button variant={bool?'contained':'outlined'} color='primary' onClick={()=>setbool(!bool)} size='small'>maut</Button>
        <Button variant='text' onClick={()=>setdirec(!direc)}>passing state</Button>
        <Link to={{pathname:'/coba',id:3}}>
          <div className='btn btn-primary'>
            kirim state dengan link
          </div>
        </Link>
        <div>
          <Table striped bordered>
            <thead>
              <tr>
                <th>No.</th>
                <th>userid</th>
                <th>status</th>
                <th>tanggal</th>
                <th>foto</th>
              </tr>
            </thead>
            <tbody>
              {/* {renderdata()} */}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td><input type='number' placeholder='userid' ref={datainput.userid} /></td>
                <td><CustomInput id='foto' type='file' label={addimagefile.addImageFileName} onChange={onAddImageFileChange} multiple /></td>
                <td><button onClick={mtfckr} className='btn btn-primary'> add foto</button></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td><input type='number' placeholder='userid' ref={datainput.userid} /></td>
                <td><CustomInput id='foto' type='file' label={addimagefile.addImageFileName} onChange={onAddImageFileChange} /></td>
                <td><button onClick={mtfckr} className='btn btn-primary'> add foto</button></td>
                <td></td>
              </tr>
            </tfoot>
          </Table>
        </div>

        <Modal isOpen={open} toggle={()=>setopen(!open)}>
            <ModalBody>
                <div className='m-5'>
                    <Paper elevation={0}>
                        <Paper square elevation={0} className={classes.header}>
                            <Typography>{tutorialSteps[activeStep].label}</Typography>
                        </Paper>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}// nentuin arah slide
                            index={activeStep}// munculkan step ke brp
                            onChangeIndex={handleStepChange}// berganti kalo di swipe tanpa stepper
                            enableMouseEvents // jadi bisa swipe
                        >
                            {tutorialSteps.map((step, index) => (
                            <div key={step.label}>
                                {/* eteneri dibawah supaya tidak ngeload semua section */}
                                {Math.abs(activeStep - index) <= 2 ?
                                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                                : null}
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
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                            }
                            backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                            }
                        />
                    </Paper>

                </div>
            </ModalBody>
        </Modal>

        <Paper elevation={7} 
        // className={classes.root}
        style={{maxWidth:300,margin:50}}
        >
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
          >
            {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              <img src={step.imgPath} alt={step.label} style={{width:'100%'}} />
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
        </Paper>
        
        <Modal isOpen={modal} toggle={()=>setmodal(!modal)} size='lg'>
          <ModalBody>
            <div className='d-flex mr-4'>
              <div style={{marginLeft:-16,marginTop:-16,marginBottom:-16,marginRight:40,maxWidth:360}}>
                <SwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                >
                  {tutorialSteps.map((step, index) => (
                  <div key={index}>
                    <img src={step.imgPath} alt={step.label} style={{width:'100%'}} />
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
              <div style={{maxWidth:400,border:''}}>
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
                    <FavoriteIcon color='secondary' fontSize='large' style={{marginRight:10}} />
                  </IconButton>
                  <Button variant='contained' color='primary' size='large'>Get it!</Button>
                </div>
              </div>
              </div>
          </ModalBody>
        </Modal>
    </div>
  );
}

export default SwipeableTextMobileStepper;
