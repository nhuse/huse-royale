import { useHistory } from "react-router"

export default function FrontPage() {
    const history = useHistory()

    const handleLoginClick = () => {
        history.push('/login')
    }
    const handleRegisterClick = () => {
        history.push('/signup')
    }

    return (
        <div className="front-page">
            <h1>Welcome to the Huse Royale! Please Login or Register to Continue.</h1>
            <div className="front-page-button-wrapper">
                <button className="button" onClick={() => handleLoginClick()}>
                    Login
                </button>
                <button className="button" onClick={() => handleRegisterClick()}>
                    Register
                </button>
            </div>
        </div>
    )
}