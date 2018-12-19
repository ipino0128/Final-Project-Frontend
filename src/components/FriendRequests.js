import React from 'react'
import {Redirect} from 'react-router-dom'

class FriendRequests extends React.Component{

  render(){
  let { currentUser } = this.props

   return currentUser ? (
      <div>
      {this.props.currentUser.friend_requests.map(userFriend=> {
        return(
          <div key={userFriend.id}>
          {userFriend.username} :
          <button onClick={()=>this.props.acceptFriendRequest(userFriend)}> Accept </button>
          </div>
        )
      })}
      </div>
    ) : <Redirect to='/login' />
  }
}

export default FriendRequests
