import React, { Component} from "react";
import AddSpot from './AddSpot.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";



class Header extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <nav className="header">
          <Link className="title" to="/">Grammable</Link>
          <Link className="fav" to="favorite">Favorite</Link>
          <Link className="add-spot" to="form"> Add a location </Link>
        </nav>
        <Outlet />

      </div>

    )
  }
}

export default Header;