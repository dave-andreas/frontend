import React from 'react';
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

function coba ({location}) {
    console.log(location)
    return (
        <div>
            OKELAH KALO BEGITU
            <Button variant='contained' color='secondary'>
                <Link to={'/slide'} style={{textDecoration:'none',color:'white',margin:-5}}>
                    to slide
                </Link>
            </Button>
        </div>
    )
}

export default coba