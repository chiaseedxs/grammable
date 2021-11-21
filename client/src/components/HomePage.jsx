import React, { Component} from "react";
import Searchbar from './Searchbar.jsx';
import Slider from '../helper/slider.jsx';
const axios = require('axios');



class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spots : [],
    }
  }


  componentDidMount() {
    axios.get('/getall')
    .then ((data) => {
      this.setState({
        spots: data.data
      })
    })
    .catch ((err) => {
      console.log(err)
    })
  }




  render () {

    return (
      <div>
        <Searchbar/>
        <h2 className="spot-title">Instagrammable Spots Near you</h2>
       <Slider slides={this.state.spots}/>

       <h2 className="spot-title around-the-world">Instagrammable Cities Around The World</h2>
       <div></div>
      </div>
    )
  }
}

export default HomePage;