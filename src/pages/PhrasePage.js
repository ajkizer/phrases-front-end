import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios';
import { Link, Redirect, useParams } from 'react-router-dom';
import { devMain } from '../utils/apiURLs'
import { Card, Row, Col, Button } from 'react-bootstrap'
import AddChild from '../components/forms/AddChild';
import Variation from '../components/cards/Variation'
import Study from '../components/activities/Study'
import { AuthContext } from '../context/AuthContext';

const PhrasePage = () => {
    const [currentPhrase, setCurrentPhrase] = useState()
    const [children, setChildren] = useState([])
    const [loading, toggleLoading] = useState(true);
    const [mode, setMode] = useState("viewAll")
    const { id, phrase_id } = useParams();
    const {user, setUser} = useContext(AuthContext)
    console.log(id, phrase_id)

    const getPhrase = async () => {
        const res = await axios.get(`${devMain}/phrases/${phrase_id}`)
        setCurrentPhrase(res.data.data.phrase);
        setChildren(res.data.data.children);
        toggleLoading(false);
    }


    const updatePhrase = (item) => {
        setChildren([...children, item])
    }

    useEffect(() => {
     
        getPhrase();
    }, [])



    const startStudySession = () => setMode("flashCards")
    const viewAll = () => setMode("viewAll")


    console.log(mode)

    const TakeNotes = ({ children }) => {

        return (<div>{children.map(item => <Variation setChildren={setChildren} children={children} key={item._id} child={item} />)}</div>)
    }



    if(!user.isAuthenticated){
        return <Redirect to="/login"/>
    }

    return (

        loading ? <>"loading"</> : <div>

                {currentPhrase && 
            <Col md={{ span: 7 }} className="mx-auto mb-2">
                <Button variant="light"><Link to={`/dashboard/experiences/${id}`}><i class="fas fa-arrow-left"></i></Link></Button>
                <Card>
                    <h2>Phrase: {currentPhrase.phrase}</h2>
                    <p>{currentPhrase.meaning}</p>
                    {currentPhrase.nativeText && <em>{currentPhrase.nativeText}</em>}


                    <AddChild updatePhrase={updatePhrase} currentPhrase={currentPhrase} />


                    <div><Button variant="light" onClick={startStudySession}><i class="fas fa-books"></i></Button></div>


                    <div><Button variant="light" onClick={viewAll}><i class="fad fa-eye"></i></Button></div>

                </Card>
            </Col>
}
            <Row>
                {mode === "flashCards" ? <Study flashCards={children} /> : <TakeNotes children={children} />}
            </Row>
        </div >)
}


export default PhrasePage
