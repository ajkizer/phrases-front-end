import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { devMain } from '../utils/apiURLs';
import axios from 'axios';
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';
import FlashCards from '../components/activities/Study';
import DeleteConfirm from '../components/forms/DeleteConfirm';
import PhraseCard from '../components/cards/PhraseCard'
import { AuthContext } from '../context/AuthContext';

const Experience = () => {
    const [phrases, setPhrases] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const {user, setUser} = useContext(AuthContext);
    
    const param = useParams();

    const getPhrases = async () => {
        const res = await axios.get(`${devMain}/experiences/${param.id}/phrases`)
        setPhrases(res.data.data);
        toggleLoading(false);
    }


    const updatePhrases = (data) => {
        setPhrases([data, ...phrases])
    }


    useEffect(() => {
        getPhrases();
    }, [])





    const Phrases = () => {
        return (<Row className="phrases">{phrases.map(phrase => <PhraseCard param={param} phrase={phrase} />)}</Row>)
    }

    const AddPhrase = ({ updatePhrases }) => {
        const [show, setShow] = useState(false);
        const [formData, setFormData] = useState({
            phrase: "",
            meaning: ""
        })

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const { phrase, meaning } = formData;


        const addPhrase = async (e) => {
            e.preventDefault();
            const URL = `${devMain}/experiences/${param.id}/phrases`
            try {
                const res = await axios.post(URL, formData)
                updatePhrases(res.data.data);
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }

        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }


        return (<div className="phrases__add-phrase"> <Button variant="light" onClick={handleShow}>
       <i class="far fa-comment-alt-plus"></i>
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Phrase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addPhrase}>
                        <Form.Group><Form.Label>Phrase</Form.Label><Form.Control onChange={changeHandler} value={phrase} name="phrase" type="text" placeholder="" /></Form.Group>
                        <Form.Group><Form.Label>Meaning</Form.Label><Form.Control value={meaning} onChange={changeHandler} name="meaning" type="text" placeholder="" /></Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>

                </Modal.Body>

            </Modal></div>)
    }


    const Selection = ({mode}) => {

        const [children, setChildren] = useState([])


        const getAllPhrases = async () => {

            const URL = `${devMain}/experiences/${param.id}/phrases?v=0`
            const phrases = await axios.get(URL);

            setChildren(phrases.data.data);
        }
        
        useEffect(() => {
            if(!user.isAuthenticated) {
                window.location.href="login"
            }
            getAllPhrases();
        },[])
        
        return(<div>{mode === "viewPhrases" ? <Phrases/> : mode === "flashCards" ? <FlashCards children={children}/> : <></>}</div>)

    }

    const [mode, setMode] = useState("viewPhrases");

    const Options = ({setMode}) => {
     

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
                    <Col xs={{span: 1}}><AddPhrase updatePhrases={updatePhrases} /></Col>
                    </div>
               
               
            </Col>
        )
    }




    return (
        <div>
            <div>{loading ? "loading..." : <Col><Options setMode={setMode}/> <Selection mode={mode}/></Col>}</div>
        </div>
    )
}

export default Experience
