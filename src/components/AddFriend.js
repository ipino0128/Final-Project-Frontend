import React from 'react'

class AddFriend extends React.Component{
  constructor(){
    super()
    this.state={
      addIsClicked: false,
      removeIsClicked: false
    }
  }

  addFriendButton = () => {
    let token = localStorage.getItem('token')
    let data = {
      user_id: this.props.currentUser.id,
      friend_id: this.props.currentFriend.id,
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
    .then(data=> {
      console.log(data)
      this.setState({
        addIsClicked: true
      })
    })
  }

  removeFriendButton = ()=> {
    let filteredFriend = this.props.currentUser.friendships.filter(friendship=> friendship.friend_id === this.props.currentFriend.id)
    let friendshipId = filteredFriend[0].id
    fetch(`http://localhost:3000/friendships/${friendshipId}`, {
      method: "DELETE",
    }).then(res=> res.json())
    .then(data=> {
      console.log(data)
      this.setState({
        removeIsClicked: true
      })
    })

  }

  addFriendHandler = () =>{
    let idArray = this.props.currentUser.friends.map(friend=> friend.id)
    if (idArray.includes(this.props.currentFriend.id)){
      return(
        this.state.removeIsClicked ? <p> Friend removed </p> : <button onClick={this.removeFriendButton}>Remove friend</button>

      )
    } else {
      return(
        this.state.addIsClicked ? <p> Pending ... </p> : <button onClick={this.addFriendButton}>Add friend</button>
      )
    }

  }
  render(){
  return(
    <div>
    {this.addFriendHandler()}
    </div>
  )
}
}

export default AddFriend
