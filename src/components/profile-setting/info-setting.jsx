import React from 'react';
import './profile-setting.css'

function Infosetting () {
    return (
        <div>
            <center>
                <div className='mt-4'>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Username</td>
                                <td>Username</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>Gender</td>
                            </tr>
                            <tr>
                                <td>Age</td>
                                <td>Age</td>
                            </tr>
                            <tr>
                                <td>Full Name</td>
                                <td>Full Name</td>
                            </tr>
                            <tr>
                                <td>Hanphone</td>
                                <td>Hanphone</td>
                            </tr>
                            <tr>
                                <td>Addres</td>
                                <td>Addres</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
            <div className='tombol'>
                <button className='btn btn-warning'>edit</button>
            </div>
        </div>
    )
}

export default Infosetting