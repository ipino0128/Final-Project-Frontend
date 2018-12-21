import React from 'react'
import {Link, Redirect} from 'react-router-dom'

class LanguageProfile extends React.Component{
  constructor(){
    super()
    this.state={
      current_language: null
    }
  }

  componentDidMount(){
    let id = this.props.languageID
    fetch(`http://localhost:3000/languages/${id}`)
    .then(res=>res.json())
    .then(data=> {
      console.log(data)
      this.setState({
        current_language: data
      })
    })
  }

  render(){
  return this.props.currentUser && this.state.current_language ? (
      <div>
      <h1>{this.state.current_language.name} </h1>
      <h4> {this.state.current_language.nativeName}</h4>
      <div className="ui cards">
      {this.state.current_language.decks.map(deck => {
        return(
          <div key={deck.id} className="card" onClick={()=>this.props.handleClick(deck)}>
            <div className="content">
            <div className="header">
              {deck.name}
              </div>
              <div className="meta">
              {(this.props.languages.filter(language=> language.id === deck.language_id))[0].name}
              </div>
              <div className="description">
                description....
              </div>
          </div>

          <Link to={`/decks/${deck.id}`}>
            <button data-itinerary-id={deck.id}>View Cards</button>
          </Link>
          </div>
        )
      })}
      </div>
      </div>
    ) : null
  }

}

export default LanguageProfile
