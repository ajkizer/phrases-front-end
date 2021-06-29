import React, {useState, useContext} from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {auth} from '../../utils/apiURLs'
import { AuthContext } from '../../context/AuthContext';

const LoginForm = ({toggleHasAccount}) => {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    const {user, setUser} = useContext(AuthContext);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    
    const login = async () => {
        let url = `${auth}/login`


        try {
            let res = await axios.post(url, formData);

            localStorage.setItem("token", res.data.token);

            setAuthToken(res.data.token);

          
            res = await axios.get(`${auth}/me`)

            setUser({user: res.data.data, isAuthenticated: true});
            localStorage.setItem("currentUserPhrases", JSON.stringify(res.data.data))

           
        } catch (error) {
            console.error(error);
        }
    }

    const {username, password} = formData;

    const onSubmit = e => {
        e.preventDefault();
        login();
    }


    return (<>
        <Form onSubmit={onSubmit} className="login-form">
        <h3>Login</h3>
        <div className="login-form__inputs">
            <Form.Group controlId="login.name">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} name="username" onChange={onChange} />
            </Form.Group>
            <Form.Group controlId="login.password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} name="password" onChange={onChange} />
            </Form.Group>
            </div>
            <Button variant="light" className="m-2" type="submit">Submit</Button>
            <small onClick={() => toggleHasAccount(false)}>Don't have an account?</small>
        </Form></>)
}

export default LoginForm
