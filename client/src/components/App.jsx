import React, { Component} from "react";
import ReactDOM from "react-dom";
import Searchbar from './Searchbar.jsx'
import HomePage from './HomePage.jsx'
import Header from './Header.jsx'
import AddSpot from './AddSpot.jsx'
import Map from './googlemap.jsx'
import InstagramSpot from './InstagramSpot.jsx'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "home",
      info: {},
      location: {
        lat: 28.5383,
        lng: -81.3792
      }
    }

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
    this.instagramSpot = this.instagramSpot.bind(this);
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition (
      (position) => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      }
    )
  }

  changeView(option) {
    this.setState({
      view: option
    })
  }

  instagramSpot (info) {
    this.setState({
      info: info
    }, this.changeView("instaSpot"))
  }

  renderView () {
    const {view} = this.state;

    if (view === "home") {
      return <HomePage  addSpot={this.instagramSpot}/>
    }
    if (view === "form") {
      return <AddSpot/>
    }
    if (view === "instaSpot") {
      return <InstagramSpot info={this.state.info}/>
    }
  }

  render () {
    return (
      <div>
        <Header feed={this.changeView}/>
        {this.renderView()}
      </div>
    )
  }
}

export default App;