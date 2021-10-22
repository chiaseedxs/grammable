import React, { Component} from "react";
import Searchbar from './Searchbar.jsx';
const axios = require('axios');



class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spots : [],
      beginning: 0,
      ending: 4
    }

    this.nextArrow = this.nextArrow.bind(this);
    this.backArrow = this.backArrow.bind(this);
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

  nextArrow () {
    if (this.state.ending === this.state.spots.length) {
      return;
    } else {
      this.setState({
        beginning: this.state.beginning + 1,
        ending: this.state.ending + 1
      })
    }
  }

  backArrow () {
    if (this.state.beginning === 0) {
      return;
    } else {
      this.setState({
        beginning: this.state.beginning - 1,
        ending: this.state.ending - 1
      })
    }
  }


  render () {
    return (
      <div>
        <Searchbar/>
        <h2 className="spot-title">Instagrammable Spots Near you</h2>
        {this.state.spots ?

        <div className="location-hg">
          <button className="back-btn" onClick={this.backArrow}></button>
          {this.state.spots.slice(this.state.beginning,this.state.ending).map((spot, index)=> {
              var styleSection = {
                backgroundImage: `url(${spot.Picture[0]})`,
                backgroundSize: "cover",
                marginRight: "1em",
                width: "300px",
                height: "187.5px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                borderRadius: "9px"
              }
            return (
              <div className="spot" key={index}>
                <div className="image-hg" style={styleSection}></div>
                <div className="spotName" onClick={() => this.props.addSpot(spot)}>{spot.Name}</div>
                {spot.Description.length < 123 ?
                <div className="spotDescription">{spot.Description}</div>
                : <div className="spotDescription">{spot.Description.slice(0, 124) + '...'}
                </div>
                }

                <button className="fav-button"></button>
              </div>
            )
          })}
          <button className="forward-btn" onClick={this.nextArrow}></button>
        </div>

        : null
        }
      </div>
    )
  }
}

export default HomePage;