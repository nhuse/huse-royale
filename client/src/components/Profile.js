import './styles/ProfileStyles.css'
import Navbar from './Navbar';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import ProfileComments from './ProfileComments';

export default function Profile({ comments, setComments, user, chips, setUser }) {
    const [games, setGames] = useState([])
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const { user_id } = useParams();
    let userImg = 'https://i.imgur.com/9UfDphN.jpg'

    if(user) {
        if(user.user_img) {
            userImg = user.user_img
        }
    }
    
    useEffect(() => {
        fetch('/games')
        .then(r => r.json())
        .then(data => setGames(data))
    }, [])

    let filteredComments = []
    if(comments.length > 0) {
        filteredComments = comments.filter(c => {
            console.log(c)
            return c.user_id == user_id
        })
    }
    
    async function handleAvatarSubmit(e) {
        e.preventDefault();
          
        await fetch(`/users/${user_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_img: avatar
        }),
        })
        .then(r => r.json())
        .then(data => {
            setAvatar('')
            setUser(data)
        });
    }

    async function handleUsernameSubmit(e) {
        e.preventDefault();
          
        await fetch(`/users/${user_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.toLowerCase()
        }),
        })
        .then(r => r.json())
        .then(data => {
            setUsername('')
            if(data.errors) {
                alert(data.errors)
            } else {
                setUser(data)
            }
        })
        .catch(error => console.log(error));;
    }

    async function handleEmailSubmit(e) {
        e.preventDefault();
          
        await fetch(`/users/${user_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email.toLowerCase()
        }),
        })
        .then(r => r.json())
        .then(data => {
            setEmail('')
            if(data.errors) {
                alert(data.errors[0], data.errors[1])
            } else {
                setUser(data)
            }
        })
    }
        

    return (
    <>
        <div id="profile-wrapper" >
            <div className="all-wrapper">
                <div className="all-user-reviews-wrapper">
                    <h1>{user.first_name}'s Comments</h1>
                    <div className="reviews-lists">
                        {games.map(game => {
                            return <ProfileComments key={game.id} game={game} setComments={setComments} filteredComments={filteredComments} />
                        })}
                    </div>
                </div>
                <div className="edit-profile">
                    <div className="form-entry-wrapper">
                        <img alt={"avatar"} src={userImg} style={{marginTop:"0px", maxHeight: '225px', maxWidth: '225px', padding: "5px"}}/>
                        <form onSubmit={handleAvatarSubmit} className="edit-prof-form">
                            <input
                                className="edit-prof-input"
                                name="avatar"
                                type="text"
                                value={avatar}
                                onChange={(e) => {
                                    setAvatar(e.target.value)}
                                }
                                placeholder="Update Avatar URL"
                            />
                            <button className="edit-prof-submit">Submit</button>
                        </form>
                    </div>
                    <div className="form-entry-wrapper">
                        <h1>{user.username}</h1>
                        <form onSubmit={handleUsernameSubmit} className="edit-prof-form">
                            <input
                                className="edit-prof-input"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value)}
                                }
                                placeholder="Update Username"
                            />
                            <button className="edit-prof-submit">Submit</button>
                        </form>
                    </div>
                    <div className="form-entry-wrapper" style={{marginBottom: "20px"}}>
                        <h1>{user.email}</h1>
                        <form onSubmit={handleEmailSubmit} className="edit-prof-form">
                            <input
                                className="edit-prof-input"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)}
                                }
                                placeholder="Update Email"
                            />
                            <button className="edit-prof-submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="chips-bank">
            <div style={{ margin: "auto", fontSize: "25px" }}>
                <h1>Chips: ${chips}</h1>
            </div>
            <div style={{ margin: "auto", fontSize: "25px" }}>
                <h1>Bank: ${user.bank}</h1>
            </div>
        </div>
    </>
    )
}