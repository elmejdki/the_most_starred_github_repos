import React from 'react';

const Loader = ({ handleFilter }) => {
    return (
        <div className="searchField">
            <input 
                type="text" 
                onChange={ handleFilter }
                placeholder="Search For An Owner"/>
        </div>
    );
}

export default Loader;