import './styles/GameCard.css'
import { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import { Link } from "react-router-dom"

export default function GameRoom({ user, setUser }) {
    const [games, setGames] = useState([])
    useEffect(() => {
        fetch('/games')
        .then(r => r.json())
        .then(data => setGames(data))
    }, [user])
    
    return (
        <>
        <Navbar user={user} setUser={setUser} />
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
                        <Link to={`/game_reviews/${game.id}`} style={{ color: "grey" }}>
                            Reviews
                        </Link>
                    </button>
                </div>
            })}
        </div>
        </>
    )
}