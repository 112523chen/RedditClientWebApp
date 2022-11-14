import React from 'react';
import "./Comment.css"

function Comment(props) {

    const timeSince = (date) => {
        var seconds = Math.floor(((new Date().getTime()/1000) - date)),
        interval = Math.floor(seconds / 31536000);
        
        if (interval > 1) return interval + " year";
        
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + " months";
        
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) return interval + " days";
        
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) return interval + " hours";
        
        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + " minutes";
        
        return Math.floor(seconds) + " seconds";
    }

    return ( 
        <div className="comment">
            <div className="data">
                <p className="user_">u/{props.author}</p>
                <p className="date"> {(props.created) != undefined ? `${timeSince(props.created)} ago` : ""}</p>
            </div>
            <div className="body">
                <p className="message">
                    {(timeSince(props.created) != '') ? props.body : ""}
                </p>
            </div>
        </div>
    );
}

export default Comment;