import React from 'react'
import {Link} from 'react-router-dom'

const FriendsContainer = (props) => {
  return(
    <div className="FriendsContainer">
    <h3> FRIENDS: </h3>
    {props.currentUser.friends.map(friend=> {
      return(
      <div key={friend.id}>
      {friend.id === props.user.id
      ?
        <Link key={friend.id} to={`/profile`}>
          <div
            key={friend.id}
            className="FriendCard"
            data-tooltip="Me"
            data-position="top left"
            data-inverted="">
          <img key={friend.id} alt="sfkdl" src={friend.image} />
          </div>
          </Link>
         :
         <Link key={friend.id} to={`/profile/${friend.id}`}>
           <div
             key={friend.id}
             className="FriendCard"
             data-tooltip={friend.username}
             data-position="top left"
             data-inverted="">
           <img key={friend.id} alt="sfkdl" src={friend.image} />
           </div>
         </Link>

    }
      </div>
      )
    })}
    </div>
  )
}

export default FriendsContainer
