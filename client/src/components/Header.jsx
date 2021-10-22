import React, { Component} from "react";
import AddSpot from './AddSpot.jsx'
import LoginButton from './LoginButton.jsx'

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
        <div className="header">
          <div className="title" onClick={()=> this.props.feed("home")}>grammable</div>
          <div className="fav" onClick={() => this.props.feed("favorite")}>Favorite</div>
          <div className="add-spot" onClick={() => this.props.feed("form")}>Add a location</div>
          <LoginButton/>
        </div>
    )
  }
}

export default Header;