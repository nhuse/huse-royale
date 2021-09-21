import BlackJack from "./blackjack/BlackJack"
import Navbar from "./Navbar"

export default function GameRoom({ user, setUser, chips, setChips }) {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <BlackJack user={user} chips={chips} setChips={setChips} />
        </>
    )
}