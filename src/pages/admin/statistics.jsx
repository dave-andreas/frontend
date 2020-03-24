import React, {useState} from 'react'
import Productstat from '../../components/stat/productstat'
import Orderstat from '../../components/stat/orderstat'
import Userstat from '../../components/stat/userstat'

import {ListItem,ListItemText,MenuItem,Menu,Paper} from '@material-ui/core'

function Statistics () {
    const options = [
        'Choose what you want to know',
        'Show statistics about products',
        'Show statistic about orders',
        'Show statistic about users',
    ]
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuItemClick = (index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const rencont = () => {
        switch (selectedIndex) {
            case 1 : return <Productstat/>
            case 2 : return <Orderstat/>
            case 3 : return <Userstat/>
            default : return <Productstat/>
        }
    }

    return (
        <div style={{marginTop:100,paddingLeft:10,width:'100%'}}>
            <ListItem button component={Paper} elevation={5} style={{backgroundColor:'#d1cada',width:'30%'}} onClick={handleClickListItem}>
                <ListItemText secondary={options[0]} primary={options[selectedIndex]} />
            </ListItem>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                {options.map((option, index) => (
                <MenuItem key={option} selected={index === selectedIndex} onClick={()=>handleMenuItemClick(index)} >
                    {option}
                </MenuItem>
                ))}
            </Menu>
            <div>
                {rencont()}
            </div>
        </div>
    )
}

export default Statistics