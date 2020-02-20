import React from 'react';
import './profile-setting.css'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Bodysize () {
    return (
        <div>
            <center>
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
            </div>
        </div>
    )
}

export default Bodysize