import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'
import AddFriend from '../components/AddFriend'
import UserDecks from './UserDecks'

class FriendProfile extends React.Component{

render(){

  let { currentFriend } = this.props

 return currentFriend ? (
   <div className="Profile">
           <h3> {currentFriend.username}'s profile </h3>
  <AddFriend currentFriend={currentFriend} currentUser={this.props.currentUser}/>
      <div className="ui card">
        <div className="image">
        <i className="edit icon" id="EditIcon"></i>
          <img src={currentFriend.image} alt="sdkfl"/>
        </div>
        <div className="content">
          <a className="header">{currentFriend.username}</a>
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
  <FriendsContainer currentUser={currentFriend} user={this.props.currentUser} setFriend={this.props.setFriend}/>
  <LanguagesContainer currentUser={currentFriend}/>
  <UserDecks currentFriend={currentFriend} handleClick={this.props.displayDeckCards}/>


   </div>
 ) : <Redirect to='/login' />
 }
}

export default FriendProfile;
