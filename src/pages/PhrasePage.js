import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { devMain } from '../utils/apiURLs'
import { Card, Row, Col, Button, Form, Modal } from 'react-bootstrap'
import EditPhrase from '../components/forms/EditPhrase'

const PhrasePage = () => {
    const [currentPhrase, setCurrentPhrase] = useState({})
    const [children, setChildren] = useState([])
    const [loading, toggleLoading] = useState(true);
    const [mode, setMode] = useState("viewAll")
    const { id, phrase_id } = useParams();


    const getPhrase = async () => {
        const res = await axios.get(`${devMain}/phrases/${id}`)
        setCurrentPhrase(res.data.data.phrase);
        setChildren(res.data.data.children);
        toggleLoading(false);
    }


    const updatePhrase = (item) => {
        setChildren([...item, children])
    }

    useEffect(() => {
        getPhrase();
    }, [])

    const startStudySession = () => setMode("flashCards")
    const viewAll = () => setMode("viewAll")


    console.log(mode)







    const FlashCard = ({ child, showNext }) => {
        const [showAnswer, setShowAnswer] = useState(false)

        const handleHide = () => setShowAnswer(false)
        const handleShow = () => setShowAnswer(true)


        return (
            <Col className="mx-auto" md={{ span: 7 }}>
                <Card>
                    <p>Phrase: {child.phrase}</p>
                    {showAnswer ? <><p>Meaning: {child.meaning}</p><div><Button onClick={handleHide}>Hide</Button><Button onClick={showNext}>Next</Button></div></> : <div><p><em>Answer Hidden</em></p><Button onClick={handleShow}>Show Answer</Button> </ div >}
                </Card>
            </Col>
        )
    }




    const Variation = ({ child }) => {

        return (
            <Col className="mx-auto" md={{ span: 4 }}>
                <Card>
                    <Card.Body>
                        <EditPhrase child={child} setChildren={setChildren} children={children}/>
                        <p>Phrase: {child.phrase}</p>
                        <p>Meaning: {child.meaning}</p>
                    </Card.Body>
                </Card>
            </Col>
        )
    }




    const AddChild = ({ updatePhrase, currentPhrase }) => {
        const [show, setShow] = useState(false);
        const [formData, setFormData] = useState({
            phrase: "",
            meaning: ""
        })

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const { phrase, meaning } = formData;

    
        const addVariation = async (e) => {
            e.preventDefault();
            const URL = `${devMain}/experiences/${currentPhrase.language_experience}/phrases/${currentPhrase._id}`

            console.log({URL})


         
            try {
               
                const res = await axios.post(URL, formData);
                updatePhrase(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }





        return (<div className="phrases__add-variation"> <Button variant="light" onClick={handleShow}>
            <i className="fas fa-comment-alt-lines"></i>
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Phrase Variation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addVariation}>
                        <Form.Group><Form.Label>Phrase</Form.Label><Form.Control onChange={changeHandler} value={phrase} name="phrase" type="text" placeholder="" /></Form.Group>
                        <Form.Group><Form.Label>Meaning</Form.Label><Form.Control value={meaning} onChange={changeHandler} name="meaning" type="text" placeholder="" /></Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>

                </Modal.Body>

            </Modal></div>)
    }




    const Study = ({ children }) => {
        const [cards, setCards] = useState()




        const shuffleArray = array => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }

            return array
        }



        useEffect(() => {
            const deck = shuffleArray(children);
            setCards(deck);
        }, [])



        const showNext = () => {
            let deck = cards;

            const currentCard = deck[0]

            deck.push(currentCard);

            deck.shift();

            console.log(deck);


            setCards([...deck])
        }

        return (<div>{cards && <FlashCard child={cards[0]} showNext={showNext} />}</div>)

    }




    const TakeNotes = ({ children }) => {

        return (<div>{children.map(item => <Variation key={item._id} child={item} />)}</div>)
    }

    return (

        loading ? <>"loading"</> : <div>


            <Col md={{ span: 7 }} className="mx-auto mb-2">
                <Card>
                    <h2>Phrase: {currentPhrase.phrase}</h2>
                    <p>{currentPhrase.meaning}</p>


                    <AddChild updatePhrase={updatePhrase} currentPhrase={currentPhrase} />


                    <div><Button variant="light" onClick={startStudySession}><i class="fas fa-books"></i></Button></div>


                    <div><Button variant="light" onClick={viewAll}><i class="fad fa-pencil-alt"></i></Button></div>

                </Card>
            </Col>
            <Row>
                {mode === "flashCards" ? <Study children={children} /> : <TakeNotes children={children} />}
            </Row>
        </div >)
}


export default PhrasePage
