import React from 'react'
import FlashcardsContainer from '../containers/FlashcardsContainer'

const DeckDetails = (props) => {
  return(
    <div className="DeckDetails">
    <h2> {props.current_deck.name}</h2>
    <h5> description... </h5>

    <FlashcardsContainer current_deck={props.current_deck}/>
    
    </div>
  )
}

export default DeckDetails
