import React from 'react'

class WallContainer extends React.Component{
  render(){
    return(
      <div className="WallContainer">
      <div className="ui form">
        <div className="field">
          <textarea placeholder="Post on your wall..." rows="2"></textarea>
        </div>
         <button className="ui button" type="submit">Post</button>
        </div>
    </div>
    )
  }
}

export default WallContainer
