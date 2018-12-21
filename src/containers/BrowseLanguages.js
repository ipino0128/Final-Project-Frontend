import React from 'react'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

class BrowseLanguages extends React.Component{
  constructor(){
    super()
    this.state={
      searchTerm: ""
    }
  }

  handleSearchChange = (event, {value}) => {
      this.setState({
        searchTerm: value
      })
}

  render(){
    const searchedLanguages = this.props.languages.filter(language=> {
      return language.name.toLowerCase().includes(this.state.searchTerm)
    })


     return this.props.currentUser ? (
      <div>
      <Search className="search-feature" onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
      <ul>
      {searchedLanguages.map(language=> {
        return (

          <Link key={language.id} to={`/languages/${language.id}`}>
            <li key={language.id}> {language.name} </li>
          </Link>
        )
      })}
      </ul>
      </div>
    ) : <Redirect to='/login' />
  }
}

export default BrowseLanguages
