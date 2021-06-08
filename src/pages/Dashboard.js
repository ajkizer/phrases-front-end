import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {devMain, auth} from '../utils/apiURLs'
import {Row, Col, Card} from 'react-bootstrap'
import {Link} from 'react-router-dom';

const Dashboard = () => {
    const [loading, toggleLoading] = useState(true);
    const [experiences, setExperiences] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)

    
    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/"
        }
        getExperiences();
        getCurrentUser();
    },[])


    const getExperiences = async () => {


        try {
            const res = await axios.get(`${devMain}/experiences`)
            setExperiences(res.data.data);
        } catch (error) {
            console.log(error);
        }

        toggleLoading(false);
    
    }

    const getCurrentUser = async () => {
       const user = localStorage.getItem("phrasesCurrentUser");


       if(user) {
           return setCurrentUser(JSON.parse(user))
       }
        try {
            const res = await axios.get(`${auth}/me`);
            console.log(res);
            setCurrentUser(res.data.data);
            localStorage.setItem("phrasesCurrentUser", JSON.stringify(res.data.data))
        } catch (error) {
            console.log(error);
        }
    }




    const Experiences = () => {return (<div className="dashboard__experiences"><h3>Hello, {currentUser.username}</h3>{experiences.map(experience => <Col md={{span: 6, offset: 3}}><Link to={`/dashboard/experiences/${experience._id}`} ><Card><p>Native Language: {experience.nativeLanguage}</p><p>Target Language: {experience.targetLanguage}</p></Card></Link></Col>)}</div>)}

    return (
        <div className="dashboard">
            
            {loading ? "loading..." : <Experiences/>}
            
        </div>
    )
}

export default Dashboard
