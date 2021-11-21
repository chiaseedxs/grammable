import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import AddSpot from "./components/AddSpot.jsx";
import HomePage from "./components/HomePage.jsx";
import LocationSearch from './components/locationSearch.jsx';
import RouteNotFound from './components/RouteNotFound.jsx';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";





ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="form" element={<AddSpot />} />
        <Route path=":location" element={< LocationSearch/>}/>
        <Route path="*"element={<RouteNotFound /> }/>
      </Route>
    </Routes>
  </BrowserRouter>,
document.getElementById("root"));