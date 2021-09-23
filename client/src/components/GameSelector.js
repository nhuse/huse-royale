import { useParams } from "react-router";
import BlackJack from "./blackjack/BlackJack"
import Roulette from "./roulette/Roulette";

export default function GameSelector({ user, chips, setChips }) {
    const { game_id } = useParams()

    if (game_id === '1') {
        return <BlackJack user={user} chips={chips} setChips={setChips} />
    } else if (game_id === '2') {
        return <Roulette user={user} chips={chips} setChips={setChips} />
    } 
    // else if (gameId ==='3') {
    //     return <Slots gameId={game_id} userId={user.id} chips={chips} setChips={setChips} />
    // }
}