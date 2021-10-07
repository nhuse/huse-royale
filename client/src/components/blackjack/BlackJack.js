import './styles/hands.css'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Cards from './Cards';
import { CardsImages } from './helpers/CardsImage'

export default function BlackJack({ chips, setChips }) {
    const [Back, TwoOfClubs, TwoOfDiamonds, TwoOfHearts, TwoOfSpades,
        ThreeOfClubs, ThreeOfDiamonds, ThreeOfHearts, ThreeOfSpades,
        FourOfClubs, FourOfDiamonds, FourOfHearts, FourOfSpades,
        FiveOfClubs, FiveOfDiamonds, FiveOfHearts, FiveOfSpades,
        SixOfClubs, SixOfDiamonds, SixOfHearts, SixOfSpades,
        SevenOfClubs, SevenOfDiamonds, SevenOfHearts, SevenOfSpades,
        EightOfClubs, EightOfDiamonds, EightOfHearts, EightOfSpades,
        NineOfClubs, NineOfDiamonds, NineOfHearts, NineOfSpades,
        TenOfClubs, TenOfDiamonds, TenOfHearts, TenOfSpades,
        JackOfClubs, JackOfDiamonds, JackOfHearts, JackOfSpades,
        QueenOfClubs, QueenOfDiamonds, QueenOfHearts, QueenOfSpades,
        KingOfClubs, KingOfDiamonds, KingOfHearts, KingOfSpades,
        AceOfClubs, AceOfDiamonds, AceOfHearts, AceOfSpades] = CardsImages()
    const history = useHistory()
    const deck = [
        {name: 'Two of Spades', value: 2, image: TwoOfSpades},
        {name: 'Two of Clubs', value: 2, image: TwoOfClubs},
        {name: 'Two of Hearts', value: 2, image: TwoOfHearts},
        {name: 'Two of Diamonds', value: 2, image: TwoOfDiamonds},
        {name: 'Three of Spades', value: 3, image: ThreeOfSpades},
        {name: 'Three of Clubs', value: 3, image: ThreeOfClubs},
        {name: 'Three of Hearts', value: 3, image: ThreeOfHearts},
        {name: 'Three of Diamonds', value: 3, image: ThreeOfDiamonds},
        {name: 'Four of Spades', value: 4, image: FourOfSpades},
        {name: 'Four of Clubs', value: 4, image: FourOfClubs},
        {name: 'Four of Hearts', value: 4, image: FourOfHearts},
        {name: 'Four of Diamonds', value: 4, image: FourOfDiamonds},
        {name: 'Five of Spades', value: 5, image: FiveOfSpades},
        {name: 'Five of Clubs', value: 5, image: FiveOfClubs},
        {name: 'Five of Hearts', value: 5, image: FiveOfHearts},
        {name: 'Five of Diamonds', value: 5, image: FiveOfDiamonds},
        {name: 'Six of Spades', value: 6, image: SixOfSpades},
        {name: 'Six of Clubs', value: 6, image: SixOfClubs},
        {name: 'Six of Hearts', value: 6, image: SixOfHearts},
        {name: 'Six of Diamonds', value: 6, image: SixOfDiamonds},
        {name: 'Seven of Spades', value: 7, image: SevenOfSpades},
        {name: 'Seven of Clubs', value: 7, image: SevenOfClubs},
        {name: 'Seven of Hearts', value: 7,image: SevenOfHearts},
        {name: 'Seven of Diamonds', value: 7, image: SevenOfDiamonds},
        {name: 'Eight of Spades', value: 8, image: EightOfSpades},
        {name: 'Eight of Clubs', value: 8, image: EightOfClubs},
        {name: 'Eight of Hearts', value: 8, image: EightOfHearts},
        {name: 'Eight of Diamonds', value: 8, image: EightOfDiamonds},
        {name: 'Nine of Spades', value: 9, image: NineOfSpades},
        {name: 'Nine of Clubs', value: 9, image: NineOfClubs},
        {name: 'Nine of Hearts', value: 9, image: NineOfHearts},
        {name: 'Nine of Diamonds', value: 9, image: NineOfDiamonds},
        {name: 'Ten of Spades', value: 10, image: TenOfSpades},
        {name: 'Ten of Clubs', value: 10, image: TenOfClubs},
        {name: 'Ten of Hearts', value: 10, image: TenOfHearts},
        {name: 'Ten of Diamonds', value: 10, image: TenOfDiamonds},
        {name: 'Jack of Spades', value: 10, image: JackOfSpades},
        {name: 'Jack of Clubs', value: 10, image: JackOfClubs},
        {name: 'Jack of Hearts', value: 10, image: JackOfHearts},
        {name: 'Jack of Hearts', value: 10, image: JackOfDiamonds},
        {name: 'Queen of Spades', value: 10, image: QueenOfSpades},
        {name: 'Queen of Clubs', value: 10, image: QueenOfClubs},
        {name: 'Queen of Hearts', value: 10,image: QueenOfHearts},
        {name: 'Queen of Diamonds', value: 10, image: QueenOfDiamonds},
        {name: 'King of Spades', value: 10, image: KingOfSpades},
        {name: 'King of Clubs', value: 10, image: KingOfClubs},
        {name: 'King of Hearts', value: 10, image: KingOfHearts},
        {name: 'King of Diamonds', value: 10, image: KingOfDiamonds},
        {name: 'Ace of Spades', value: 11, image: AceOfSpades},
        {name: 'Ace of Clubs', value: 11, image: AceOfClubs},
        {name: 'Ace of Hearts', value: 11, image: AceOfHearts},
        {name: 'Ace of Diamonds', value: 11, image: AceOfDiamonds}
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

    // Handles betting at start of game
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

    // Checks that player inputted bet and starts the game on button click
    function handleLockIn() {
        if(currentBet > 0){
            setBetting(false)
            setChips(prev => prev - currentBet)
            initialDraw()
        }else {
            alert("Please Set your Bet greater than $0")
        }
    }

    // Checks for player bust
    useEffect(() => {
        if(playerPoints > 21) {
            setGameOver(true)
            setOutcome("That's a bust!")
        }
    }, [playerPoints])
    
    // Resets all state variables to default and restarts game
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
        history.push('/game_room')
    }

    function handleHitClick(){
        setPlayerHand([...playerHand,
            PlayerDrawCard(deck)]
        )
    }

    function handleHoldClick() {
        setDealerTurn(true)
    }
    
    // Adds two cards to both player and dealer hand at start of game
    function initialDraw() {
        setPlayerHand([...playerHand,
            PlayerDrawCard(deck),
            PlayerDrawCard(deck)
        ])
        setDealerHand([...dealerHand,
            DealerDrawCard(deck),
            DealerDrawCard(deck)
        ])
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

    // Checks if either dealer or player got a black jack
    useEffect(() => {
        if(isInitialDraw === true && dealerHand.length > 0 && playerHand.length > 0){
            if(
            (((playerHand[0].value === 11) && (playerHand[1].value === 10)) || 
            (((playerHand[0].value === 10) && (playerHand[1].value === 11)))) && 
            (((dealerHand[0].value === 11) && (dealerHand[1].value === 10)) || 
            (((dealerHand[0].value === 10) && (dealerHand[1].value === 11))))
            ) {
                setBlackJack(true)
                setChips(prev => prev + currentBet)
                setOutcome("Both you and the dealer got a blackjack. It's a push.")
            }
            if(
            (playerHand[0].value === 11 && (playerHand[1].value === 10)) || 
            (playerHand[0].value === 10 && (playerHand[1].value === 11))
            ) {
                setBlackJack(true)
                setChips(prev => prev + (currentBet + (currentBet * 1.5)))
                setOutcome('Congrats! You got a blackjack! You win!')
            }
            if(
            (dealerHand[0].value === 11 && (dealerHand[1].value === 10)) || 
            (dealerHand[0].value === 10 && (dealerHand[1].value === 11))
            ) {
                setBlackJack(true)
                setOutcome('The dealer got a blackjack. You lose.')
            }
            setIsInitialDraw(false)
        }
    }, [playerHand, dealerHand])

    // Sets game's outcome based on result when game is over
    useEffect(() => {
        if(gameOver){
            if(playerPoints > 21) {
                setOutcome("That's a bust! You lose!")
            }else if(dealerPoints > 21) {
                setChips(prev => prev + (currentBet * 2))
                setOutcome('Dealer Busts! You win!')
            }else if(dealerPoints>playerPoints) {
                setOutcome('The dealer has more points. You lose.')
            }else if(dealerPoints === playerPoints) {
                setChips(prev => prev + currentBet)
                setOutcome("That's a push.")
            }else if(dealerPoints < playerPoints) {
                setChips(prev => prev + (currentBet * 2))
                setOutcome('You beat the dealer!')
            }
        }
    }, [gameOver])

    // Dealer draws cards
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
                    <button className="bet-btn" onClick={() => handleBetClick(5)}>$5</button>
                    <button className="bet-btn" onClick={() => handleBetClick(10)}>$10</button>
                    <button className="bet-btn" onClick={() => handleBetClick(50)}>$50</button>
                    <button className="bet-btn" onClick={() => handleBetClick(100)}>$100</button>
                </div>
                <div>
                    <button className="bet-btn" onClick={() => handleBetClick(-5)}>-$5</button>
                    <button className="bet-btn" onClick={() => handleBetClick(-10)}>-$10</button>
                    <button className="bet-btn" onClick={() => handleBetClick(-50)}>-$50</button>
                    <button className="bet-btn" onClick={() => handleBetClick(-100)}>-$100</button>
                </div>
                <div>
                <h1>Current Bet: ${currentBet}</h1>
                <h2> Current Chips: ${chips}</h2>
                <button className="lockin-btn" onClick={() => handleLockIn()}>Lock In Bet</button>
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
                <button className="bet-btn" onClick={() => handleRestartClick()}>Yes</button>
                <button className="bet-btn" onClick={() => handleQuitClick()}>No</button>
            </div>)
            :
            null}
            {!dealerTurn && !gameOver && !blackJack ? (
                <div className="dealer-cards">
                <img src={Back} alt="card-back" style={{ width: "225px", height: "300px", borderRadius: "10px", margin: "0px 15px 0px 0px" }} />
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
            { gameOver || blackJack ? null :
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