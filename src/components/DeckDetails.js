import React from 'react'
import FlashcardsContainer from '../containers/FlashcardsContainer'
import CardModal from './CardModal'


const DeckDetails = (props) => {

  const findDeck = props.currentUser.decks.find(deck=> {
      return deck.id === parseInt(props.deckId)
    })


  return(
    <div>
    {props.currentUser ?

      <div className="DeckDetails">
        <h2> {findDeck.name}</h2>
        <h5> description... </h5>
        <CardModal/>
        <FlashcardsContainer findDeck={findDeck} />
      </div>
      : null
    }
    </div>
  )
}

export default DeckDetails
