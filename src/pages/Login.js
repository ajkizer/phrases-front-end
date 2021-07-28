import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router';
import LoginForm from "../components/forms/LoginForm"
import SignUpForm from '../components/forms/SignUpForm';
import { AuthContext } from '../context/AuthContext';



const Login = () => {
    const [hasAccount, toggleHasAccount] = useState(true);
    const {user, setUser} = useContext(AuthContext)
    const [show, setShow] = useState(false);

    useEffect(() => {
        if(user.authError){
            setShow(true)
            setTimeout(() => {setShow(false)},2000)
        }
    }, [user])

    console.log(user);
  

    return (
        <Col xs={{ span: 12 }} md={{span: 8, offset:2}}lg={{ span: 4, offset: 6 }}>
            {user.isAuthenticated && <Redirect to="/dashboard"/>}
            {hasAccount ? <LoginForm show={show} setShow={setShow} toggleHasAccount={toggleHasAccount}/> : <SignUpForm show={show} setShow={setShow} toggleHasAccount={toggleHasAccount}/>}
        </Col>
    )
}



export default Login
