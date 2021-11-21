import React, {useState, useRef, useEffect, useCallback} from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';


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


function LocationMap (props) {
  const center = {
    lat: props.location[1],
    lng: props.location[0]
  };

  return (
    <div className="locationmap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        options={options}
        center={center}
        // onClick={onMapClick}
        // onLoad={onMapLoad}

      >
        <Marker
            position={center}
          />
      </GoogleMap>
    </div>

  )

}

export default LocationMap;
