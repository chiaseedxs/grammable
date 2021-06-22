import React, { Component} from "react";
import AddSpot from './AddSpot.jsx'

class Header extends Component {
  constructor(props) {
    super(props);




  }


  render () {
    return (
        <div className="header">
          <div className="title" onClick={()=> this.props.feed("search")}>grammable</div>
          <div>Favorite</div>
          <div className="add-spot" onClick={() => this.props.feed("form")}>Add a location</div>
          <div className="login">Sign in</div>
        </div>
    )
  }
}

export default Header;