import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import {devMain} from '../utils/apiURLs';
import axios from 'axios';
import { Card } from 'react-bootstrap';

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
        return (<>{phrases.map(phrase => <Card>{phrase.meaning}</Card>)}</>)
    }

    return (
        <div>
            Experience {param.id}
            <div>{loading ? "loading..." : <Phrases/>}</div>
        </div>
    )
}

export default Experience
