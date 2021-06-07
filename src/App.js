import './App.css';


import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router} from 'react-router-dom';

import setAuthToken from './utils/setAuthToken';


if(localStorage.getItem("token")){
  setAuthToken(localStorage.getItem("token"));
}

function App() {
  return (
    <Router>
    <div className="App">
      

    </div>
    </Router>
  );
}

export default App;
