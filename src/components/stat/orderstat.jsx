import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, CardMedia } from '@material-ui/core'
import { apiurl } from '../../helper/apiurl'

function Orderstat () {
    const [total,settotal] = useState()
    const [dipesan,setdipesan] = useState()
    const [stat,setstat] = useState([])
    const [trafic,settrafic] = useState([])
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
                Axios.get(`${apiurl}/admin/trafic`)
                .then(res=>{
                    settrafic(res.data)
                }).catch(err=>{
                    console.log(err)
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

    const rentrafic = () => {
        if (trafic.length){
            return trafic.map((trafic,index)=>{
                if(trafic.tanggalorder || trafic.tanggalbayar){
                    return (
                        <TableRow key={index}>
                            <TableCell>{trafic.tanggalorder ? trafic.tanggalorder : trafic.tanggalbayar}</TableCell>
                            <TableCell align='center'>{trafic.pesan ? trafic.pesan : 0}</TableCell>
                            <TableCell align='center'>{trafic.bayar ? trafic.bayar : 0}</TableCell>
                            <TableCell align='center'>Rp {trafic.jumlah ? trafic.jumlah : 0}</TableCell>
                        </TableRow>
                    )
                }
            })
        }
    }

    return (
        <div className='d-flex' style={{marginTop:20,marginBottom:40}}>
            <div style={{width:'40%'}}>
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
                <div className='my-2 mt-4' style={{fontSize:25}}>Order Traffic</div>
                <TableContainer component={Paper} elevation={6}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:'bold'}}>Date</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Orders Count</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Pay Count</TableCell>
                                <TableCell align='center' style={{fontWeight:'bold'}}>Total Paid</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rentrafic()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='ml-5' style={{width:'50%'}}>
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