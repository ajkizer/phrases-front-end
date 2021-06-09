import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { devMain } from '../utils/apiURLs'
import { Card, Row, Col, Button, Form, Modal } from 'react-bootstrap'

const PhrasePage = () => {
    const [phrase, setPhrase] = useState({})
    const [loading, toggleLoading] = useState(true);
    const { id } = useParams();


    const getPhrase = async () => {
        const res = await axios.get(`${devMain}/phrases/${id}`)
        setPhrase(res.data.data);
        toggleLoading(false);
    }


    const updatePhrase = (item) => {
        setPhrase({...phrase, variations: [...phrase.variations, item]})
    }

    useEffect(() => {
        getPhrase();
    }, [])

    console.log(phrase);


    const Variation = ({ variation }) => {
        return (
            <Col className="mx-auto" md={{ span: 4 }}>
                <Card>
                    <p>Phrase: {variation.phrase}</p>
                    <p>Meaning: {variation.meaning}</p>
                </Card>
            </Col>
        )
    }


    const FlashCard = ({ variation }) => {
        const [showAnswer, setShowAnswer] = useState(false)

        const handleHide = () => setShowAnswer(false)
        const handleShow = () => setShowAnswer(true)


        return (
            <Col className="mx-auto" md={{ span: 7 }}>
                <Card>
                    <p>Phrase: {variation.phrase}</p>
                    {showAnswer ? <><p>Meaning: {variation.meaning}</p><div><Button onClick={handleHide}>Hide</Button></div></> : <div><p><em>Answer Hidden</em></p><Button onClick={handleShow}>Show Answer</Button> </ div >}
                </Card>
            </Col>
        )
    }

    const AddVariation = ({ updatePhrase }) => {
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
            const URL = `${devMain}/phrases/${id}/variations`
            try {
                const res = await axios.put(URL, formData);
                updatePhrase(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }


        return (<div className="phrases__add-variation"> <Button onClick={handleShow}>
            Add Variation
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Variation</Modal.Title>
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
    return (

        loading ? <>"loading"</> : <div>


            <Col md={{ span: 7 }} className="mx-auto mb-2">
                <Card>
                    <h2>Phrase: {phrase.phrase}</h2>
                    <p>{phrase.meaning}</p>
                    <AddVariation updatePhrase={updatePhrase}/>
                </Card>
            </Col>
            <Row>

                {phrase.variations.length && phrase.variations.map(item => <FlashCard variation={item} />
                )}
            </Row>
        </div >)
}


export default PhrasePage
