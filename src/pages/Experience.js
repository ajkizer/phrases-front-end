import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { devMain } from '../utils/apiURLs';
import axios from 'axios';
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';

const Experience = () => {
    const [phrases, setPhrases] = useState([]);
    const [loading, toggleLoading] = useState(true);

    const param = useParams();

    const getPhrases = async () => {
        const res = await axios.get(`${devMain}/experiences/${param.id}/phrases`)
        setPhrases(res.data.data);
        toggleLoading(false);
    }


    const updatePhrases = (data) => {
        setPhrases([data, ...phrases])
    }


    useEffect(() => {
        getPhrases();
    }, [])




    const PhraseCard = ({ phrase }) => {
        return (<Col md={{ span: 6, offset: 3 }}><Link to={`/dashboard/experiences/${param.id}/phrases/${phrase._id}`}><Card className="phrases__card"><Card.Body><Card.Text>{phrase.meaning}</Card.Text><Card.Text><em>"{phrase.phrase}"</em></Card.Text></Card.Body></Card></Link></Col>)
    }

    const Phrases = () => {
        return (<div className="phrases">{phrases.map(phrase => <PhraseCard phrase={phrase} />)}</div>)
    }

    const AddPhrase = ({ updatePhrases }) => {
        const [show, setShow] = useState(false);
        const [formData, setFormData] = useState({
            phrase: "",
            meaning: ""
        })

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const { phrase, meaning } = formData;


        const addPhrase = async (e) => {
            e.preventDefault();
            const URL = `${devMain}/experiences/${param.id}/phrases`
            try {
                const res = await axios.post(URL, formData)
                updatePhrases(res.data.data);
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }

        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }


        return (<div className="phrases__add-phrase"> <Button onClick={handleShow}>
            Add Phrase
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

    return (
        <div>
            <AddPhrase updatePhrases={updatePhrases} />
            Experience {param.id}
            <div>{loading ? "loading..." : <Phrases />}</div>
        </div>
    )
}

export default Experience
