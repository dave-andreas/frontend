import React,{useEffect,useState} from 'react';
import './profile-setting.css'
import Axios from 'axios'
import {apiurl} from '../../helper/apiurl'
import {Paper,Table,TableHead,TableBody,TableRow,TableCell,IconButton,Button} from '@material-ui/core'
import {Info,Edit,Delete} from '@material-ui/icons'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'


function Bodysize () {
    const [boze,setboze] = useState([])

    useEffect(()=>{
        Axios.get(`${apiurl}/user/getboze/${localStorage.getItem('id')}`)
        .then(res=>{
            console.log(res.data)
            setboze(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const renderboze = () => {
        return boze.map((boze,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{boze.name}</TableCell>
                    <TableCell style={{width:'20%'}}>
                        <IconButton>
                            <Info/>
                        </IconButton>
                    </TableCell>
                    <TableCell style={{width:'20%'}}>
                        <IconButton>
                            <Edit/>
                        </IconButton>
                        <IconButton>
                            <Delete/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div style={{paddingLeft:'15%',paddingRight:'20%',marginTop:80}}>
            <Paper elevation={5}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>no.</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Detil</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderboze()}
                    </TableBody>
                </Table>
            </Paper>
            <Button className='mt-4' variant='contained' color='primary'>add new</Button>
            {/* <center>
                <div className='mt-4'>
                    <table className='table'>
                        <thead style={{backgroundColor:'#deddfa'}}>
                            <tr>
                                <td></td>
                                <td>Lingkar Pinggang</td>
                                <td>Lingkar Badan</td>
                                <td>Lebar Dada</td>
                                <td>Turun Leher</td>
                                <td>Panjang Muka</td>
                                <td>Lingkar Pinggul</td>
                                <td>Panjang Punggung</td>
                                <td>Lebar Pundak</td>
                                <td>Lebar Bahu</td>
                                <td>Kerung Lengan</td>
                                <td>Panjang Lengan</td>
                                <td>Lubang Lengan</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
            <div className='tombol'>
                <button className='btn btn-primary'>Add</button>
            </div> */}
        </div>
    )
}

export default Bodysize