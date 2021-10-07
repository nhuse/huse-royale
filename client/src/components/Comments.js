import './styles/ReviewsStyles.css'
import { useState } from "react"
import { useParams } from 'react-router-dom'

export default function Comments({ user, comments, setComments }) {
    let { game_id } = useParams();
    game_id = parseInt(game_id)
    const [commentContent, setCommentContent] = useState({
        comment: '',
        user_id: user.id,
        game_id: game_id
    })

    let filteredComments = []
    if(comments.length > 0) {
        filteredComments = comments.filter(c => c.game_id == game_id)
    }

    function handleChange(event) {
        setCommentContent({...commentContent,
            [event.target.name]: event.target.value
        })
    }
    console.log(commentContent)
    async function handleSubmitReview(event){
        event.preventDefault()
        await fetch(`/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentContent)
        })
        .then(response => response.json())
        .then(data => setComments(data))
        setCommentContent({
            comment: '',
            user_id: user.id,
            game_id: game_id
        })
    }

    return (
        <>
        <div style={{ height: "92vh", color: "white", display: "flex", flexFlow: "column wrap", alignContent: "center" }}>
            <div className="review-wrapper">
                <h1>Comments</h1>
                <ul style={{ listStyle: "none", width: "auto", padding: "0px", margin: "0" }}>
                { filteredComments.length > 0 ? 
                (filteredComments.map(comment => {
                    return <li key={comment.id} className="review-li">"{comment.comment}" by {comment.user.first_name}</li>
                })) 
                : 
                <h3>No Comments for this Game yet</h3>}
                </ul>
            </div>
            <div className="comment-form-wrapper">
                <form onSubmit={handleSubmitReview} className="login-signup-form">
                    <label style={{ fontSize: "25px" }} htmlFor="comment">Leave a Comment</label><br/><br/>
                    <textarea rows="5" cols="50" name="comment" id="comment" value={commentContent.comment} onChange={handleChange} style={{ width: "600px", height: "150px", fontSize: "20px" }}/><br/>
                    <button className="comment-submit-btn">Submit Comment</button>
                </form>
            </div>
        </div>
        </>
    )
}