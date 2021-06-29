import React, { useEffect, useContext, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import { devMain } from '../utils/apiURLs';
import axios from 'axios';
import { Card, Col, Modal, Button, Form, Row } from 'react-bootstrap';
import FlashCards from '../components/activities/Study';
import DeleteConfirm from '../components/forms/DeleteConfirm';
import { AuthContext } from '../context/AuthContext';

const Experience = () => {
    const [phrases, setPhrases] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const {value, setValue} = useContext(AuthContext)


    console.log(value);
    
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




    const PhraseCard = ({ phrase }) => {
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


        return (<Col md={{ span: 6, offset: 3 }}><Card className="phrases__card"><Card.Body><Button onClick={deletePhrase}><i className="fas fa-trash"></i></Button><Link to={`/dashboard/experiences/${param.id}/phrases/${phrase._id}`}><Card.Text>{phrase.meaning}</Card.Text><Card.Text><em>"{phrase.phrase}"</em></Card.Text><Card.Text>{phrase.nativeText && phrase.nativeText}</Card.Text></Link></Card.Body></Card></Col>)
    }

    const Phrases = () => {
        return (<div className="phrases">{phrases.map(phrase => <PhraseCard phrase={phrase} />)}</div>)
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


        return (<div className="phrases__add-phrase"> <Button onClick={handleShow}>
            Add Phrase
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
            getAllPhrases();
        },[])
        
        return(<div>{mode === "viewPhrases" ? <Phrases/> : mode === "flashCards" ? <FlashCards children={children}/> : <></>}</div>)

    }

    const Options = () => {
        const [mode, setMode] = useState("viewPhrases");

        const viewPhrases = () => {
            setMode("viewPhrases")
        }

        const flashCards = () => {
            setMode("flashCards");
        }

        return (
            <Col>
                
                    <div  className="options__buttons">
                    <Col xs={{span: 1}}><Button onClick={viewPhrases}>View Phrases</Button></Col>
                    <Col xs={{span: 1}}><Button onClick={flashCards}>Study</Button></Col>
                    <Col xs={{span: 1}}><AddPhrase updatePhrases={updatePhrases} /></Col>
                    </div>
               
                <Selection mode={mode}/>
            </Col>
        )
    }




    return (
        <div>
            <div>{loading ? "loading..." : <Options/>}</div>
        </div>
    )
}

export default Experience
