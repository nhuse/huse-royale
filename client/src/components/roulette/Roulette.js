import { useState } from "react";
import { useHistory } from 'react-router-dom'
import { Wheel } from "./components/Wheel"

const data = [
    { option: '0', style: { backgroundColor: 'green', textColor: "white" }},
    { option: '1', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '2', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '3', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '4', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '5', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '6', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '7', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '8', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '9', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '10', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '11', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '12', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '13', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '14', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '15', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '16', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '17', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '18', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '19', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '20', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '21', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '22', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '23', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '24', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '25', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '26', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '27', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '28', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '29', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '30', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '31', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '32', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '33', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '34', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '35', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '36', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '37', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '38', style: { backgroundColor: 'black', textColor: "white" }},
    { option: '39', style: { backgroundColor: 'red', textColor: "white" }},
    { option: '40', style: { backgroundColor: 'black', textColor: "white" }},
]
function Roulette({ chips, setChips }) {
    const history = useHistory()
    const [mustSpin, setMustSpin] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [betting, setBetting] = useState(true)
    const [userNumber, setUserNumber] = useState('')
    const [outcome, setOutcome] = useState('')
    const [prizeNumber, setPrizeNumber] = useState(Math.floor(Math.random() * 41))
    const [currentBet, setCurrentBet] = useState(0)

    const handleSpinClick = () => {
        setPrizeNumber(Math.floor(Math.random() * 41))
        setMustSpin(true)
    }

    const handleBetLockIn = () => {
        if((currentBet > 0) && (userNumber !== '')){
            setBetting(false)
        } else {
            alert("Please enter a lucky number and a bet greater than $0")
        }
    }

    const handleUserNumberChange = (e) => {
        setUserNumber(e.target.value)
    }

    const handleBetClick = (amount) => {
        if((currentBet+amount) > chips){
            alert('Not enough money')
        }else if((currentBet+amount) > 500 ){
            alert('Max bet is $500')
        }else if((currentBet + amount) < 0) {
        }else {
            setCurrentBet(prev => prev + amount)
        }
    }

    const winOrLose = () => {
        if(userNumber == prizeNumber) {
            setChips(prev => prev + (currentBet * 50))
            setOutcome('Congrats! You win!')
        } else {
            setChips(prev => prev - currentBet)
            setOutcome('You picked the wrong number. You lose.')
        }
        setGameOver(true)
    }

    function handleRestartClick() {
        setPrizeNumber(Math.floor(Math.random() * 41))
        setUserNumber('')
        setCurrentBet(0)
        setGameOver(false)
        setBetting(true)
    }

    function handleQuitClick() {
        history.push('/game_room')
    }

    return (
    <div style={{ textAlign: "center" }}>
            {gameOver ? 
                <div style={{ textAlign: "center" }}>
                    <h2>{outcome}</h2>
                    <h2>Play Again?</h2>
                    <button onClick={() => handleRestartClick()}>Yes</button>
                    <button onClick={() => handleQuitClick()}>No</button>
                </div>
                :
                null}
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Wheel 
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                outerBorderColor={"gold"}
                outerBorderWidth={4}
                radiusLineColor={"gold"}
                radiusLineWidth={2}
                perpendicularText={true}
                textDistance={80}
                onStopSpinning={() => {
                    setMustSpin(false)
                    setBetting(true)
                    winOrLose()
                }}
            />
        </div>
        <div>
            {!gameOver && !betting ?
            <button onClick={handleSpinClick} className="action-btn" >Spin!</button>
            :
            <div style={{height: '50px'}} /> }
            
        </div>
        { betting && !gameOver ? (
            <div className="roulette" style={{textAlign: "center"}}>
                <div>
                    <h2 style={{ marginBottom: "10px" }}>Please Place Your Bet</h2>
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
                    <h2 style={{ margin: "5px 0px 5px 0px" }}>Current Bet: ${currentBet}</h2>
                    <h2 style={{ marginBottom: "15px", marginTop: "5px" }}> Current Chips: ${chips}</h2>
                </div>
                <label htmlFor="user-number"><h2 style={{ marginTop: "0px" }}>Please enter your lucky number (0-40):</h2></label>
                <input type="number" id="user-number" name="user-number" min="0" max="40" onChange={handleUserNumberChange} /> <br/>
                <button onClick={() => handleBetLockIn()} style={{textAlign: "center"}}>Lock In Bet</button>
            </div>) 
        :
        <>
        <h1>Current Bet: ${currentBet}</h1>
        <h1>Your Lucky Number: {userNumber}</h1>
        </>}
        
    </div>
    )
}

export default Roulette