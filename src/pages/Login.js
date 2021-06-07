import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import {auth} from '../utils/apiURLs';

const Login = () => {

    const checkIfLoggedIn = () => {
        let user = JSON.parse(localStorage.getItem("currentUserPhrases"));
    
        if(!user) return
    }

    useEffect(() => {
        checkIfLoggedIn()
    },[])



    const login = async () => {
        const url = `${auth}/login`

        
        try {
            const res = await axios.post(url, formData);
         
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("currentUserPhrases", JSON.stringify(res.data.user));
    
            setAuthToken(res.data.token);
            
            window.location.href="/dashboard"
        } catch (error) {
            console.error(error);
        }
    }

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { username, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        login();
    }


    return (
        <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <h3>Login to Profile</h3>
            <Form onSubmit={onSubmit}>

                <Form.Group controlId="login.name">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} name="username" onChange={onChange} />
                </Form.Group>
                <Form.Group controlId="login.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} name="password" onChange={onChange} />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Col>
    )
}



export default Login
