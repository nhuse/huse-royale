import { useParams } from "react-router";
import BlackJack from "./components/blackjack/BlackJack"

export default function GameSelector({ user, chips, setChips }) {
    const { game_id } = useParams()

    if (game_id === '1') {
        return <BlackJack gameId={game_id} user={user} chips={chips} setChips={setChips} />
    } 
    // else if (game_id === '2') {
    //     return <Roulette gameId={game_id} userId={user.id} chips={chips} setChips={setChips} />
    // } else if (gameId ==='3') {
    //     return <Slots gameId={game_id} userId={user.id} chips={chips} setChips={setChips} />
    // }
}