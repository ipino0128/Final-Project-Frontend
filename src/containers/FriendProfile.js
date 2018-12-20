import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'
import AddFriend from '../components/AddFriend'
import UserDecks from './UserDecks'

class FriendProfile extends React.Component{
  constructor(){
    super()
    this.state={
      current_friend: null
    }
  }

  componentDidMount(){

    let token = localStorage.getItem('token')
    let id = this.props.friendId
    fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      this.setState({
        current_friend: data
      })
    })
  }

  componentWillUnmount(){

  }

render(){

  let { current_friend } = this.state

 return current_friend ? (
   <div className="Profile">
           <h3> {current_friend.username}'s profile </h3>
  <AddFriend currentFriend={current_friend} currentUser={this.props.currentUser}/>
      <div className="ui card">
        <div className="image">
        <i className="edit icon" id="EditIcon"></i>
          <img src={current_friend.image} alt="sdkfl"/>
        </div>
        <div className="content">
          <a className="header">{current_friend.username}</a>
          <div className="description">
            my bio goes here
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
             Friends
          </a>
        </div>
    </div>

    <div className="FriendWallContainer">
    <div className="ui form">
      <div className="field">
        <textarea placeholder="Post on their wall..." rows="2"></textarea>
      </div>
       <button className="ui button" type="submit">Post</button>
      </div>
  </div>
  <FriendsContainer currentUser={current_friend} user={this.props.currentUser} />
  <LanguagesContainer currentUser={current_friend}/>
  <UserDecks currentFriend={current_friend} handleClick={this.props.displayDeckCards}/>


   </div>
 ) : null
 }
}

export default FriendProfile;
