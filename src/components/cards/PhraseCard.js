import React, {useContext} from 'react'
import {Card, Button, Col, ButtonGroup} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {devMain} from '../../utils/apiURLs';
import { PhraseContext } from '../../context/PhraseContext';
import EditPhrase from '../forms/EditPhrase'

const PhraseCard = ({phrase, param}) => {
    const {phrases, setPhrases} = useContext(PhraseContext)

    const deletePhrase = async (e) => {
        e.preventDefault();
        try {
           
            await axios.delete(`${devMain}/phrases/${phrase._id}`);
        } catch (error) {
            console.log(error)
        }

       const updateIndex = phrases.map(item => item._id).indexOf(phrase._id);

        setPhrases([...phrases.slice(0, updateIndex), ...phrases.slice(updateIndex+1)])
    }


    return (<Col md={{ span: 3}}><Card className="phrases__card"><Card.Body><Link to={`/dashboard/experiences/${param.id}/phrases/${phrase._id}`}><Card.Text>{phrase.meaning}</Card.Text><Card.Text><em>"{phrase.phrase}"</em></Card.Text><Card.Text>{phrase.nativeText && phrase.nativeText}</Card.Text></Link><ButtonGroup><Button onClick={deletePhrase}>Delete</Button><EditPhrase currentPhrase={phrase}/></ButtonGroup></Card.Body></Card></Col>)
}

export default PhraseCard
