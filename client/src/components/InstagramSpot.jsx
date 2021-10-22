import React, { Component} from "react";

class InstagramSpot extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    let spot = this.props.info

    return (
      <div className="spot-page">
        <div className="picturebox">
          <img className="picex" src={spot.Picture[0]} />
        </div>

        <div className="spot-info">
          <div className="spot-name">{spot.Name}</div>
          <div className="spot-description">{spot.Description}</div>
        {spot.isBusiness ? <div>
          {spot.Email}
          {spot.Link}
          {spot.phoneNumber}
        </div> : null}
        </div>
      </div>
    )
  }

}

export default InstagramSpot;
