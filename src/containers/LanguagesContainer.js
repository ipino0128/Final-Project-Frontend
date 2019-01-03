import React from 'react'

const LanguagesContainer = (props) => {

  return(
    <div className="LanguagesContainer">
    <h3> LANGUAGES: </h3>
    <ul>
    {props.currentUser.languages.map(language => {
      return(
        <li key={language.id}>{language.name}</li>
      )
    })}

    </ul>
    </div>
  )
}

export default LanguagesContainer
