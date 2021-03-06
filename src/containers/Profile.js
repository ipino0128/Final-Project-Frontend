import React from 'react'
import {Redirect} from 'react-router-dom'
import FriendsContainer from './FriendsContainer'
import LanguagesContainer from './LanguagesContainer'
import WallContainer from './WallContainer'
import MyDecks from './MyDecks'
import MyFavorites from './MyFavorites'
import EditUserModal from '../components/EditUserModal'
import { Grid} from "semantic-ui-react";
import DateJoined from './DateJoined'


class Profile extends React.Component{

render(){
  let { currentUser } = this.props
 return currentUser ? (

   <div className="ProfilePage">
    <div className="cover">
      <img src={currentUser.coverphoto}/>
  </div>
   <div className="profile">

      <div className="ui card">
        <EditUserModal currentUser={currentUser}/>

          <img src={currentUser.image} alt="sdkfl"/>
        <div className="content">
          <a className="header">{currentUser.username}</a>
          <div className="description">
            {currentUser.bio}
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            {currentUser.friends.length} Friends
          </a>
        </div>


    </div>
    </div>
    <br/><br/>

<div className="ProfileStuff">

  <br/>
   <Grid columns={2} divided>
     <Grid.Column>
      <LanguagesContainer currentUser={currentUser}/>
    </Grid.Column>
    <Grid.Column>
     <DateJoined currentUser={currentUser}/>
    </Grid.Column>
  </Grid>
  <br/><br/><br/><br/>
  <WallContainer />
  <br/>
  <FriendsContainer currentUser={currentUser} user={currentUser}/>
  <MyDecks
    currentUser={currentUser}
    handleClick={this.props.displayDeckCards}
    decks={this.props.decks}
    addDecks={this.props.addDecks}
    updateCurrentDeck={this.props.updateCurrentDeck}
    languages={this.props.languages}/>
  <br/>
  <MyFavorites
  currentUser={this.props.currentUser}
  favorite_decks={this.props.favorite_decks}
  languages={this.props.languages}
  handleClick={this.props.displayDeckCards}/>
</div>
   </div>
 ) : <Redirect to='/login' />
 }
}

export default Profile;
