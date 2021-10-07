import './App.css'
import { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup';
import GameRoom from './components/GameRoom'
import Navbar from './components/Navbar'
import GameSelector from './components/GameSelector';
import Profile from './components/Profile'
import Comments from './components/Comments';
import Bank from './components/Bank';
import DailySlots from './components/DailySlots'

function App() {
  const [user, setUser] = useState(null)
  const [chips, setChips] = useState(null)
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch('/me').then((r) => {
      if(r.ok){
        r.json().then(user => {
          setUser(user)
          setChips(user.chips)
        })
      }
    })
    fetch(`/comments`)
    .then(r => r.json())
    .then(data => {
      setComments(data)
    })
  }, [])

  useEffect(() => {
    if(user){
      let data={
        chips: chips
      }
      fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(data => {
        setUser(data)
      })
    }
  }, [chips])

  if(!user) {
    return (
    <div>
        <h1 style={{ textAlign: 'center', marginTop: '0px', color: "gold", fontSize: '70px', fontFamily: "Lucida Handwriting", textShadow: "2px 3px #000000" }}>
          The Huse Royale
        </h1><br/>
        <h1 style={{ textAlign: 'center', marginTop: '0px' }}>
          Please <Link to='/login'>LOGIN</Link> or <Link to='/signup'>REGISTER</Link> to play our games!
        </h1>
        <Switch>
          <Route path="/login">
            <Login setUser={setUser} setChips={setChips} />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} setChips={setChips} />
          </Route>
        </Switch>
    </div>)
  }

  return (
    <div>
      <div>
        <Navbar user={user} setUser={setUser} chips={chips} />
      </div>
      <Switch>
        <Route path='/login'>
          <Login setUser={setUser} setChips={setChips} />
        </Route>
        <Route path='/game/:game_id'>
          <GameSelector user={user} chips={chips} setChips={setChips} />
        </Route>
        <Route path='/signup'>
          <Signup setUser={setUser} setChips={setChips} />
        </Route>
        <Route path='/game_room'>
          <GameRoom user={user} chips={chips} />
        </Route>
        <Route path='/comments/game/:game_id'>
          <Comments user={user} comments={comments} setComments={setComments} />
        </Route>
        <Route path='/profile/:user_id'>
          <Profile comments={comments} setComments={setComments} user={user} setUser={setUser} chips={chips} />
        </Route>
        <Route path='/bank'>
          <Bank user={user} chips={chips} setUser={setUser} setChips={setChips} />
        </Route>
        <Route path='/daily_slots'>
          <DailySlots setChips={setChips} user={user} setUser={setUser} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;