import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, CardMedia } from '@material-ui/core'
import { apiurl } from '../../helper/apiurl'

function Orderstat () {
    const [total,settotal] = useState()
    const [dipesan,setdipesan] = useState()
    const [stat,setstat] = useState([])
    const [sumstat,setsumstat] = useState(0)

    const statordit = (stat) => {
        switch (stat) {
            case -1 : return 'canceled'
            case 0 : return 'not yet paid'
            case 1 : return 'waiting for payment confirmation'
            case 2 : return 'payment confirmed'
            case 3 : return 'clothes are being made'
            case 4 : return 'clothes are already completed'
            case 5 : return 'being sent'
            case 6 : return 'wait for user confirmation'
            case 7 : return 'order completed'
            default : return 'something hapend ...'
        }
    }

    useEffect(()=>{
        Axios.get(`${apiurl}/admin/total`)
        .then(res=>{
            settotal(res.data.total[0].total)
            setdipesan(res.data.dipesan[0].dipesan)
            Axios.get(`${apiurl}/admin/statorder`)
            .then(res=>{
                setstat(res.data)
                res.data.forEach(stat=>{
                    setsumstat(prev => prev += stat.jumlah)
                })
            }).catch(err=>{
                console.log(err)
            })
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const renstat = () => {
        return stat.map((stat,index)=>{
            return (
                <TableRow key={index}>
                    <TableCell align='center'>{stat.statusorder}</TableCell>
                    <TableCell>{statordit(stat.statusorder)}</TableCell>
                    <TableCell align='center'>{stat.jumlah}</TableCell>
                    <TableCell align='center'>{Math.round(stat.jumlah / sumstat * 100)} %</TableCell>
                </TableRow>
            )
        })
    }

    return (
        <div className='d-flex' style={{marginTop:20,marginBottom:40}}>
            <div style={{width:'35%'}}>
                <div className='my-2' style={{fontSize:25}}>Total Number</div>
                <TableContainer component={Paper} elevation={6}>
                    <Table size='small'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Total sellig set count</TableCell>
                                <TableCell>{dipesan} set</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total money gain</TableCell>
                                <TableCell>Rp {total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='ml-5' style={{width:'55%'}}>
                <div className='my-2' style={{fontSize:25}}>Status Order</div>
                <TableContainer component={Paper} elevation={6}>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Status</TableCell>
                                <TableCell style={{fontWeight:'bold'}}>Description</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Count</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Percentage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renstat()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Orderstat