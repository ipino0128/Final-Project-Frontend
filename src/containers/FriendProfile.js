import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'
import AddFriend from '../components/AddFriend'
import UserDecks from './UserDecks'
import {Grid} from "semantic-ui-react";
import DateJoined from './DateJoined'


class FriendProfile extends React.Component{
  constructor(){
    super()
    this.state={
      current_friend: null
    }
  }

  componentDidMount(){

    let token = localStorage.getItem('token')
    let id = this.props.friendId
    fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      this.setState({
        current_friend: data
      })
    })
  }

  componentWillUnmount(){

  }

render(){

  let { current_friend } = this.state

 return current_friend ? (
   <div>
   <div className="cover">
     <img src={current_friend.coverphoto}/>
 </div>
   <div className="profile">


      <div className="ui card">

          <img src={current_friend.image} alt="sdkfl"/>

        <div className="content">
          <a className="header">{current_friend.username}</a>
          <div className="description">
            {current_friend.bio}
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            {current_friend.friends.length} Friends
          </a>
        </div>
          <AddFriend currentFriend={current_friend} currentUser={this.props.currentUser}/>
    </div>

    <div className="FriendWallContainer">

  </div>
  </div>
    <br/><br/><br/>

 <Grid columns={2} divided>
    <Grid.Column>
      <LanguagesContainer currentUser={current_friend}/>
    </Grid.Column>
    <Grid.Column>
     <DateJoined currentUser={current_friend}/>
    </Grid.Column>
  </Grid>
  <br/><br/><br/><br/><br/>
    <FriendsContainer currentUser={current_friend} user={this.props.currentUser} />
  <UserDecks languages={this.props.languages} currentFriend={current_friend} handleClick={this.props.displayDeckCards}/>


   </div>
 ) : null
 }
}

export default FriendProfile;
