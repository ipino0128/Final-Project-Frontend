import React from 'react'
import Flashcard from '../components/Flashcard'


class FlashcardsContainer extends React.Component{


  render(){
    const filteredCards = this.props.cards.filter(card=> card.deck_id === this.props.current_deck.id)

    return(
      <div>
          <div className="FlashcardsContainer">
          {filteredCards.map(card => {
            return(
              <Flashcard key={card.id} card={card}/>
            )
          })}

          </div>

      </div>
    )
  }
}

export default FlashcardsContainer
