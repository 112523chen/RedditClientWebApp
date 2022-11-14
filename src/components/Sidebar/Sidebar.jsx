import React from 'react';
import './Sidebar.css'
import data from '../../data/subreddits.json';
import SidebarIcon from '../SidebarIcon/SidebarIcon';
const subreddit_data = data.subreddits;

function Sidebar(props) {

    const subs = subreddit_data.map((subreddit) => 
        <SidebarIcon 
        id={subreddit.id}
        key={subreddit.id}
        src={subreddit.src} 
        name={subreddit.name} 
        handleSubredditChange={props.handleSubredditChange}
        handleSearchQuery={props.handleSearchQuery}
        subreddit = {props.subreddit}
        />
    )

    return (
        
        <div className="sidebar">
            {subs}
        </div>
     );
}

export default Sidebar;