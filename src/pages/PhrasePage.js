import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {devMain} from '../utils/apiURLs'

const PhrasePage = () => {
    const [phrase, setPhrase] = useState({})
    const {id} = useParams();


    const getPhrase = async () => {
        const res = await axios.get(`${devMain}/phrases/${id}`)
        setPhrase(res.data.data);
    }


    useEffect(() => {
        getPhrase();
    },[])

    console.log(phrase);
    
    return (
        <div>
            This is phrase {id}
        </div>
    )
}

export default PhrasePage
