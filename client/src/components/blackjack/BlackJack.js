import './styles/hands.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Cards from './Cards';
import { CardValues } from './helpers/CardValues'
import { CardsImages } from './helpers/CardsImage'

export default function BlackJack({ user, chips }) {
    const history = useHistory()
    const deck = [
        'Two of Spades', 'Two of Clubs', 'Two of Hearts', 'Two of Diamonds', 'Three of Spades', 'Three of Clubs', 'Three of Hearts', 'Three of Diamonds', 
        'Four of Spades', 'Four of Clubs', 'Four of Hearts', 'Four of Diamonds', 'Five of Spades', 'Five of Clubs', 'Five of Hearts', 'Five of Diamonds', 
        'Six of Spades', 'Six of Clubs', 'Six of Hearts', 'Six of Diamonds', 'Seven of Spades', 'Seven of Clubs', 'Seven of Hearts', 'Seven of Diamonds',
        'Eight of Spades', 'Eight of Clubs', 'Eight of Hearts', 'Eight of Diamonds', 'Nine of Spades', 'Nine of Clubs', 'Nine of Hearts', 'Nine of Diamonds', 
        'Ten of Spades', 'Ten of Clubs', 'Ten of Hearts', 'Ten of Diamonds', 'Jack of Spades', 'Jack of Clubs', 'Jack of Hearts', 'Jack of Diamonds', 
        'Queen of Spades', 'Queen of Clubs', 'Queen of Hearts', 'Queen of Diamonds', 'King of Spades', 'King of Clubs', 'King of Hearts', 'King of Diamonds', 
        'Ace of Spades', 'Ace of Clubs', 'Ace of Hearts', 'Ace of Diamonds'
    ]
    const [blackJack, setBlackJack] = useState(false)
    const [playerHand, setPlayerHand] = useState([])
    const [dealerHand, setDealerHand] = useState([])
    const [currentBet, setCurrentBet] = useState(0);
    const [dealerPoints, setDealerPoints] = useState(0);
    const [playerPoints, setPlayerPoints] = useState(0);
    const [betting, setBetting] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [dealerTurn, setDealerTurn] = useState(false)
    const [isInitialDraw, setIsInitialDraw] = useState(true)
    const [outCome, setOutcome] = useState('')
    console.log(dealerHand)
    console.log('main', dealerPoints)
    function handleBetClick(amount) {
        if((currentBet+amount) > chips){
            alert('Not enough money')
        }else if((currentBet+amount) > 1000 ){
            alert('Max bet is $1000')
        }else if((currentBet + amount) < 0) {
        }else {
            setCurrentBet(prev => prev + amount)
        }
    }
    function handleLockIn() {
        if(currentBet > 0){
            setBetting(false)
            initialDraw()
        }else {
            alert("Please Set your Bet greater than $0")
        }
    }
    useEffect(() => {
        if(playerPoints > 21) {
            setGameOver(true)
            setOutcome("That's a bust! Good Game! Would you like to play again?")
        }
    }, [playerPoints])

    useEffect(() => {
        setPlayerPoints(CardValues(playerHand))
    }, [playerHand])
        
    useEffect(() => {
        setDealerPoints(CardValues(dealerHand))
    }, [dealerHand])
    
    function handleRestartClick() {
        setBlackJack(false)
        setPlayerPoints(0)
        setDealerPoints(0)
        setIsInitialDraw(true)
        setDealerTurn(false)
        setCurrentBet(0)
        setDealerHand([])
        setPlayerHand([])
        setGameOver(false)
        setBetting(true)
    }
    function handleQuitClick() {
        history.push('/game-room')
    }
    function handleHitClick(){
        setPlayerHand([...playerHand,
            DrawCard(deck)]
        )
    }
    function handleHoldClick() {
        setDealerTurn(true)
    }
        
    function initialDraw() {
        setPlayerHand([...playerHand,
            DrawCard(deck),
            DrawCard(deck)]
        )
        setDealerHand([...dealerHand,
            DrawCard(deck),
            DrawCard(deck)]
        )
    }

    function DrawCard(deck) {
        let copyOfDeck = [...deck]
        let newCard = copyOfDeck[Math.floor(Math.random() * (copyOfDeck.length))]
        return newCard
    }
    
    useEffect(() => {
        if(isInitialDraw === true && dealerHand.length > 0 && playerHand.length > 0){
            if(
            (playerHand[0].includes('Ace') && (playerHand[1].includes('King') || playerHand[1].includes('Queen') || playerHand[1].includes('Jack')) ) || 
            (playerHand[1].includes('Ace') && (playerHand[0].includes('King') || playerHand[0].includes('Queen') || playerHand[0].includes('Jack')) ) && 
            (dealerHand[0].includes('Ace') && (dealerHand[1].includes('King') || dealerHand[1].includes('Queen') || dealerHand[1].includes('Jack')) ) || 
            (dealerHand[1].includes('Ace') && (dealerHand[0].includes('King') || dealerHand[0].includes('Queen') || dealerHand[0].includes('Jack')))
            ) {
                setBlackJack(true)
                setOutcome("Both you and the dealer got a blackjack. It's a push. Play again?")
            }
            if(
            (playerHand[0].includes('Ace') && (playerHand[1].includes('King') || playerHand[1].includes('Queen') || playerHand[1].includes('Jack')) ) || 
            (playerHand[1].includes('Ace') && (playerHand[0].includes('King') || playerHand[0].includes('Queen') || playerHand[0].includes('Jack')) )
            ) {
                setBlackJack(true)
                setOutcome('Congrats! You got a blackjack! You win! Play again?')
            }
            if(
            (dealerHand[0].includes('Ace') && (dealerHand[1].includes('King') || dealerHand[1].includes('Queen') || dealerHand[1].includes('Jack')) ) || 
            (dealerHand[1].includes('Ace') && (dealerHand[0].includes('King') || dealerHand[0].includes('Queen') || dealerHand[0].includes('Jack')))
            ) {
                setBlackJack(true)
                setOutcome('The dealer got a blackjack. You lose. Play again?')
            }
            setIsInitialDraw(false)
        }
    }, [playerHand, dealerHand])

    useEffect(() => {
        if(gameOver && !blackJack){
            if(playerPoints > 21) {
                setOutcome("That's a bust! You lose! Would you like to play again?")
            }else if(dealerPoints > 21) {
                setOutcome('Dealer Busts! You win! Play again?')
            }else if(dealerPoints>playerPoints) {
                setOutcome('You lost. Play again?')
            }else if(dealerPoints === playerPoints) {
                setOutcome("That's a push. Play again?")
            }else if(dealerPoints < playerPoints) {
                setOutcome('You win! Play again?')
            }
        }
    }, [gameOver])

    useEffect(() => {
            console.log('dealer points', dealerPoints)
            if(dealerTurn && dealerPoints >= 17) {
                console.log('other if', dealerPoints)
                setDealerTurn(false)
                setGameOver(true)
                console.log('gameOver')
            }else if(dealerTurn && dealerPoints < 17) {
                console.log('if', dealerPoints)
                let card = DrawCard(deck)
                setDealerHand(()=>[...dealerHand, card])
            }
    }, [dealerHand, dealerTurn, dealerPoints, gameOver])


    if(betting) {
        return (
            <div className="black-jack">
                <div>
                    <h1>Please Place Your Bet</h1>
                    <button onClick={() => handleBetClick(5)}>$5</button>
                    <button onClick={() => handleBetClick(10)}>$10</button>
                    <button onClick={() => handleBetClick(50)}>$50</button>
                    <button onClick={() => handleBetClick(100)}>$100</button>
                </div>
                <div>
                    <button onClick={() => handleBetClick(-5)}>-$5</button>
                    <button onClick={() => handleBetClick(-10)}>-$10</button>
                    <button onClick={() => handleBetClick(-50)}>-$50</button>
                    <button onClick={() => handleBetClick(-100)}>-$100</button>
                </div>
                <div>
                <h1>Current Bet: ${currentBet}</h1>
                    <button onClick={() => handleLockIn()}>Lock In Bet</button>
                </div>
            </div>
        )
    }
    return (
        <div className="black-jack">
            <aside className="black-jack-aside">
                <h1>Current Bet: ${currentBet}</h1>
            </aside>
            {gameOver || blackJack ? (
            <div>
                <h1>{outCome}</h1>
                <h1>Play Again?</h1>
                <button onClick={() => handleRestartClick()}>Yes</button>
                <button onClick={() => handleQuitClick()}>No</button>
            </div>)
            :
            null}
            {!dealerTurn && !gameOver && !blackJack ? (
                <div className="dealer-cards">
                <img src={CardsImages('Back')} style={{ width: "225px", height: "300px", borderRadius: "10px", margin: "0px 15px 0px 0px" }} />
                {dealerHand.slice(1).map((card, index) => {
                    return <Cards key={index} card={card} />
                })}
                </div>)
                :
                <div className="dealer-cards">
                    {dealerHand.map((card, index) => {
                    return <Cards key={index} card={card} />
                })}
                </div>
            }
            <div className="player-cards">
                {playerHand.map((card, index) => {
                    return <Cards key={index} card={card} />
                })}
            </div>
            <div className="action">
                <div style={{ paddingRight: "20px" }}>
                    <button className="action-btn" onClick={() => handleHitClick()}>Hit</button>
                </div>
                <div>
                    <button className="action-btn" onClick={() => handleHoldClick()}>Hold</button>
                </div>
            </div>
        </div>
    )
}