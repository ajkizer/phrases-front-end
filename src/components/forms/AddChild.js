import React, {useState} from 'react';
import {devMain} from '../../utils/apiURLs';

import {Button, Modal, Form} from 'react-bootstrap';

import axios from 'axios';


    const AddChild = ({ updatePhrase, currentPhrase }) => {
        const [show, setShow] = useState(false);
        const [formData, setFormData] = useState({
            phrase: "",
            meaning: ""
        })

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const { phrase, meaning } = formData;

    
        const addVariation = async (e) => {
            e.preventDefault();
            const URL = `${devMain}/experiences/${currentPhrase.language_experience}/phrases/${currentPhrase._id}`

            console.log({URL})


         
            try {
               
                const res = await axios.post(URL, formData);

                console.log(res);
                updatePhrase(res.data.data);
                setFormData({phrase: "", meaning: ""})
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }

        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }





        return (<div className="phrases__add-variation"> <Button variant="light" onClick={handleShow}>
            <i className="fas fa-comment-alt-lines"></i>
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Phrase Variation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addVariation}>
                        <Form.Group><Form.Label>Phrase</Form.Label><Form.Control onChange={changeHandler} value={phrase} name="phrase" type="text" placeholder="" /></Form.Group>
                        <Form.Group><Form.Label>Meaning</Form.Label><Form.Control value={meaning} onChange={changeHandler} name="meaning" type="text" placeholder="" /></Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>

                </Modal.Body>

            </Modal></div>)
    }


    export default AddChild