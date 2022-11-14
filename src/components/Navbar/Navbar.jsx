import React, { useEffect, useState } from 'react';
import { legacy_createStore } from 'redux'
import './Navbar.css'

function Navbar(props) {
    const [formData, setFormData] = useState(props.searchQuery);

    useEffect(() => {
        setFormData(props.searchQuery);
    },[props.searchQuery])

    const handleChange = (event) => {
        // console.log(event.target.value)
        const {value} = event.target;
        setFormData(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleSearchQuery(formData)
    }

    

    return ( 
        <header>
            <div id="brand">
                <p><span>Reddit</span>Stripped</p>
            </div>
            <form className="search-bar" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder='Search'
                    onChange={handleChange}
                    value={formData}
                />
                <button>
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"/></svg>
                </button>
            </form>
        </header>
     );
}

export default Navbar;