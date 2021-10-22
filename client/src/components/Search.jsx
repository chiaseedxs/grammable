import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


function Search(props) {
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

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      props.panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };


  return (
    <div className="search">
      <input onChange={handleInput} placeholder="search a location"></input>
      <div className="search-options">
        {status === "OK" &&
        data.map(({id, description}, index) => (
          <div className="search-description" key={index} onClick={() => handleSelect(description)}>{description}</div>
        ))
        }
      </div>
    </div>
  );
}

export default Search;