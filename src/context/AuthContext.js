import React from 'react';


const currentUser = JSON.parse(localStorage.getItem("currentUserPhrases"))

export const initialState = {
    user: currentUser,
    isAuthenticated: false
}

export const AuthContext = React.createContext(initialState)
