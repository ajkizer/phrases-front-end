import React from 'react'
import {Card, Button, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {devMain} from '../../utils/apiURLs';

const PhraseCard = ({phrase, phrases, param, setPhrases}) => {
    // const deletePhrase = async (e) => {
    //     e.preventDefault();
    //     try {
           
    //         await axios.delete(`${devMain}/phrases/${phrase._id}`);
    //     } catch (error) {
    //         console.log(error)
    //     }

    //    const updateIndex = phrases.map(item => item._id).indexOf(phrase._id);

    //     setPhrases([...phrases.slice(0, updateIndex), ...phrases.slice(updateIndex+1)])
    // }


    return (<Col md={{ span: 3}}><Card className="phrases__card"><Card.Body><Link to={`/dashboard/experiences/${param.id}/phrases/${phrase._id}`}><Card.Text>{phrase.meaning}</Card.Text><Card.Text><em>"{phrase.phrase}"</em></Card.Text><Card.Text>{phrase.nativeText && phrase.nativeText}</Card.Text></Link></Card.Body></Card></Col>)
}

export default PhraseCard
