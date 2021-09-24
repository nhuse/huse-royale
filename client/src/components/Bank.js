import './styles/BankStyles.css'
import { useEffect, useState } from "react"

export default function Bank({ user, chips, setUser, setChips }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [transactions, setTransactions] = useState([])
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [depositAmount, setDepositAmount] = useState('')
    useEffect(() => {
        fetch(`/bank/${user.id}`)
        .then(r => r.json())
        .then(data => {
            setTransactions(data)
        })
    }, [])

    function handleDeposit(e) {
        e.preventDefault()
        const parsedAmount = parseInt(depositAmount)
        if(parsedAmount > 0) {
            fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chips: (user.chips - parsedAmount),
                bank: (user.bank + parsedAmount)
            })
            })
            .then(r => r.json())
            .then(data => {
                setChips(data.chips)
                setUser(data)
                setDepositAmount('')
            })
            fetch(`/bank`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: parsedAmount,
                user_id: user.id
            })
            })
            .then(r => r.json())
            .then(data => {
                setTransactions(data)
            })
        }
    }

    function handleWithdraw(e) {
        e.preventDefault()
        const parsedAmount = parseInt(withdrawAmount)
        if(parsedAmount > 0) {
            fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chips: (user.chips + parsedAmount),
                bank: (user.bank - parsedAmount)
            })
            })
            .then(r => r.json())
            .then(data => {
                setChips(data.chips)
                setUser(data)
                setWithdrawAmount('')
            })
            fetch(`/bank`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: (-Math.abs(parsedAmount)),
                user_id: user.id
            })
            })
            .then(r => r.json())
            .then(data => {
                setTransactions(data)
            })
        }
    }

    function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; 
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

    return (
        <div id="the-bank">
            <div className="info">
                <h1>Chips on Hand: ${chips}</h1>
                <h1>Chips in Bank: ${user.bank}</h1>
            </div>
            <div className="bank-tab">
                <div id="wd-wrapper">
                    <div className="withdraw">
                        <form onSubmit={handleWithdraw}>
                            <label htmlFor="withdraw-field" style={{ fontSize: "30px" }}>Withdraw Money</label> <br/>
                            <input 
                            type="number" 
                            min="0" 
                            max={`${user.bank}`} 
                            id="withdraw-field"
                            name="withdraw-input"
                            value={withdrawAmount}
                            placeholder="Enter $ Amount"
                            onChange={(e) => {
                                setWithdrawAmount(e.target.value)
                            }}
                            /> <br/>
                            <button type="submit" className="submit-btn">{ withdrawAmount > 0 ? `Withdraw $${withdrawAmount}` : `Enter amount to Withdraw`}</button>
                        </form>
                    </div>
                    <div className="deposit">
                        <form onSubmit={handleDeposit}>
                            <label htmlFor="deposit-field" style={{ fontSize: "30px" }}>Deposit Money</label> <br/>
                            <input
                            type="number"
                            min="1"
                            max={`${chips}`} 
                            id="deposit-field" 
                            name="desposit-input"
                            value={depositAmount}
                            placeholder="Enter $ Amount"
                            onChange={(e) => {
                                setDepositAmount(e.target.value)
                            }}
                            /> <br/>
                            <button type="submit" className="submit-btn">{ depositAmount > 0 ? `Deposit $${depositAmount}` : `Enter amount to Deposit`}</button>
                        </form>
                    </div>
                </div>
                <div id="recent-transactions-wrapper">
                    <h1>Recent Transactions</h1>
                    <ul style={{ height: "auto", marginRight: "30px", width: "50vw", border: "4px solid grey", borderRadius: "20px" }}>
                    {transactions.map(t => {
                        const date = new Date(t.created_at)
                        const string = `${months[date.getMonth()]} ${date.getDate()} at ${formatAMPM(date)}`
                        return (
                            t.amount > 0 ?
                            <li>
                                <span className="positive-amount">+${t.amount}</span> on {string}
                            </li>
                            :
                            <li>
                                <span className="negative-amount">-${Math.abs(t.amount)}</span> on {string}
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
        </div>
    )
}