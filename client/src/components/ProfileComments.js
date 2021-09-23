import SingleComment from "./SingleComment"

export default function ProfileComments({ filteredComments, game, setComments }) {
    const filteredGameComments = filteredComments.filter(c => c.game_id === game.id)

    return (
        <div key={game.id} className="profile-game-reviews-wrapper">
            <h1 style={{ textDecoration: "underline" }}>{game.name}</h1>
            <ul className="profile-game-reviews-ul">
                {filteredGameComments.map(c => {
                    return <SingleComment key={c.id} setComments={setComments} c={c} />
                })}
            </ul> <br/>
        </div>
    )
}