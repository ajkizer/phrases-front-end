import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { devMain } from '../utils/apiURLs';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import {PhraseContext} from '../context/PhraseContext'

const Experience = () => {
    const [loading, toggleLoading] = useState(true);
    const {user, setUser} = useContext(AuthContext);
    const {phrases, setPhrases} = useContext(PhraseContext)
    
    const param = useParams();

    //generates phrases from currentExperience
    //TODO: Save language to localstorage, check if langauge info is already in there, and display this data instead of making an api call.
    const getPhrases = async () => {
        const res = await axios.get(`${devMain}/experiences/${param.id}/phrases`)
        setPhrases(res.data.data);
        toggleLoading(false);
    }


    useEffect(() => {
        getPhrases();
    }, [])

    return (
        <div>{phrases.map(phrase => <Card>{phrase.phrase}</Card>)}</div>
    )
}

export default Experience
