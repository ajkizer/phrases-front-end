import React, { useState } from 'react'
import { Modal, Button } from 'bootstrap'


const DeleteConfirm = ({ }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirm = (e) => {
       
        handleClose();
    }

    const cancel = (e) => {
        e.preventDefault();
        handleClose();
    }
    return (
        <div className="phrases__add-variation">
            <Button variant="light" onClick={handleShow}>
                <i class="fad fa-trash"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to delete this item?</p>
                    <Button onClick={confirm}>Yes</Button><Button onClick={cancel}>No</Button>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default DeleteConfirm
