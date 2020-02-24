import React from 'react';
import Header from '../../components/header';
import { useEffect,useState } from 'react';
import Axios from 'axios';
import { apiurl } from '../../helper/apiurl';

import {Table,TableBody,TableCell,TableHead,TableRow,Paper,Button} from '@material-ui/core'
import {Card,CardActionArea,CardActions,CardContent,CardMedia,IconButton} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

import card1 from '../../gambar/6d5600ad1831e5dd2a8e0cd047b07e80.jpg'
import card2 from '../../gambar/8ab694d24ee297d3bcab1e386ac656e3.jpg'
import card3 from '../../gambar/7316221a0e76458b24d28b245b9a3b2a.jpg'
import card4 from '../../gambar/e2b792f11b940e11599351c13a81e009.jpg'

const card = [card1,card2,card3,card4]

function AdmModels () {
    const [models,setmodels] = useState([])
    const [cat,setcat] = useState(0)
    

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/getmod`)
        .then(res=>{
            setmodels(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const rendermodels =()=>{
        return models.map((val,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.name}</TableCell>
                    <TableCell>{val.desc}</TableCell>
                    <TableCell>{val.harga}</TableCell>
                    <TableCell>{val.kategoriid}</TableCell>
                    <TableCell>
                        <Button variant='contained' color='primary'>Edit</Button>
                    </TableCell>
                    <TableCell>
                        <Button variant='contained' color='secondary'>Delete</Button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    const rendermaterial =()=>{
        if(cat===0){
            return models.map((val,index)=>{
                return (
                    <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                        <CardActionArea>
                            <CardMedia style={{height:0,paddingTop:'130%'}} image={card[index]} />
                        </CardActionArea>
                        <CardContent>
                            <div>
                                <h5 className='card-title' style={{fontSize:'13px'}}>{val.name}</h5>
                            </div>
                            <div className='d-flex'>
                                <div>
                                    {/* biar ke kanan */}
                                </div>
                                <div style={{marginLeft:'auto',marginBottom:-23,marginRight:-15,marginTop:-10}}>
                                    <IconButton>
                                        <EditIcon style={{fontSize:'20'}} />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon style={{fontSize:'20'}} />
                                    </IconButton>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })
        }else{
            return models.map((val,index)=>{
                if(val.kategoriid===cat){
                    return (
                        <Card key={index} elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                            <CardActionArea>
                                <CardMedia style={{height:0,paddingTop:'130%'}} image={card[index]} />
                            </CardActionArea>
                            <CardContent>
                                <div>
                                    <h5 className='card-title' style={{fontSize:'13px'}}>{val.name}</h5>
                                </div>
                                <div className='d-flex'>
                                    <div>
                                        {/* biar ke kanan */}
                                    </div>
                                    <div style={{marginLeft:'auto',marginBottom:-23,marginRight:-15,marginTop:-10}}>
                                        <IconButton>
                                            <EditIcon style={{fontSize:'20'}} />
                                        </IconButton>
                                        <IconButton>
                                            <DeleteIcon style={{fontSize:'20'}} />
                                        </IconButton>
                                    </div>
                                </div>
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
            <div style={{marginTop:'100px'}}>
                <center>
                    <div style={{fontSize:'25px',marginBottom:'50px'}}>
                        MANAGE MODELS
                    </div>
                    {/* <div style={{marginRight:'100px',marginLeft:'100px'}}>
                        <Paper elevation={10}>
                            <Table aria-label="simple table" style={{marginBottom:50}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Category</TableCell>
                                        <TableCell style={{width:'100px'}}></TableCell>
                                        <TableCell style={{width:'100px'}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rendermodels()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div> */}
                </center>
                <div className='row' style={{marginLeft:'200px',marginRight:'200px'}}>
                    {rendermaterial()}
                    <Card elevation={7} style={{marginRight:'18px',marginLeft:'18px',marginBottom:'40px',width:200}}>
                        <CardActionArea>
                            <AddIcon style={{fontSize:200}} />
                        </CardActionArea>
                        <CardContent>
                            <div>
                                <h5 className='card-title' style={{fontSize:'13px'}}>Add New</h5>
                            </div>
                            <div className='d-flex'>
                                <div>
                                    {/* biar ke kanan */}
                                </div>
                                <div style={{marginLeft:'auto',marginBottom:-23,marginRight:-15,marginTop:-10}}>
                                    <IconButton>
                                        <AddCircleIcon style={{fontSize:'20'}} />
                                    </IconButton>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AdmModels