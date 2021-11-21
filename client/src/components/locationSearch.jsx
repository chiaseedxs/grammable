import React from "react";
import ReactDOM from "react-dom";
import { useParams, useLocation, useSearchParams } from "react-router-dom";
import LocationSearchResult from './LocationSearchResult.jsx';


export default function LocationSearch () {

  let location = useLocation();
  let [params] = useSearchParams(location);
  let coordinates = [params.get('lng'), params.get('lat')]

  return (
    <LocationSearchResult coordinates={coordinates}/>
  )
}
