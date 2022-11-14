import React, { useState } from 'react';
import Posts from '../Posts/Posts';
import Sidebar from '../Sidebar/Sidebar';
import "./Main.css"

function Main(props) {

    const[subreddit, setSubreddit] = useState('popular');

    const handleSubredditChange = (sub) => {
        setSubreddit(sub)
    }

    return ( 
        <div className="main">
            <Sidebar 
                handleSearchQuery={props.handleSearchQuery} 
                handleSubredditChange={handleSubredditChange} 
                subreddit={(props.query == '') ? subreddit : null}
            />
            <Posts 
                sub={subreddit} 
                query={props.query}
            />
        </div>
     );
}

export default Main;