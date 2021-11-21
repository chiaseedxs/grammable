import React, { Component} from "react";
import LocationMap from "./locationmap.jsx"


class InstagramSpot extends Component {
  constructor(props) {
    super(props);

  }

  render () {
    let spot = this.props.info

    return (
      <div className="spot-page">
        <div className="spot-info">
        <div className="spot-name">{spot.Name}</div>
        <div className="picturebox">
          <img className="picex" src={spot.Picture[0]} />
        </div>
        <div className="spot-description">{spot.Description}</div>
        </div>

        <div className="map-info">
          <LocationMap location={spot.location.coordinates}/>
        </div>
      </div>
    )
  }

}

export default InstagramSpot;
