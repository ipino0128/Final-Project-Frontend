import React from 'react'
import {Button, Icon, Label} from 'semantic-ui-react'

class FavoriteDeck extends React.Component{

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
      console.log(favorite_deck)
      this.props.addFavorite(favorite_deck)
    
    })
  }

  unfavoriteButton = () => {
    let favoriteDeckToDelete = this.props.favorite_decks.filter(favorite_deck => favorite_deck.deck_id === this.props.current_deck.id)
    let token = localStorage.getItem('token')
      fetch(`http://localhost:3000/favorite_decks/${favoriteDeckToDelete[0].id}`, {
        method: "DELETE",
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      }).then(res=>res.json())
      .then(unfavorite_deck=> {
        this.props.removeFavorite(unfavorite_deck)
        console.log(unfavorite_deck)

      })
  }

  render(){

    return(
  <div>


      <button onClick={this.favoriteButton}> favorite </button>


      <button onClick={this.unfavoriteButton}> unfavorite </button>

</div>
    )
  }
}

export default FavoriteDeck
