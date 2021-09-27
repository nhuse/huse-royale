import './styles/GameCard.css'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

export default function GameRoom() {
    const [games, setGames] = useState([])
    useEffect(() => {
        fetch('/games')
        .then(r => r.json())
        .then(data => setGames(data))        
    }, [])
    
    return (
        <>
        <div className="game-flex-container">
            {games.map(game => {
                return <div key={game.id} className="card">
                    <Link to={`/game/${game.id}`} style={{ textDecoration: "none" }}>
                        <div className="game-info">
                            <img src={game.img} className="game-img" alt={`${game.name}-cover-art`} />
                            <h1>{game.name}</h1>
                        </div>
                    </Link>
                    <button className="review-button">
                        <Link to={`/comments/game/${game.id}`} style={{ color: "grey" }}>
                            Comments
                        </Link>
                    </button>
                </div>
            })}
        </div>
        </>
    )
}