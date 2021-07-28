import React from 'react';


const currentUser = JSON.parse(localStorage.getItem("currentUserPhrases"));
// const token = JSON.parse(localStorage.getItem("token"));

let isAuthenticated;
let authError = false;

if(currentUser){
    isAuthenticated = true;
} else {
    isAuthenticated = false;
}

export const initialState = {
    user: currentUser,
    isAuthenticated,
    authError
}

export const AuthContext = React.createContext(initialState)
