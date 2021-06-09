import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { devMain } from '../utils/apiURLs'
import { Card, Row, Col, Button } from 'react-bootstrap'

const PhrasePage = () => {
    const [phrase, setPhrase] = useState({})
    const [loading, toggleLoading] = useState(true);
    const { id } = useParams();


    const getPhrase = async () => {
        const res = await axios.get(`${devMain}/phrases/${id}`)
        setPhrase(res.data.data);
        toggleLoading(false);
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

    return (

        loading ? <>"loading"</> : <div>


            <Col md={{ span: 7 }} className="mx-auto mb-2">
                <Card>
                    <h2>Phrase: {phrase.phrase}</h2>
                    <p>{phrase.meaning}</p>
                </Card>
            </Col>
            <Row>

                {phrase.variations.length && phrase.variations.map(item => <FlashCard variation={item} />
                )}
            </Row>
        </div >)
}


export default PhrasePage
