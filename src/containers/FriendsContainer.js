import React from 'react'

const FriendsContainer = (props) => {
  return(
    <div className="FriendsContainer">
    <h5> Friends: </h5>
    {props.currentUser.friends.map(friend=> {
      return(
        <div key={friend.id} className="FriendCard" data-tooltip={friend.username} data-position="top left" data-inverted="">
        <img key={friend.id} alt="sfkdl" src={friend.image} />
        </div>
      )
    })}
    </div>
  )
}

export default FriendsContainer
