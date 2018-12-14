import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/NavBar'
import Welcome from '../components/Welcome'
import Login from '../components/Login'
import Profile from './Profile'
import {Route, Redirect, Switch} from 'react-router-dom'
import DeckDetails from '../components/DeckDetails'


class App extends Component {
  constructor(){
    super()
    this.state={
      currentUser: null,
      current_deck: null
    }
  }

  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
       fetch(`http://localhost:3000/profile`, {
         method: "GET",
         headers: {
           "Authentication" : `Bearer ${token}`
         }
       }).then(res => res.json())
       .then(data => {
         this.setState({
           currentUser: data
         })
       })
     }
  }

  updateCurrentUser = (user) => {
   this.setState({currentUser: user})
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({currentUser: null})
  }

  displayDeckCards = (deck) => {
    this.setState({
      current_deck: deck
    })
  }

  render() {
    return (
      <div className="App">
          <NavBar logged_in={!!this.state.currentUser} logout={this.logout}/>
          <Switch>
          <Route exact path="/profile" render={() =>
              <Profile
              currentUser={this.state.currentUser}
              displayDeckCards={this.displayDeckCards}
              />}
              />
          <Route exact path="/login" render={() => this.state.currentUser ?
            <Redirect to='/'/> :
            <Login updateCurrentUser={this.updateCurrentUser}
            /> }
          />
          <Route exact path="/decks/:id" render={(data)=>{
            console.log(data)
            return <DeckDetails deckId={data.match.params.id} currentUser={this.state.currentUser}/>
          }}
          />
          <Route path='/' render={()=> <Welcome/>}/>
        </Switch>
      </div>
    )
  }
}

export default App;
