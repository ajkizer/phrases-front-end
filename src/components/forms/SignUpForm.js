

import React, {useState} from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {auth} from '../../utils/apiURLs'

const SignUpForm = ({toggleHasAccount}) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    
    const register = async () => {
        let url = `${auth}/register`


        let formDataCopy = formData;

        formDataCopy.role = "customer"

        try {
            let res = await axios.post(url, formDataCopy);

            localStorage.setItem("token", res.data.token);
        

            setAuthToken(res.data.token);

            window.location.href = "/dashboard"
        } catch (error) {
            console.error(error);
        }
    }

    const {username, password, email} = formData;

    const onSubmit = e => {
        e.preventDefault();
        register();
    }

    return (<><h3>Login to Profile</h3>
        <Form onSubmit={onSubmit}>

            <Form.Group controlId="signup.name">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} name="username" onChange={onChange} />
            </Form.Group>
            <Form.Group controlId="signup.email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={email} name="email" onChange={onChange} />
            </Form.Group>
            <Form.Group controlId="signup.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} name="password" onChange={onChange} />
            </Form.Group>
            <Button type="submit">Submit</Button>
            <small onClick={() => toggleHasAccount(true)}>Already have an account?</small>
        </Form></>)
}




export default SignUpForm
