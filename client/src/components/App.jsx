import React, { Component} from "react";
import Searchbar from './Searchbar.jsx'
import Header from './Header.jsx'
import AddSpot from './AddSpot.jsx'
import Map from './googlemap.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "search",
      location: {
        lat: 28.5383,
        lng: -81.3792
      }
    }

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
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

  renderView () {
    const {view} = this.state;

    if (view === "search") {
      return (
       <div>
        <Searchbar/>
        <Map location={this.state.location}/>
       </div>
      )
    }
    if (view === "form") {
      return <AddSpot/>

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