import React from 'react';
import axios from 'axios';
import { Col, Card, Button} from 'react-bootstrap'
import EditPhrase from '../forms/EditPhrase'
import {devMain} from '../../utils/apiURLs'



const Variation = ({ child, children, setChildren }) => {

    const deletePhrase = async (e) => {
        e.preventDefault();
        await axios.delete(`${devMain}/phrases/${child._id}`)
        setChildren(children.filter(item => item._id !== child._id))
    }

    return (
        <Col className="mx-auto" md={{ span: 4 }}>
            <Card>
                <Card.Body>
                    <Button onClick={e=> deletePhrase(e)}>x</Button>
                    <EditPhrase child={child} setChildren={setChildren} children={children} />
                    <p>Phrase: {child.phrase}</p>
                    <p>Meaning: {child.meaning}</p>
                </Card.Body>
            </Card>
        </Col>
    )
}



export default Variation;