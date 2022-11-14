import React, { useState } from 'react'
import Main from './components/Main/Main'
import Navbar from './components/Navbar/Navbar'
import './App.css'

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQuery = (query) => {
        setSearchQuery(query)
        console.log(query)
    }

  return (
    <div className='app'>
        <Navbar handleSearchQuery={handleSearchQuery} searchQuery={searchQuery}/>
        <Main handleSearchQuery={handleSearchQuery} query={searchQuery} />
    </div>
  )
}

export default App
