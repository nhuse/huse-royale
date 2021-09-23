import './styles/ProfileStyles.css'
import Navbar from './Navbar';
import { useState } from "react";

export default function Profile({ user, chips, setUser }) {
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    let userImg = 'https://i.imgur.com/9UfDphN.jpg'

    if(user.user_img) {
        userImg = user.user_img
    }
    
    async function handleAvatarSubmit(e) {
        e.preventDefault();
          
        await fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_img: avatar
        }),
        })
        .then(r => r.json())
        .then(data => setUser(data));
    }

    async function handleUsernameSubmit(e) {
        e.preventDefault();
          
        await fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username
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
          
        await fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email
        }),
        })
        .then(r => r.json())
        .then(data => {
            setEmail('')
            if(data.errors) {
                alert(data.errors[0])
            } else {
                setUser(data)
            }
        })
    }
        

    return (
        <div id="profile-wrapper" >
            <Navbar user={user} setUser={setUser} />
            {/* <div className="all-user-reviews-wrapper">
                <h1>{user.name}'s Reviews</h1>
                <div className="reviews-lists">
                    {games.map(game => {
                        return <ProfileReviews key={game.id} game={game} setReviews={setReviews} userReviews={userReviews} />
                    })}
                </div>
            </div> */}
            <div className="edit-profile">
                <div className="form-entry-wrapper">
                    <img alt={"avatar"} src={userImg} style={{marginTop:"0px", maxHeight: '150px', maxWidth: '150px', padding: "5px"}}/>
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
                <div className="form-entry-wrapper">
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
    )
}