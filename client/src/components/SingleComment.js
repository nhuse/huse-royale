import { useState } from "react"

export default function SingleComment({ c, setComments }) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let date = new Date(c.created_at)
    let day = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()
    const dateString = `${month} ${day}, ${year}`
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState({
        comment: ''
    })

    function handleDelete(id) {
        fetch(`/comments/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            setComments(data)
        })
    }
    
    function handleEdit() {
        setIsEditing(true)
    }
    
    function handleCancelEdit() {
        setIsEditing(false)
    }

    function handleChange(e){
        setEditedComment({
            [e.target.name]: e.target.value
        })
    }
    
    function handleSubmitEdit(e, id) {
        e.preventDefault()
        fetch(`/comments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedComment)
        })
        .then(response => response.json())
        .then(data => {
            setComments(data)
            setIsEditing(false)
        })
        setEditedComment({comment: ''})
    }
    return (
        <li className="profile-game-reviews-li">
        {isEditing ? (
        <form className="login-signup-form">
        <textarea rows="5" cols="50" name="comment" value={editedComment.comment} onChange={handleChange} style={{ width: "250px", height: "100px" }}/><br/>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <button onClick={(e) => handleSubmitEdit(e, c.id)}>Submit Edit</button>
            <button onClick={() => handleCancelEdit()} style={{marginLeft: "10px"}} >❌</button>
        </div>
        </form>) 
        : 
        <>
        <span style={{ wordWrap: "break-word", maxWidth: "60%", fontSize: "23px" }}>"{c.comment}" on {dateString}</span>
        <div style={{ padding: "10px 0 10px 0" }}>
        <button style={{ marginRight: "15px", fontSize: "20px", borderRadius: "10px" }} onClick={() => handleDelete(c.id)}>🗑️</button>
        <button style={{ fontSize: "20px", borderRadius: "10px" }} onClick={() => handleEdit(c.id)}>✏️</button>
        </div> 
        </>
        }
        </li>
    )
}