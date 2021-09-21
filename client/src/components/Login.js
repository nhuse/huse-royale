import { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import './styles/RegisterLoginStyles.css'

export default function Login({ setUser, setChips }) {
    const history = useHistory()

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    function handleChange(event) {
        setLoginInfo({ ...loginInfo,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error) {
                alert(data.error)
            } else {
                setUser(data)
                setChips(data.chips)
                history.push("/game-room")
            }
        })
    }

    return (
        <div className="login-signup-form-wrapper">
            <form className="login-signup-form" onSubmit={handleSubmit}>
                <br/>
                <label htmlFor="email">Username:</label><br/>
                <input type="text" name="username" className="input-field" id="username" value={loginInfo.username} onChange={handleChange} /><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="password" className="input-field" id="password" value={loginInfo.password} onChange={handleChange} /><br/><br/>
                <p>Don't have an account? Create one <Link to='/signup'>HERE</Link>.</p>
                <button type="submit" style={{ borderRadius: "30px" }}>Submit</button>
            </form>
        </div>
    )
}