import React, { Component} from "react";
const axios = require('axios');




class LocationSearchResult extends Component {
  constructor(props) {
    super(props);

    this.getSpots = this.getSpots.bind(this);
  }

   getSpots (lng, lat) {
    var obj = {lng: lng, lat: lat};
    axios.get('/spots', {
      params: {
        coordinates: obj
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  componentDidMount() {
    this.getSpots(this.props.coordinates[0], this.props.coordinates[1]);
  }




  render () {

    return (
      <div>
        TESTTTT
      </div>
    )
  }
}

export default LocationSearchResult;