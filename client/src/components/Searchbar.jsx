import React, { Component} from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useParams, useNavigate } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
const libraries = ["places"]
const axios = require('axios');
import 'regenerator-runtime/runtime'

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
  let navigate = useNavigate();


  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });


  const handleSelect = async (address) => {

    setValue(address, false);
    clearSuggestions();


    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
     navigate(`/location?lng=${lng}&lat=${lat}`)
      // getSpots(lng, lat)
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



export default Searchbar;