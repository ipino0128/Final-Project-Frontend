import React from 'react'
import {Button, Icon, Label} from 'semantic-ui-react'

class FavoriteDeck extends React.Component{
  constructor(){
    super()
    this.state={
      isClicked: false
    }
  }

  favoriteButton = () => {
    let token = localStorage.getItem('token')
    let data = {
      user_id: this.props.currentUser.id,
      deck_id: this.props.current_deck.id
    }
    fetch(`http://localhost:3000/favorite_decks`, {
      method: "POST",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(favorite_deck => {
      console.log(data)
      this.props.addFavorite(favorite_deck)
      this.setState({isClicked: true})
    })
  }

  render(){
    return(
      this.state.isClicked ?
      <Button color="red" as='div' labelPosition='right' onClick={this.favoriteButton}>
      <Button icon>
        <Icon name='heart' />
      </Button>
      <Label as='a' basic pointing='left'>
        0
      </Label>
    </Button> : <Button as='div' labelPosition='right' onClick={this.favoriteButton}>
    <Button icon>
      <Icon name='heart' />
    </Button>
    <Label as='a' basic pointing='left'>
      0
    </Label>
  </Button>
    )
  }
}

export default FavoriteDeck
