import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'

const Profile = (props) => {


  let { currentUser } = props

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
            {currentUser.friends.length} Friends
          </a>
        </div>
    </div>

  <WallContainer />
  <FriendsContainer currentUser={currentUser}/>
  <LanguagesContainer currentUser={currentUser}/>
  <MyDecks currentUser={currentUser} handleClick={props.displayDeckCards}/>

   </div>
 ) : <Redirect to='/login' />
}

export default Profile;
