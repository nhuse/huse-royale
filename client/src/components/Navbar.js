import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import './styles/NavBarStyles.css'

export default function Navbar({ user, setUser }) {
    const history = useHistory()
    let userImg = 'https://i.imgur.com/9UfDphN.jpg'
    function handleLogoutClick() {
        fetch('/signout', {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                setUser(null);
                history.push('/')
            }
        });          
    }

    if(user){
        if(user.user_img) {
            userImg = user.user_img
        }
    }

    return (
        <nav className="nav-bar" >
            { user ? 
            (<>
            <button className="nav-button" >
                <NavLink exact to="/game_room"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Home
                </NavLink>
            </button >
            <button onClick={handleLogoutClick} className="logout-button" >Logout</button>
            <button className="nav-button" id="profile-wrapper-button" >
                <NavLink to={`/profile/${user.id}`}
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Hello, {user.first_name}
                </NavLink> 
                <img src={userImg} className="profile-pic" alt="Profile"/>
            </button>
            <div id="bank">
                <button className="bank-button">
                    <NavLink exact to="/bank"
                    style={{ color: "grey" }}
                    activeStyle={{ fontWeight: "bold", color: "black" }}>
                        The Bank
                    </NavLink>
                </button>
            </div>
            </>) 
            : 
            (<>
            <button className="nav-button" >
                <NavLink to="/login"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Login
                </NavLink>
            </button>
            <button className= "nav-button" >
                <NavLink to="/signup"
                style={{ color: "grey" }}
                activeStyle={{ fontWeight: "bold", color: "black" }}>
                    Register
                </NavLink>
            </button>
            </>)}
        </nav>
    )
}