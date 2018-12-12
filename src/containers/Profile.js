import React from 'react'
import {Redirect} from 'react-router-dom'

const Profile = (props) => {

  let { currentUser } = props

 return currentUser ? (
   <div className="Profile">
   <h3> {currentUser.username}'s profile </h3> 
   </div>
 ) : <Redirect to='/login' />
}

export default Profile;
