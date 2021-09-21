import { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import './styles/RegisterLoginStyles.css'

export default function Register({ setUser, setChips }) {
    const history = useHistory()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        pass: '',
        confPass: ''
    })

    function handleChange(event) {
        setFormData({...formData, 
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        let data = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.pass,
            password_confirmation: formData.confPass,
            chips: 5000,
            bank: 0
        }
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                console.log(data)
                alert(data.errors)
            }
            else {
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
                <label htmlFor="first-name" >First Name:</label><br/>
                <input type="text" name="firstName" className="input-field" id="first-name" value={formData.firstName} onChange={handleChange} /><br/><br/>
                <label htmlFor="first-name" >Last Name:</label><br/>
                <input type="text" name="lastName" className="input-field" id="last-name" value={formData.lastName} onChange={handleChange} /><br/><br/>
                <label htmlFor="username" >Username:</label><br/>
                <input type="text" name="username" className="input-field" id="username" value={formData.username} onChange={handleChange} /><br/><br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="text" name="email" className="input-field" id="email" value={formData.email} onChange={handleChange} /><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" name="pass" className="input-field" id="password" value={formData.pass} onChange={handleChange} /><br/><br/>
                <label htmlFor="confPass">Confirm Password:</label><br/>
                <input type="password" name="confPass" className="input-field" id="confPass" value={formData.confPass} onChange={handleChange} /><br/><br/>
                <p>Already Registered? Log in <Link to='/login'>HERE</Link>.</p>
                <button type="submit" style={{ borderRadius: "30px" }} >Submit</button>
            </form>
        </div>
    )
}