import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { devMain, auth } from '../utils/apiURLs'
import { Col, Card, Modal, Form, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {ExperienceContext} from '../context/ExperienceContext'

const Dashboard = () => {
    const [loading, toggleLoading] = useState(true);
    const [experiences, setExperiences] = useState([]);
    const {user, setUser} = useContext(AuthContext)



    const getExperiences = async () => {
        try {
            const res = await axios.get(`${devMain}/experiences`)
            setExperiences(res.data.data);    
        } catch (error) {
            console.log(error);
        }

        toggleLoading(false);

    }

    console.log(user);

    useEffect(() => {


        getExperiences();

    }, [])

    const AddExperience = () => {
        const [show, setShow] = useState(false);
        const [formData, setFormData] = useState({
            nativeLanguage: "",
            targetLanguage: ""
        })



        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const { nativeLanguage, targetLanguage } = formData;





        const createExperience = async (e) => {
            e.preventDefault();
            try {
                const res = await axios.post(`${devMain}/experiences`, formData)
                setExperiences([...experiences, res.data.data])
                handleClose();
            } catch (error) {
                console.log(error);
            }
        }




        const changeHandler = e => {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

        return (
            <div className="experiences__add-experiencew">
                
                <Button onClick={handleShow}>Add Experience</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={createExperience}>
                            <Form.Group><Form.Label>Native Language</Form.Label><Form.Control onChange={changeHandler} value={nativeLanguage} name="nativeLanguage" type="text" placeholder="" /></Form.Group>
                            <Form.Group><Form.Label>Target Language</Form.Label><Form.Control value={targetLanguage} onChange={changeHandler} name="targetLanguage" type="text" placeholder="" /></Form.Group>
                            <Button type="submit">Submit</Button>
                        </Form>

                    </Modal.Body>

                </Modal>
            </div>
        )
    }




    const Experiences = () => {



        const removeExperience = async (id) => {
            const URL = `${devMain}/experiences/${id}`
            console.log(URL)

            try {
                console.log(await axios.delete(URL))
                setExperiences(experiences.filter(item => item._id !== id))
            } catch (error) {
                console.log(error);
            }

        }

        return (
            <div className="dashboard__experiences">
           
              

                {experiences.length === 0 && <p>No experiences found</p>}
                {experiences.map(experience => <Col md={{ span: 6, offset: 3 }}>

                    <Card>
                        <Link to={`/dashboard/experiences/${experience._id}`} >
                            <p>Native Language: {experience.nativeLanguage}</p>
                            <p>Target Language: {experience.targetLanguage}</p>
                        </Link>
                        <Button onClick={(e) => { removeExperience(experience._id) }}>Delete</Button>
                    </Card>

                </Col>)}</div>)
    }

    return (
        <div className="dashboard">

            {!user.isAuthenticated && <Redirect to="/login"/>}
            {loading ? "loading..." : <><AddExperience /><Experiences /></>}

        </div>
    )
}

export default Dashboard
