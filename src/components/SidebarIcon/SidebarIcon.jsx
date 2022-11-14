import data from '../../data/subreddits.json';
const subreddit_data = data.subreddits;
import React from 'react'
import './SidebarIcon.css'

function SidebarIcon(props) {
    const handleClick = () => {
        // console.log(props.name);
        props.handleSubredditChange(props.id)
        props.handleSearchQuery('')
    }
    return (
        <div className="subreddit_icon" style={(props.subreddit == props.id) ? {borderRight: "10px solid #3d5af1", backgroundColor: "lightGrey", marginRight: "" } : {}}>
            <button onClick={handleClick}>
                <img 
                src={props.src} 
                alt={props.name} 
                title={props.name} />
            </button>
        </div>
      );
}

export default SidebarIcon;