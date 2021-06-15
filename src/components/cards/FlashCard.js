import React, {useState} from 'react';
import {Col, Card, Button} from 'react-bootstrap';


const FlashCard = ({ child, showNext }) => {
    const [showAnswer, setShowAnswer] = useState(false)

    const handleHide = () => setShowAnswer(false)
    const handleShow = () => setShowAnswer(true)

    const handleClick = () => {
        handleHide();
        showNext();
    }


    return (
        <Col className="mx-auto" md={{ span: 7 }}>
            <Card>
                <p>Phrase: {child.phrase}</p>
                {showAnswer ? <><p>Meaning: {child.meaning}</p><div><Button onClick={handleHide}>Hide</Button><Button onClick={handleClick}>Next</Button></div></> : <div><p><em>Answer Hidden</em></p><Button onClick={handleShow}>Show Answer</Button> </ div >}
            </Card>
        </Col>
    )
}


export default FlashCard