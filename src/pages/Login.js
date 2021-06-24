import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import LoginForm from "../components/forms/LoginForm"



const Login = () => {

    const checkIfLoggedIn = () => {
        const token = localStorage.getItem("token");

        if(token) {
            window.location.href="/dashboard"
        }
    }
    useEffect(() => {
        checkIfLoggedIn()
    }, [])

  

    return (
        <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            <LoginForm />
        </Col>
    )
}



export default Login
