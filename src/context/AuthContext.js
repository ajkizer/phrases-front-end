import React from 'react';


const currentUser = JSON.parse(localStorage.getItem("currentUserPhrases"));
// const token = JSON.parse(localStorage.getItem("token"));
console.log({currentUser})

let isAuthenticated;

if(currentUser){
    isAuthenticated = true
} else {
    isAuthenticated = false
}

export const initialState = {
    user: currentUser,
    isAuthenticated
}

export const AuthContext = React.createContext(initialState)
