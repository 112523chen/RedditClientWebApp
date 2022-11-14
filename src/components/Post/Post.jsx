import React, { useEffect, useState } from 'react';
import Comments from '../Comments/Comments';
import "./Post.css"

function Post(props) {

    const [arrowStateUp, setArrowStateUp] = useState(false);
    const [arrowStateDown, setArrowStateDown] = useState(false);
    const [colorState, setColorState] = useState();
    const [commentState, setCommentState] = useState(false);
    const [comments, setComments] = useState([]);
    
    const getCleanValue = (num) => {
        if(num > 1000){
            const a =  Math.floor(num/1000);
            const b = Math.floor((num - (1000*Math.floor(num/1000)))/100)
            // console.log(`${a}.${b}k`);
            return `${a}.${b}k`;
        }
        return num
    }

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

    const isImage =(url) => {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    
    const handleChangeUp = () => {
        if(arrowStateUp == false & arrowStateDown == false){
            setArrowStateUp(true)
            setColorState('green');
        } else if(arrowStateUp == true){
            setArrowStateUp(false);
            setColorState('');
        }
        // console.log(`arrowStateUp ${arrowStateUp}`)
    }

    const handleChangeDown = () => {
        if(arrowStateUp == false & arrowStateDown == false){
            setArrowStateDown(true)
            setColorState('red');
        } else if(arrowStateDown == true){
            setArrowStateDown(false);
            setColorState('');
        }
        // console.log(`arrowStateDown ${arrowStateDown}`)
    }

    const handleChangeComment = () => {
        if(commentState == false){
            setCommentState(true);
        } else if(commentState == true){
            setCommentState(false);
        }
    }

    useEffect(function(){
        const url=`https://www.reddit.com/${props.permalink}/.json`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const results = data[1].data.children.map((comment) => {
                    const commentJSON = comment.data;
                    let data_ = {
                        'id':commentJSON.id,
                        'author':commentJSON.author,
                        'created':commentJSON.created,
                        'body':commentJSON.body
                    }
                    return data_
                });
                setComments(results)
            });
    },[comments])

    return ( 
        <div className="post" key={props.id}>
            <div className="vote">
                <button className='btn up' onClick={handleChangeUp}>
                    <svg style={{color: (arrowStateUp ? "green" : "")}} width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill={(arrowStateUp ? "green" : "None")} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 3l9 7h-4.99L16 21H8V10H3l9-7Z"/></svg>
                </button>
                <p className='upVotes' style={{color: colorState}}>{getCleanValue(props.upVotes)}</p>
                <button className='btn down' onClick={handleChangeDown}>
                    <svg style={{color: (arrowStateDown ? "red" : "")}} width="35" height="35" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill={(arrowStateDown ? "red" : "None")} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 21l9-7h-4.99L16 3H8v11H3l9 7Z"/></svg>
                </button>
            </div>
            <div className="info">
                <div className="info-text">
                    {(!isImage(props.url) & (props.selftext == '')) ? <h4><a target={"_blank"} href={props.url}>{props.title}</a></h4> : <h4>{props.title}</h4> }
                    {props.thumbnail == 'self' ? null : <img src={props.url} style={{ width: '100%' }} alt="" />}
                    <p>{props.selftext}</p>
                </div>
                <hr />
                <div className="info-data">
                    <div className="user-info">
                        <p className="user">Posted by <span>u/{props.author}</span> {timeSince(props.created)} ago</p>
                    </div>
                    <div className="comment-info">
                        <button className='btn' onClick={handleChangeComment}>
                            <svg width="24" height="24" viewBox="0 0 24 24" style={(commentState ? {color:"#3d5af1"} : {})} xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M20 2H4c-1.103 0-2 .897-2 2v18l5.333-4H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14H6.667L4 18V4h16v12z"/></svg>
                        </button>
                        <p className="comment-num">{getCleanValue(props.numOfComments)}</p>
                    </div>
                </div>
                {commentState ? <Comments comments={comments} /> : null}
            </div>
        </div>
     );
}

export default Post;