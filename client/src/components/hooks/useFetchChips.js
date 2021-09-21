import { useEffect } from "react";
export function useFetchChips(chips, userId, gameId) {
    useEffect(() => {
        let data = {
            chip_amount: chips,
            user_id: userId,
            game_id: gameId
        }
        fetch('/win_loss_history', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }, [chips])
}