import React from 'react'
import {Paper,Table,TableHead,TableBody,TableRow,TableCell,TableContainer} from '@material-ui/core'

function Orderlist () {
    return (
        <div style={{marginTop:90,marginBottom:'100px',paddingRight:100,paddingLeft:100,width:'100%'}}>
            <div style={{fontSize:'25px',marginBottom:'40px'}}>
                ORDER LIST
            </div>
            <TableContainer component={Paper} elevation={6}>
                <Table style={{minWidth:700}} size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight:'bold'}}>no.</TableCell>
                            <TableCell style={{fontWeight:'bold'}}>username</TableCell>
                            <TableCell align='right' style={{fontWeight:'bold'}}>order date</TableCell>
                            <TableCell align='right' style={{fontWeight:'bold'}}>payment date</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>order status</TableCell>
                            <TableCell align='center' style={{fontWeight:'bold'}}>detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Orderlist