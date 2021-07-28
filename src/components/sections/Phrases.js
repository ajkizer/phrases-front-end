import React from 'react'
import {Link, useHistory} from 'react-router-dom';

const Phrases = ({phrase}) => {
    const history = useHistory();

    return (
        <div>
            <Link to={`${history.location.pathname}/phrases/${phrase._id}`}>
            {phrase.phrase}
            </Link>
        </div>
    )
}

export default Phrases
