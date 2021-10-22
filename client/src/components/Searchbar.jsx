import React, { Component} from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
const libraries = ["places"]
const axios = require('axios');

function Searchbar(props) {


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 28.5383, lng: () => -81.3792 },
      radius: 100 * 1000,
    },
  });


  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const getSpots = (lng, lat) => {
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

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();


    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat,lng)
      getSpots(lng, lat)
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (

    <div className="searchbar-ctn" ref={ref}>
      <div>Find Instagrammable Spots Anywhere In The World</div>
      <input className="searchbar" onChange={handleInput} placeholder="search a location"></input>
      <div className="searchbar-options">
        {status === "OK" &&
        data.map(({id, description}, index) => (
          <div className="searchbar-description" key={index} onClick={() => handleSelect(description)}>{description}</div>
        ))
        }
      </div>
    </div>
  );
}

// class Searchbar extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render () {
//     return (
//       <div className="searchbar-ctn">
//         <div>Find Instagrammable Spots Anywhere In The World</div>
//         <div>
//           <input className="searchbar" placeholder="Search by city, region, or zipcode"></input>

//         </div>

//       </div>
//     )
//   }
// }

export default Searchbar;