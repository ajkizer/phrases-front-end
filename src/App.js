import './App.css';


import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router} from 'react-router-dom';

import Routing from './routing/Routing'

import setAuthToken from './utils/setAuthToken';
import NavBarGen from './components/layout/NavBarGen';


if(localStorage.getItem("token")){
  setAuthToken(localStorage.getItem("token"));
}

function App() {

  const [auth, setAuth] = useState({
    user: {},
    isAuthenticated: false,
  })

  console.log(auth);

  const checkIfAuthenticated = () => {
    if(localStorage.getItem("token"))
    {
      const user = JSON.parse(localStorage.getItem("phrasesCurrentUser"));
      const isAuthenticated = true;
      setAuth({user, isAuthenticated})
    }
  }


  useEffect(() => {
    checkIfAuthenticated();
  },[])
  return (
    <Router>
    <div className="App">
      <NavBarGen auth={auth}/>
      <Routing auth={auth}/>
    </div>
    </Router>
  );
}

export default App;
