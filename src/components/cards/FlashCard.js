import React, {useState} from 'react';
import {Col, Card, Button, ButtonGroup} from 'react-bootstrap';


const FlashCard = ({ flashCard, showNext, showPrevious }) => {
    const [showAnswer, toggleShowAnswer] = useState(false)

    console.log(flashCard);


    const handleClick = () => {
        toggleShowAnswer(!showAnswer);
    }


    const next = (option) => {
        toggleShowAnswer(false);
        showNext(option)
    }

    console.log(flashCard)


    return (
        <Col className="flash-card mx-auto" md={{ span: 7 }}>
            <Card className={`p-5`}>

                <p className="flash-card__phrase">{flashCard.phrase}</p>


                {showAnswer &&   <div className="card__grow"><p className="flash-card__phrase">{flashCard.meaning}</p>{flashCard.nativeText && <p>{flashCard.nativeText}</p>}</div>}
              
                <ButtonGroup><Button onClick={() => next("bad")}variant="danger"><i class="fal fa-frown"></i></Button><Button onClick={next}variant="success"><i class="fal fa-smile-wink"></i></Button></ButtonGroup>


                <div>
    
                   
                <Button variant="light" onClick={handleClick}><i class="far fa-repeat-alt"></i></Button>
        
                </div>

              
               
            </Card>
        </Col>
    )
}


export default FlashCard