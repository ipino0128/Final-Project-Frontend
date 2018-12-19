import React from 'react'
import {Link} from 'react-router-dom'

const FriendsContainer = (props) => {
  return(
    <div className="FriendsContainer">
    <h5> Friends: </h5>
    {props.currentUser.friends.map(friend=> {
      return(
      <Link key={friend.id} to={`/profile/${friend.id}`}>
        <div onClick={()=>props.setFriend(friend)} 
          key={friend.id}
          className="FriendCard"
          data-tooltip={friend.username}
          data-position="top left"
          data-inverted="">
        <img key={friend.id} alt="sfkdl" src={friend.image} />
        </div>
      </Link>
      )
    })}
    </div>
  )
}

export default FriendsContainer
