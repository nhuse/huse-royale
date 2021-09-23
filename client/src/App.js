import './App.css'
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup';
import GameRoom from './components/GameRoom'
import FrontPage from './components/FrontPage'
import GameSelector from './components/GameSelector';
import Profile from './components/Profile'

function App() {
  const [user, setUser] = useState({})
  const [chips, setChips] = useState(null)

  useEffect(() => {
    fetch('/me').then((r) => {
      if(r.ok){
        r.json().then((user) => {
          setUser(user)
          setChips(user.chips)
        })
      }
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
    }
  }, [chips])

  return (
    <Switch>
      <Route path='/login' >
        <Login setUser={setUser} setChips={setChips} />
      </Route>
      <Route path='/game/:game_id'>
        <GameSelector user={user} chips={chips} setChips={setChips} />
      </Route>
      <Route path='/signup' >
        <Signup setUser={setUser} setChips={setChips} />
      </Route>
      <Route path='/game_room'>
        <GameRoom user={user} setUser={setUser} />
      </Route>
      <Route path='/profile/:username'>
        <Profile user={user} chips={chips} setUser={setUser} />
      </Route>
      <Route exact path='/' render={() => (
        user ? <Redirect to='/game_room' /> : <FrontPage />
      )}/>
    </Switch>
  );
}

export default App;