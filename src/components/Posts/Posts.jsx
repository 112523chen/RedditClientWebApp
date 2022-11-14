import React, { useState, useEffect } from 'react';
import Post from '../Post/Post';
import "./Posts.css"

function Posts(props) {

    const [subredditData, setSubredditData] = useState([]);

    const cleanQueryforSearch = (query) => {
        const reg = /\s/
        const cleanedQuery = query.replace(reg, "%20");
        // console.log(cleanedQuery);
        return cleanedQuery;
    }



    useEffect(function(){
        let url
        // url = `https://www.reddit.com/r/${props.sub}.json`;
        if(props.query == ''){
            url = `https://www.reddit.com/r/${props.sub}.json`;
        } else {
            url = `https://www.reddit.com/search.json?q=${cleanQueryforSearch(props.query)}`;
        }
        console.log(url)
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const result = data.data.children.map((post) => {
                const postJSON = post.data
                const data_ = {
                    "id": postJSON.id,
                    'permalink': postJSON.permalink,
                    "author":postJSON.author,
                    "title": postJSON.title, 
                    "ups": postJSON.ups, 
                    "num_comments":postJSON.num_comments, 
                    "created":postJSON.created, 
                    "url":postJSON.url,
                    "selftext":postJSON.selftext,
                    "thumbnail":postJSON.thumbnail, 
                    "thumbnail_height":postJSON.thumbnail_height, 
                    "thumbnail_width":postJSON.thumbnail_width,
                    "url_overridden_by_dest":postJSON.url_overridden_by_dest,
                    "isVideo":postJSON.is_video,
                    "video":(postJSON.isVideo ? postJSON.media.reddit_video.fallback_url : null )
                };
                console.log()
                return data_;
            });
            setSubredditData(result)
        })
    },[props.sub,props.query])

    const items = subredditData.map((item) => 
        <Post key={item.id}
        permalink={item.permalink} 
        author={item.author} 
        title={item.title} 
        upVotes={item.ups} 
        numOfComments={item.num_comments} 
        created={item.created} 
        url={item.url}
        selftext={item.selftext}
        thumbnail={item.thumbnail}
        thumbnail_height={item.thumbnail_height}
        thumbnail_width={item.thumbnail_width}
        url_overridden_by_dest={item.url_overridden_by_dest}
        isVideo={item.isVideo}
        video={item.video}/>
    );



    return ( 
        <div className="posts">
            {/* <p>{JSON.stringify(subredditData)}</p> */}
            {items}
        </div>
     );
}

export default Posts;