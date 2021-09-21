import './styles/hands.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Cards from './Cards';
import { CardsImages } from './helpers/CardsImage'
import { useFetchChips } from '../hooks/useFetchChips';

export default function BlackJack({ user, chips, setChips }) {
    const history = useHistory()
    console.log(user)
    const gameId=1;
    //Make cards objects(eg: 1: {name: "Two of Spades", value: 2})
    const deck = [
        {name: 'Two of Spades', value: 2},
        {name: 'Two of Clubs', value: 2},
        {name: 'Two of Hearts', value: 2},
        {name: 'Two of Diamonds', value: 2},
        {name: 'Three of Spades', value: 3},
        {name: 'Three of Clubs', value: 3},
        {name: 'Three of Hearts', value: 3},
        {name: 'Three of Diamonds', value: 3},
        {name: 'Four of Spades', value: 4},
        {name: 'Four of Clubs', value: 4},
        {name: 'Four of Hearts', value: 4},
        {name: 'Four of Diamonds', value: 4},
        {name: 'Five of Spades', value: 5},
        {name: 'Five of Clubs', value: 5},
        {name: 'Five of Hearts', value: 5},
        {name: 'Five of Hearts', value: 5},
        {name: 'Six of Spades', value: 6},
        {name: 'Six of Clubs', value: 6},
        {name: 'Six of Hearts', value: 6},
        {name: 'Six of Diamonds', value: 6},
        {name: 'Seven of Spades', value: 7},
        {name: 'Seven of Clubs', value: 7},
        {name: 'Seven of Hearts', value: 7},
        {name: 'Seven of Diamonds', value: 7},
        {name: 'Eight of Spades', value: 8},
        {name: 'Eight of Clubs', value: 8},
        {name: 'Eight of Hearts', value: 8},
        {name: 'Eight of Diamonds', value: 8},
        {name: 'Nine of Spades', value: 9},
        {name: 'Nine of Clubs', value: 9},
        {name: 'Nine of Hearts', value: 9},
        {name: 'Nine of Diamonds', value: 9},
        {name: 'Ten of Spades', value: 10},
        {name: 'Ten of Clubs', value: 10},
        {name: 'Ten of Hearts', value: 10},
        {name: 'Ten of Diamonds', value: 10},
        {name: 'Jack of Spades', value: 10},
        {name: 'Jack of Clubs', value: 10},
        {name: 'Jack of Hearts', value: 10},
        {name: 'Jack of Hearts', value: 10},
        {name: 'Queen of Spades', value: 10},
        {name: 'Queen of Clubs', value: 10},
        {name: 'Queen of Hearts', value: 10},
        {name: 'Queen of Diamonds', value: 10},
        {name: 'King of Spades', value: 10},
        {name: 'King of Clubs', value: 10},
        {name: 'King of Hearts', value: 10},
        {name: 'King of Hearts', value: 10},
        {name: 'Ace of Spades', value: 11},
        {name: 'Ace of Clubs', value: 11},
        {name: 'Ace of Hearts', value: 11},
        {name: 'Ace of Diamonds', value: 11},
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
            setChips(prev => prev - currentBet)
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
            PlayerDrawCard(deck)]
        )
    }
    function handleHoldClick() {
        setDealerTurn(true)
    }
        
    function initialDraw() {
        setPlayerHand([...playerHand,
            PlayerDrawCard(deck),
            PlayerDrawCard(deck)]
        )
        setDealerHand([...dealerHand,
            DealerDrawCard(deck),
            DealerDrawCard(deck)]
        )
    }

    function PlayerDrawCard(deck) {
        let copyOfDeck = [...deck]
        let newCard = copyOfDeck[Math.floor(Math.random() * (copyOfDeck.length))]
        if(newCard.value === 11 && (playerPoints + newCard.value) > 21) {
            setPlayerPoints(prev => prev + 1)
        } else {
            setPlayerPoints(prev => prev + newCard.value)
        }
        return newCard
    }
    function DealerDrawCard(deck) {
        let copyOfDeck = [...deck]
        let newCard = copyOfDeck[Math.floor(Math.random() * (copyOfDeck.length))]
        if(newCard.value === 11 && (dealerPoints + newCard.value) > 21) {
            setDealerPoints(prev => prev + 1)
        } else {
            setDealerPoints(prev => prev + newCard.value)
        }
        return newCard
    }
    useEffect(() => {
        if(isInitialDraw === true && dealerHand.length > 0 && playerHand.length > 0){
            if(
            (playerHand[0].value === 11 && (playerHand[1].value === 10)) || 
            (playerHand[0].value === 10 && (playerHand[1].value === 11)) && 
            (dealerHand[0].value === 11 && (dealerHand[1].value === 10)) || 
            (dealerHand[0].value === 10 && (dealerHand[1].value === 11))
            ) {
                setBlackJack(true)
                setChips(prev => prev + currentBet)
                setOutcome("Both you and the dealer got a blackjack. It's a push. Play again?")
            }
            if(
            (playerHand[0].value === 11 && (playerHand[1].value === 10)) || 
            (playerHand[0].value === 10 && (playerHand[1].value === 11))
            ) {
                setBlackJack(true)
                setChips(prev => prev + currentBet + (currentBet * 1.5))
                setOutcome('Congrats! You got a blackjack! You win! Play again?')
            }
            if(
            (dealerHand[0].value === 11 && (dealerHand[1].value === 10)) || 
            (dealerHand[0].value === 10 && (dealerHand[1].value === 11))
            ) {
                setBlackJack(true)
                setOutcome('The dealer got a blackjack. You lose. Play again?')
            }
            setIsInitialDraw(false)
        }
    }, [playerHand, dealerHand])

    useEffect(() => {
        if(gameOver){
            if(playerPoints > 21) {
                setOutcome("That's a bust! You lose! Would you like to play again?")
            }else if(dealerPoints > 21) {
                setChips(prev => prev + (currentBet * 2))
                setOutcome('Dealer Busts! You win! Play again?')
            }else if(dealerPoints>playerPoints) {
                setOutcome('The dealer has more points. You lose. Play again?')
            }else if(dealerPoints === playerPoints) {
                setChips(prev => prev + currentBet)
                setOutcome("That's a push. Play again?")
            }else if(dealerPoints < playerPoints) {
                setChips(prev => prev + (currentBet * 2))
                setOutcome('You beat the dealer! Play again?')
            }
        }
    }, [gameOver])

    useEffect(() => {
        if(dealerTurn && dealerPoints >= 17) {
            setDealerTurn(false)
            setGameOver(true)
        }else if(dealerTurn && dealerPoints < 17) {
            setTimeout(() => {
                let card = DealerDrawCard(deck, true)
                setDealerHand(()=>[...dealerHand, card])
            }, 2000)
        }
    }, [dealerHand, dealerTurn])

    if(betting) {
        return (
            <div className="black-jack" style={{textAlign: "center"}}>
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
                <h2> Current Chips: ${chips}</h2>
                <button onClick={() => handleLockIn()}>Lock In Bet</button>
                </div>
            </div>
        )
    }
    return (
        <div className="black-jack" style={{textAlign: "center"}}>
            <aside className="black-jack-aside">
                <h1>Chips: ${chips}</h1>
                <h1>Bet: ${currentBet}</h1>
            </aside>
            {gameOver || blackJack ? (
            <div>
                <h2>{outCome}</h2>
                <h2>Play Again?</h2>
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
            { gameOver ? null :
            <div className="action">
                <div style={{ paddingRight: "20px" }}>
                    <button className="action-btn" onClick={() => handleHitClick()}>Hit</button>
                </div>
                <div>
                    <button className="action-btn" onClick={() => handleHoldClick()}>Hold</button>
                </div>
            </div>
            }
        </div>
    )
}