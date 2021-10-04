import { Wheel } from "./roulette/components/Wheel"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import Countdown from "react-countdown"

const data = [
    [{ option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$500,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000,000!!', style: { backgroundColor: 'black', textColor: "gold" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$500,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }}],

    [{ option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$500,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$500,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000,000!!', style: { backgroundColor: 'black', textColor: "gold" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }}
    ],

    [{ option: '$1,000,000!!', style: { backgroundColor: 'black', textColor: "gold" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$500,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$15,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$25,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$5,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000,000!!', style: { backgroundColor: 'black', textColor: "gold" }},
    { option: '$50,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$12,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$100,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$500,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$1,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$10,000', style: { backgroundColor: 'white', textColor: "black" }},
    { option: '$150,000', style: { backgroundColor: 'white', textColor: "black" }}
    ]
]

export default function DailySlots({ setChips, user, setUser, canSpin }) {
    const [mustSpin, setMustSpin] = useState(false)
    const [prizeNumber, setPrizeNumber] = useState(Math.floor(Math.random() * 31))
    const [wheelNum, setWheelNum] = useState(Math.floor(Math.random() * data.length))
    const [amountWon, setAmountWon] = useState(null)

    const history = useHistory()

    function handleSpinClick() {
        setPrizeNumber(Math.floor(Math.random() * 31))
        setMustSpin(true)
    }

    function doneSpinning(res) {
        setChips(prev => prev + res)
        setAmountWon(res)
        const date = Date.now()
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                last_slots_time: date
            })
        })
        .then(res => res.json())
        .then(data => setUser(data))
    }

    function returnHomeClick() {
        history.push('/game_room')
    }

    return (
    canSpin ? 
    <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px" }}>
        <Wheel 
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data[wheelNum]}
            outerBorderColor={"black"}
            outerBorderWidth={4}
            radiusLineColor={"black"}
            radiusLineWidth={2}
            perpendicularText={false}
            textDistance={71}
            onStopSpinning={() => {
                const res = parseInt(data[wheelNum][prizeNumber].option.replace(/\D/g, ""));
                doneSpinning(res)
                setMustSpin(false)
            }}
        />
        <button onClick={handleSpinClick} className="action-btn" style={{ marginTop: "40px" }}>Spin to Win!</button>
        </div>
    </div>
    :
    amountWon ? 
    <div style={{ textAlign: "center" }}>
        <h1>Congrats! You won ${amountWon}! Come back in <Countdown date={user.last_slots_time + 86400000} /> to win again!</h1>
        <button className="action-btn" onClick={returnHomeClick}>Return Home</button>
    </div>
    :
    <div style={{ textAlign: "center" }}>
        <h1>Come back in <Countdown date={user.last_slots_time + 86400000} /> to win again!</h1>
        <button className="action-btn" onClick={returnHomeClick}>Return Home</button>
    </div> 
    )
}