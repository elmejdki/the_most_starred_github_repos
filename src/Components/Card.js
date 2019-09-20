import React from 'react';
import './Card.css';

const Card = ({ 
        id,
        avatar,
        stars,
        issues, 
        owner, 
        description,
        repo_url,
        repo_name,
        days
    }) => {

    return(
        <div className="card" key={ id }>
            <img src={ avatar } alt="profile" className="card-img"/>
            <div className="card-content">
            <div className="card-title">{ owner }</div>
            <div className="card-description">{ description } <a href={ repo_url }>" { repo_name.toUpperCase() } "</a></div>
            <div className="card-extras-info">
                <div className="stars common">Stars: { stars }</div>
                <div className="issues common">Issues: { issues }</div>
                <div className="submitted">Submitted { days } days ago by { owner }</div>
            </div>
            </div>
        </div>
    );
}

export default Card;