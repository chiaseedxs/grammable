import React, { Component} from "react";
import Searchbar from './Searchbar.jsx'
import Header from './Header.jsx'
import AddSpot from './AddSpot.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "search"
    }

    this.changeView = this.changeView.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  changeView(option) {
    this.setState({
      view: option
    })
  }

  renderView () {
    const {view} = this.state;

    if (view === "search") {
      return <Searchbar/>
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