import React from 'react'
import Flashcard from '../components/Flashcard'


class FlashcardsContainer extends React.Component{

  render(){
    return(
      <div>
          <div className="FlashcardsContainer">
            {this.props.findDeck.cards.map(card=> {
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
