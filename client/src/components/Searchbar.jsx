import React, { Component} from "react";

class Searchbar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="searchbar-ctn">
        <div>Find Instagrammable Spots Anywhere In The World</div>
        <input className="searchbar" placeholder="Enter Location"></input>
      </div>
    )
  }
}

export default Searchbar;