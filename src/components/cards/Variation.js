import React from 'react';
import axios from 'axios';
import { Col, Card, Button} from 'react-bootstrap'
import EditPhrase from '../forms/EditPhrase'
import {devMain} from '../../utils/apiURLs'
import DeleteConfirm from '../forms/DeleteConfirm';



const Variation = ({ child, children, setChildren }) => {

    const deletePhrase = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`${devMain}/phrases/${child._id}`)
        } catch (error) {
            console.log(error);
        }
       
        setChildren(children.filter(item => item._id !== child._id))
    }

    console.log(child);
    return (
        <Col className="mx-auto" md={{ span: 4 }}>
            <Card>
                <Card.Body>
                    <Button onClick={deletePhrase} variant="light"><i class="fas fa-trash"></i></Button>
                    <EditPhrase child={child} setChildren={setChildren} children={children} />
                    <p>Phrase: {child.phrase}</p>
                    <p>Meaning: {child.meaning}</p>
                    {child.nativeText && <em>{child.nativeText}</em>}
                </Card.Body>
            </Card>
        </Col>
    )
}



export default Variation;