import './App.css'
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './components/Login'
import Signup from './components/Signup';
import GameRoom from './components/GameRoom'
import FrontPage from './components/FrontPage'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch('/me').then((r) => {
      if(r.ok){
        r.json().then((user) => {
          setUser(user)
        })
      }
    })
  }, [])

  return (
    <Switch>
      <Route path='/login' >
        <Login />
      </Route>
      <Route path='/signup' >
        <Signup />
      </Route>
      <Route path='/game-room'>
        <GameRoom user={user} />
      </Route>
      <Route exact path='/' render={() => (
        user ? <Redirect to='/game-room' /> : <FrontPage />
      )}/>
    </Switch>
  );
}

export default App;