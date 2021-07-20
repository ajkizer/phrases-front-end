

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
       


        let formDataCopy = formData;

        formDataCopy.role = "customer"

        try {
            let url = `${auth}/register`
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

    return (<>
        <Form onSubmit={onSubmit} className="login-form">
            <h3>Sign Up</h3>
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
            <Button variant="light" className="m-2"  type="submit">Submit</Button>
            <small onClick={() => toggleHasAccount(true)}>Already have an account?</small>
        </Form></>)
}




export default SignUpForm
