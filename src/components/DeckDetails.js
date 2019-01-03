import React from 'react'
import FlashcardsContainer from '../containers/FlashcardsContainer'
import CardModal from './CardModal'
import FavoriteDeck from './FavoriteDeck'
import EditDeckModal from './EditDeckModal'
import {Button, Icon, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'



class DeckDetails extends React.Component{
  constructor(){
    super()
    this.state={
      cards:[]
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/cards`)
    .then(res=> res.json())
    .then(data => this.setState({
      cards: data
    }))
  }

  addCards = (card) => {
    this.setState({
      cards: [...this.state.cards, card]
    })
  }
  updateCards = (card) => {
    let newCards = this.state.cards.filter(prevCard=> prevCard.id !== card.id)
    this.setState({
      cards: [...newCards, card]
    })
  }

  removeCards = (card) =>{
    this.setState({
      cards: this.state.cards.filter(prevCard=> prevCard.id !== card.id)
    })
  }

  deleteDeck = () => {
    let token = localStorage.getItem('token')
    let id=this.props.current_deck.id
    fetch(`http://localhost:3000/decks/${id}`, {
      method: "DELETE",
      headers: {
          "Authorization" : `Bearer ${token}`
      }
    }).then(res=>res.json())
    .then(data=> {
      this.props.removeDecks(data)
    })
  }

render(){
  const filteredLanguage = this.props.languages.filter(language=> language.id === this.props.current_deck.language_id)

  const options = this.props.languages.map(language=> {
    return {key: language.id, text: language.name, value: language.id}
  })

  const deckAuthor = this.props.users.filter(user => user.id === this.props.current_deck.user_id)

    console.log(deckAuthor)

  return(
    <div>
    {this.props.currentUser  ?

      <div className="DeckDetails">
        <br/>
        <div className="DeckHeader">
        <h1> {this.props.current_deck.name}</h1>
         <Grid divided='vertically'>
           <Grid.Row columns={2}>
              <Grid.Column>
                  <Link to={`/profile/${deckAuthor[0].id}`}>
                <h3> Created by: {deckAuthor[0].username} </h3>
                </Link>
              </Grid.Column>
              <Grid.Column>
              <Link to={`/languages/${filteredLanguage[0].id}`}>
                <h3> Language: {filteredLanguage[0].name}</h3>
                </Link>
              </Grid.Column>
          </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column>
        <h4> {this.props.current_deck.description}</h4>
          </Grid.Column>
        </Grid.Row>
            </Grid>
            </div>

      { this.props.currentUser.id !== this.props.current_deck.user_id ?
        <div>
        <FavoriteDeck
        currentUser={this.props.currentUser}
        current_deck={this.props.current_deck}
        addFavorite={this.props.addFavorite}
        removeFavorite={this.props.removeFavorite}
        favorite_decks={this.props.favorite_decks}/>

        </div>
         :
         <div>
           <h3>Add card: </h3>
        <CardModal current_deck={this.props.current_deck} addCards={this.addCards}/>
        <EditDeckModal options={options} current_deck={this.props.current_deck} currentUser={this.props.currentUser} updateCurrentDeck={this.props.updateCurrentDeck}/>
        <Link to={`/profile`}>
          <Button color="black" onClick={this.deleteDeck} icon="remove" className="DeleteDeck"></Button>
        </Link>
        </div>
      }


        <FlashcardsContainer
        currentUser={this.props.currentUser}
        current_deck={this.props.current_deck}
        cards={this.state.cards}
        updateCards={this.updateCards}
        removeCards={this.removeCards}/>
      </div>
      : null
    }
    </div>
  )
}
}

export default DeckDetails
