import React from 'react'
import "./Comments.css"
import Comment from '../Comment/Comment';

function Comments(props) {

    const comments = props.comments.map((comment) =>
        <Comment 
            key={comment.id}
            author={comment.author}
            created={comment.created}
            body={comment.body}
        />
    )

    return ( 
        <div className="comment-section">
            {comments}
        </div>
     );
}

export default Comments;