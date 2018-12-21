import React from 'react'
import {Link} from 'react-router-dom'

class MyFavorites extends React.Component{

  render(){
    const usersFavorites = this.props.favorite_decks.filter(deck=> deck.user_id === this.props.currentUser.id)
    console.log(usersFavorites)
    return(
      <div>

      <h3>My Flashcards: </h3>
        <div className="ui cards">
      {usersFavorites.map(favorite => {
        return(
          <div key={favorite.deck.id} className="card" onClick={()=>this.props.handleClick(favorite.deck)}>
            <div className="content">
            <div className="header">
              {favorite.deck.name}
              </div>
              <div className="meta">
              {(this.props.languages.filter(language=> language.id === favorite.deck.language_id))[0].name}
              </div>
              <div className="description">
                description....
              </div>
          </div>

          <Link to={`/decks/${favorite.deck.id}`}>
            <button data-itinerary-id={favorite.deck.id}>View Cards</button>
          </Link>
          </div>
        )
      })}
      </div>
      </div>
    )
  }
}

export default MyFavorites
