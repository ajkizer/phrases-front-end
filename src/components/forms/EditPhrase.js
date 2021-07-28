import React, {useState, useContext} from 'react'
import {Modal, Form, Button} from 'react-bootstrap';
import {devMain} from '../../utils/apiURLs';
import axios from 'axios'
import { PhraseContext } from '../../context/PhraseContext';

const EditPhrase = ({ child }) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        phrase: child.phrase,
        meaning: child.meaning,
        nativeText: child.nativeText || null
    })

    const {phrases, setPhrases} = useContext(PhraseContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { phrase, meaning, nativeText } = formData;


    const editPhrase = async (e) => {
        e.preventDefault();
        const URL = `${devMain}/phrases/${child._id}`

        try {
            const updateIndex = phrases.map(item => item._id).indexOf(child._id);
            const res = await axios.put(URL, formData)

            console.log(res.data)
            setPhrases([...phrases.slice(0, updateIndex), {...phrases[updateIndex], ...formData}, ...phrases.slice(updateIndex+1)])
            
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
                <Form onSubmit={editPhrase}>
                    <Form.Group><Form.Label>Phrase</Form.Label><Form.Control onChange={changeHandler} value={phrase} name="phrase" type="text" placeholder="" /></Form.Group>
                    <Form.Group><Form.Label>Meaning</Form.Label><Form.Control value={meaning} onChange={changeHandler} name="meaning" type="text" placeholder="" /></Form.Group>
                    {phrase.nativeText &&  <Form.Group><Form.Label>NativeText</Form.Label><Form.Control value={nativeText} onChange={changeHandler} name="nativeText" type="text" placeholder="" /></Form.Group>}
                   
                    <Button type="submit">Submit</Button>
                </Form>

            </Modal.Body>

        </Modal></div>)
}

export default EditPhrase
