import React from 'react'
import { Button} from "semantic-ui-react";

class WallContainer extends React.Component{
  render(){
    return(
      <div className="WallContainer">
      <div className="ui form">
        <div className="field">
          <textarea placeholder="My Status" rows="2"></textarea>
        </div>
        <Button color="teal" content='Post' />
        </div>
    </div>
    )
  }
}

export default WallContainer
