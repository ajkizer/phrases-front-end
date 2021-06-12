import React, {useState} from 'react'
import {Modal, Form, Button} from 'react-bootstrap';
import {devMain} from '../../utils/apiURLs';
import axios from 'axios'

const EditPhrase = ({ child, children, setChildren }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        phrase: child.phrase,
        meaning: child.meaning
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { phrase, meaning } = formData;


    const editChild = async (e) => {
        e.preventDefault();
        const URL = `${devMain}/phrases/${child._id}`

        try {
            const updateIndex = children.map(item => item._id).indexOf(child._id);
            setChildren([...children.slice(0, updateIndex), {...children[updateIndex], ...formData}, ...children.slice(updateIndex+1)])
            const res = await axios.put(URL, formData)
            
        } catch (error) {
            console.log(error);
        }
    }

    const changeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }





    return (<div className="phrases__add-variation"> <Button variant="light" onClick={handleShow}>
        <i class="fad fa-pencil-alt"></i>
    </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Variation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={editChild}>
                    <Form.Group><Form.Label>Phrase</Form.Label><Form.Control onChange={changeHandler} value={phrase} name="phrase" type="text" placeholder="" /></Form.Group>
                    <Form.Group><Form.Label>Meaning</Form.Label><Form.Control value={meaning} onChange={changeHandler} name="meaning" type="text" placeholder="" /></Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>

            </Modal.Body>

        </Modal></div>)
}

export default EditPhrase
