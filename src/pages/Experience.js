import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {devMain} from '../utils/apiURLs';
import axios from 'axios';
import { Card, Col } from 'react-bootstrap';

const Experience = () => {
    const param = useParams();
 
    const [phrases, setPhrases] = useState([]);

    const [loading, toggleLoading] = useState(true);

    const getPhrases = async () => {
       const res =  await axios.get(`${devMain}/experiences/${param.id}/phrases`)
        setPhrases(res.data.data);
        toggleLoading(false);
    }


    useEffect(() => {
        getPhrases();
    },[])

    const Phrases = () => {
        return (<div className="phrases">{phrases.map(phrase => <Col md={{span: 6, offset: 3}}><Card><Card.Body><Card.Text>{phrase.meaning}</Card.Text><Card.Text><em>"{phrase.phrase}"</em></Card.Text></Card.Body></Card></Col>)}</div>)
    }

    console.log(phrases);
    return (
        <div>
            Experience {param.id}
            <div>{loading ? "loading..." : <Phrases/>}</div>
        </div>
    )
}

export default Experience
