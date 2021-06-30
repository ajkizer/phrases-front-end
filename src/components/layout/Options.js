import React, {useContext} from 'react'
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';
import { PhraseContext } from '../../context/PhraseContext';
import AddPhrase from '../forms/AddPhrase'

const Options = ({setMode}) => {
     const {phrases, setPhrases} = useContext(PhraseContext)

    const viewPhrases = () => {
        setMode("viewPhrases")
    }

    const flashCards = () => {
        setMode("flashCards");
    }

    return (
        <Col>
            
                <div  className="options__buttons">
                <Col xs={{span: 1}}><Button variant="light" onClick={viewPhrases}><i class="fas fa-comment-lines"></i></Button></Col>
                <Col xs={{span: 1}}><Button variant="light" onClick={flashCards}><i class="far fa-book-open"></i></Button></Col>
                <Col xs={{span: 1}}><AddPhrase setPhrases={setPhrases} /></Col>
                </div>
           
           
        </Col>
    )
}


export default Options;