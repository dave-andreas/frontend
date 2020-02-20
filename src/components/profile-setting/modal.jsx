import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

const Modale=(prop)=>{
    const {open,togel,title,fung} = prop

    return(
        <div>
            <Modal isOpen={open} toggle={togel}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{prop.children}</ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={fung}>Save</button>
                    <button className='btn btn-danger' onClick={togel}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Modale