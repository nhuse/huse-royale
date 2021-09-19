import Navbar from "./Navbar"

export default function GameRoom({ user }) {
    return (
        <>
            <Navbar user={user}/>
            <h1>GameRoom</h1>
        </>
    )
}