import React, {useState, useRef, useEffect, useCallback} from 'react'
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';

const libraries = ["places"]

const containerStyle = {
  width: '1000px',
  height: '400px',
  margin: '0 auto'
};


const center = {
  lat: 28.5383,
  lng: -81.3792
};

function Map(props) {
  const { isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "AIzaSyCErUzhzp0VJp5RmpcASZmTpr7UbXXFa1M",
    libraries,
  })

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);



  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps"

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={props.location || center}
        onClick={onMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
      </GoogleMap>
    </div>
  )

}

export default Map;