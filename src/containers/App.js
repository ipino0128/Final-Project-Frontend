import React, { Component } from 'react';
import '../App.css';
import NavBar from '../components/NavBar'
import Welcome from '../components/Welcome'
import Login from '../components/Login'
import Profile from './Profile'
import {Route, Redirect, Switch} from 'react-router-dom'
import DeckDetails from '../components/DeckDetails'
import FriendProfile from './FriendProfile'
import BrowseUsers from './BrowseUsers'
import FriendRequests from '../components/FriendRequests'
import BrowseLanguages from './BrowseLanguages'
import LanguageProfile from './LanguageProfile'
import Signup from '../components/Signup'


class App extends Component {
  constructor(){
    super()
    this.state={
      currentUser: null,
      currentUsersDecks: [],
      current_deck: null,
      languages: [],
      users: [],
      favorite_decks: [],

    }
  }

  handleDecks = () =>{
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/decks`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }).then(r => r.json())
    .then(data => {
      console.log(data.decks)
        this.setState({
          currentUsersDecks: data.decks
        })
      })
  }
  fetchLanguages = () => {
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/languages`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }).then(res=>res.json())
    .then(data => {
      this.setState({
        languages: data
      })
    })
  }

  fetchUsers = () => {
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/users/`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res=> res.json())
    .then(data=> this.setState({
      users: data
    }))

  }

  fetchFavorites = () =>{
    let token = localStorage.getItem('token')
    fetch(`http://localhost:3000/favorite_decks/`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res=> res.json())
    .then(data=> this.setState({
      favorite_decks: data
    }))
  }

  componentDidMount(){
    console.log("hello")
    let token = localStorage.getItem('token')
    if(!!token){
      console.log(token)
      console.log("inside token component did mount")
       fetch("http://localhost:3000/profile", {headers: {Authorization: `Bearer ${token}`}})
       .then(res => res.json())
       .then(data => {
         this.setState({
           currentUser: data.user
         })
         this.handleDecks()
         this.fetchLanguages()
         this.fetchUsers()
         this.fetchFavorites()
       })
  }
}


  updateCurrentUser = (user, decks) => {
    debugger
   this.setState({
     currentUser: user,
     currentUsersDecks: decks
   })
   this.handleDecks()
   this.fetchLanguages()
   this.fetchUsers()
   this.fetchFavorites()
   console.log(`token: ${localStorage.getItem('token')}`)
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

  addDecks = (deck) => {
    this.setState({
      currentUsersDecks: [...this.state.currentUsersDecks, deck]
    })
  }

  updateCurrentDeck = (deck) => {
    this.setState({
      current_deck: deck
    })
  }

  acceptFriendRequest = (userFriend) => {
    let token = localStorage.getItem('token')
    let filteredFriend = this.state.currentUser.inverse_friendships.filter(friendship=> friendship.user_id === userFriend.id)
    let friendshipId = filteredFriend[0].id
    fetch(`http://localhost:3000/friendships/${friendshipId}`, {
      method: "PATCH",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
      confirmed: true})
    }).then(res=> res.json())
    .then(data=> console.log(data))
  }

  removeDecks = (deck) => {
    this.setState({
    currentUsersDecks: this.state.currentUsersDecks.filter(prevDeck=> prevDeck.id !== deck.id)
  })
  }

  addFavorite = (favorite_deck) => {
debugger
console.log(this.state.favorite_decks.find(deck => deck.id === favorite_deck.id) === undefined)
    if (!this.state.favorite_decks.find(deck => deck.id === favorite_deck.id)) {
      this.setState({
        favorite_decks: [...this.state.favorite_decks, favorite_deck]
      })
    } else {
      console.log('goodbye')
    }
  }

  removeFavorite = (unfavorite_deck) => {
      this.setState({
        favorite_decks: this.state.favorite_decks.filter(prevDeck=> prevDeck.id !== unfavorite_deck.id)
      })
  }



  render() {
    return (
      <div className="App">
          <NavBar logged_in={!!this.state.currentUser} logout={this.logout}/>
          <Switch>
          <Route exact path="/profile" render={() =>
              <Profile
              languages={this.state.languages}
              currentUser={this.state.currentUser}
              displayDeckCards={this.displayDeckCards}
              decks={this.state.currentUsersDecks}
              addDecks={this.addDecks}
              updateCurrentDeck={this.updateCurrentDeck}
              favorite_decks={this.state.favorite_decks}
              />}
              />

            <Route exact path="/profile/:id" render={(data) => {
              return <FriendProfile
              friendId={data.match.params.id}
              currentUser={this.state.currentUser}
              displayDeckCards={this.displayDeckCards}
              decks={this.state.currentUsersDecks}
              addDecks={this.addDecks}
              updateCurrentDeck={this.updateCurrentDeck}
              languages={this.state.languages}
              />} }
                />

          <Route exact path="/users" render={() =>
              <BrowseUsers
              currentUser={this.state.currentUser}
              users={this.state.users}
              />}
              />
          <Route exact path="/languages" render={() =>
              <BrowseLanguages
              languages={this.state.languages}
              currentUser={this.state.currentUser}
              currentUser={this.state.currentUser}
              />}
              />
          <Route exact path="/languages/:id" render={(data) => {
              return <LanguageProfile
              languageID={data.match.params.id}
              languages={this.state.languages}
              currentUser={this.state.currentUser}
              handleClick={this.displayDeckCards}
              />} }
              />


          <Route exact path="/friendrequests" render={() =>
              <FriendRequests
              currentUser={this.state.currentUser}
              acceptFriendRequest={this.acceptFriendRequest}
              />}
              />
          <Route exact path="/login" render={() => this.state.currentUser ?
            <Redirect to='/'/> :
            <Login updateCurrentUser={this.updateCurrentUser}
            /> }
          />
          <Route exact path="/decks/:id" render={(data)=>{
            return <DeckDetails
              languages={this.state.languages}
              deckId={data.match.params.id}
              currentUser={this.state.currentUser}
              current_deck={this.state.current_deck}
              currentFriend={this.state.currentFriend}
              updateCurrentDeck={this.updateCurrentDeck}
              removeDecks={this.removeDecks}
              users={this.state.users}
              addFavorite={this.addFavorite}
              removeFavorite={this.removeFavorite}
              favorite_decks={this.state.favorite_decks}
            />
          }}
          />

          <Route exact path="/signup" render={() =>  <Signup
            updateCurrentUser={this.updateCurrentUser}/>} />

          <Route path='/' render={()=> <Welcome/>}/>

        </Switch>
      </div>
    )
  }
}

export default App;
