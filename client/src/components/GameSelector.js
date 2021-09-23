import { useParams } from "react-router";
import Navbar from './Navbar';
import BlackJack from "./blackjack/BlackJack"
import Roulette from "./roulette/Roulette";

export default function GameSelector({ user, chips, setChips, setUser }) {
    const { game_id } = useParams()

    if (game_id === '1') {
        return (
        <>
        <Navbar user={user} setUser={setUser} />
        <BlackJack user={user} chips={chips} setChips={setChips} />
        </>
        )
    } else if (game_id === '2') {
        return (
        <>
        <Navbar user={user} setUser={setUser} />
        <Roulette user={user} chips={chips} setChips={setChips} />
        </>
        )
    } 
    // else if (gameId ==='3') {
    //     return <Slots gameId={game_id} userId={user.id} chips={chips} setChips={setChips} />
    // }
}