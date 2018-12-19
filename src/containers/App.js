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


class App extends Component {
  constructor(){
    super()
    this.state={
      currentUser: null,
      current_friend: null,
      currentUsersDecks: [],
      current_deck: null,
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
      if(!!data){
        this.setState({
          currentUsersDecks: data.decks
        })
      }
      else{
        console.log(data)
      }
    })
  }


  componentDidMount(){
    console.log("hello")
    let token = localStorage.getItem('token')
    if(!!token){
      console.log("inside token component did mount")
       fetch(`http://localhost:3000/profile`, {
         method: "GET",
         headers: {
           "Authorization" : `Bearer ${token}`
         }
       }).then(res => {
         console.log(`app component did mount :${res}`)
         res.json()
       })
       .then(data => {
         console.log(data)
         this.setState({
           currentUser: data
         })
       })
  }
}


  updateCurrentUser = (user) => {
   this.setState({currentUser: user});
   this.handleDecks();
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

  setFriend = (friend) => {
    let id = friend.id
    fetch(`http://localhost:3000/users/${id}`)
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      this.setState({
        current_friend: data
      })
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


  render() {
    return (
      <div className="App">
          <NavBar logged_in={!!this.state.currentUser} logout={this.logout}/>
          <Switch>
          <Route exact path="/profile" render={() =>
              <Profile
              currentUser={this.state.currentUser}
              displayDeckCards={this.displayDeckCards}
              decks={this.state.currentUsersDecks}
              addDecks={this.addDecks}
              updateCurrentDeck={this.updateCurrentDeck}
              setFriend={this.setFriend}
              />}
              />

            <Route exact path="/profile/:id" render={() =>
              <FriendProfile
              currentFriend={this.state.current_friend}
              currentUser={this.state.currentUser}
              displayDeckCards={this.displayDeckCards}
              decks={this.state.currentUsersDecks}
              addDecks={this.addDecks}
              updateCurrentDeck={this.updateCurrentDeck}
              setFriend={this.setFriend}
              />}
                />

          <Route exact path="/users" render={() =>
              <BrowseUsers
              currentUser={this.state.currentUser}
              setFriend={this.setFriend}
              />}
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
            console.log(data)
            return <DeckDetails
              deckId={data.match.params.id}
              currentUser={this.state.currentUser}
              current_deck={this.state.current_deck}
              currentFriend={this.state.currentFriend}
              updateCurrentDeck={this.updateCurrentDeck}/>
          }}
          />
          <Route path='/' render={()=> <Welcome/>}/>
        </Switch>
      </div>
    )
  }
}

export default App;
