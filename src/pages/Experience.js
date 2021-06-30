import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { devMain } from '../utils/apiURLs';
import axios from 'axios';
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';
import FlashCards from '../components/activities/Study';
import DeleteConfirm from '../components/forms/DeleteConfirm';
import PhraseCard from '../components/cards/PhraseCard'
import { AuthContext } from '../context/AuthContext';
import {PhraseContext} from '../context/PhraseContext'

import Options from '../components/layout/Options'

const Experience = () => {
    const [loading, toggleLoading] = useState(true);
    const {user, setUser} = useContext(AuthContext);
    const {phrases, setPhrases} = useContext(PhraseContext)
    
    const param = useParams();

    const getPhrases = async () => {
        const res = await axios.get(`${devMain}/experiences/${param.id}/phrases`)
        setPhrases(res.data.data);
        toggleLoading(false);
    }


    useEffect(() => {
        getPhrases();
    }, [])





    const Phrases = () => {
        return (<Row className="phrases">{phrases.map(phrase => <PhraseCard key={phrase._id} param={param} phrase={phrase} />)}</Row>)
    }



    const Selection = ({mode}) => {

        const [flashCards, setFlashCards] = useState(phrases)

        
        useEffect(() => {
            if(!user.isAuthenticated) {
                window.location.href="/login"
            }
        },[])
        

        return(flashCards.length > 0 && <div>{mode === "viewPhrases" ? <Phrases/> : mode === "flashCards" ? <FlashCards flashCards={flashCards}/> : <></>}</div>)

    }

    const [mode, setMode] = useState("viewPhrases");




    return (
        <div>
            <div>{loading ? "loading..." : <Col><Options setMode={setMode}/> <Selection mode={mode}/></Col>}</div>
        </div>
    )
}

export default Experience
