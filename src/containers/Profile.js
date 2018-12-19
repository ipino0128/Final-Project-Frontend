import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'

class Profile extends React.Component{

render(){
  
  let { currentUser } = this.props

 return currentUser ? (
   <div className="Profile">
           <h3> {currentUser.username}'s profile </h3>
      <div className="ui card">
        <div className="image">
        <i className="edit icon" id="EditIcon"></i>
          <img src={currentUser.image} alt="sdkfl"/>
        </div>
        <div className="content">
          <a className="header">{currentUser.username}</a>
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
  <FriendsContainer currentUser={currentUser} setFriend={this.props.setFriend}/>
  <LanguagesContainer currentUser={currentUser}/>
  <MyDecks currentUser={currentUser} handleClick={this.props.displayDeckCards} decks={this.props.decks} addDecks={this.props.addDecks} updateCurrentDeck={this.props.updateCurrentDeck}/>

   </div>
 ) : <Redirect to='/login' />
 }
}

export default Profile;
