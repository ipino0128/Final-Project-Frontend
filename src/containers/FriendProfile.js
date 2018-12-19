import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'
import AddFriend from '../components/AddFriend'

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

  <WallContainer />
  <FriendsContainer currentUser={currentFriend} setFriend={this.props.setFriend}/>
  <LanguagesContainer currentUser={currentFriend}/>


   </div>
 ) : <Redirect to='/login' />
 }
}

export default FriendProfile;
