import React from 'react'

const AddFriend = (props) => {

  const addFriendButton = () => {
    let token = localStorage.getItem('token')
    let data = {
      user_id: props.currentUser.id,
      friend_id: props.currentFriend.id,
      confirmed: false
    }
    fetch(`http://localhost:3000/friendships`, {
      method: "POST",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res=> res.json())
    .then(data=>console.log(data))
  }

  const addFriendHandler = () =>{
    let idArray = props.currentUser.friends.map(friend=> friend.id)
    if (idArray.includes(props.currentFriend.id)){
      return(
        <div>
        Friends
        </div>
      )
    } else {
      return(
        <button onClick={addFriendButton}> Add friend</button>
      )
    }

  }
  return(
    <div>
    {addFriendHandler()}
    </div>
  )
}

export default AddFriend
