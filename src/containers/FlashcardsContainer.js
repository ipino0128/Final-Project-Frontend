import React from 'react'
import Flashcard from '../components/Flashcard'


class FlashcardsContainer extends React.Component{

  render(){

    return(
      <div className="FlashcardsContainer">
        {this.props.current_deck.cards.map(card=> {
          return(
            <Flashcard key={card.id} card={card}/>
          )
        })}
      </div>
    )
  }
}

export default FlashcardsContainer
