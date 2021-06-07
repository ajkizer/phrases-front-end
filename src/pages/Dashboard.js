import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {devMain} from '../utils/apiURLs'

const Dashboard = () => {
    const [loading, toggleLoading] = useState(true);
    const [experiences, setExperiences] = useState([]);

    
    useEffect(() => {
        if(!localStorage.getItem("token")){
            window.location.href="/"
        }
    },[])


    const getExperiences = async () => {


        try {
            const res = await axios.get(`${devMain}/experiences`)
            setExperiences(res.data.data);
        } catch (error) {
            console.log(error);
        }

        toggleLoading(false);
    
    }

    useEffect(() => {
        getExperiences();
    },[])



    console.log(experiences);

    return (
        <div>
            {loading ? "loading..." : "not loading"}
        </div>
    )
}

export default Dashboard
