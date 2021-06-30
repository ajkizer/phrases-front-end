import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import { PhraseContext } from '../../context/PhraseContext';
import axios from 'axios';
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';
import {devMain} from '../../utils/apiURLs'

const AddPhrase = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        phrase: "",
        meaning: ""
    })

    const param = useParams();
    const {phrases, setPhrases} = useContext(PhraseContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { phrase, meaning } = formData;


    const addPhrase = async (e) => {
        e.preventDefault();
        const URL = `${devMain}/experiences/${param.id}/phrases`
        try {
            const res = await axios.post(URL, formData)

            console.log([...phrases, res.data.data])

            setPhrases([...phrases, res.data.data])
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const changeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    return (<div className="phrases__add-phrase"> <Button variant="light" onClick={handleShow}>
   <i class="far fa-comment-alt-plus"></i>
    </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Phrase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={addPhrase}>
                    <Form.Group><Form.Label>Phrase</Form.Label><Form.Control onChange={changeHandler} value={phrase} name="phrase" type="text" placeholder="" /></Form.Group>
                    <Form.Group><Form.Label>Meaning</Form.Label><Form.Control value={meaning} onChange={changeHandler} name="meaning" type="text" placeholder="" /></Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>

            </Modal.Body>

        </Modal></div>)
}

export default AddPhrase