import React, {useState} from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {auth} from '../../utils/apiURLs'

const LoginForm = ({toggleHasAccount}) => {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    
    const login = async () => {
        let url = `${auth}/login`


        try {
            let res = await axios.post(url, formData);

            localStorage.setItem("token", res.data.token);

            url = `${auth}/me`


            setAuthToken(res.data.token);

            window.location.href = "/dashboard"
        } catch (error) {
            console.error(error);
        }
    }

    const {username, password} = formData;

    const onSubmit = e => {
        e.preventDefault();
        login();
    }

    return (<><h3>Login to Profile</h3>
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
            <small onClick={() => toggleHasAccount(false)}>Don't have an account?</small>
        </Form></>)
}

export default LoginForm
