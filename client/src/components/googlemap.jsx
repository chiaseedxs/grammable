import React, {useState, useRef, useEffect, useCallback} from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import 'regenerator-runtime/runtime'
import Search from './Search.jsx'
const libraries = ["places"]

// styling for map
const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '0 auto'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

// location of map
const center = {
  lat: 28.5383,
  lng: -81.3792
};

// MAP
function Map(props) {
  // const { isLoaded, loadError} = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries,
  // })

  // states
  const [marker, setMarker] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  // function for clicking and pinning map
  const onMapClick = React.useCallback((e) => {
    let location = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    }
    setMarker(location)
    props.handleAddress(location);
  }, []);


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);


  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading Maps"

  return (
    <div className="map">
      <Search panTo={panTo} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        options={options}
        center={props.location || center}
        onClick={onMapClick}
        onLoad={onMapLoad}

      >
        { marker ?
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            // onClick={() => {
            //   setSelected(marker);
            // }}
          /> : null
        }
      </GoogleMap>
    </div>
  )

}

export default Map;