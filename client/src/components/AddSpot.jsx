import React, { Component} from "react";
import Searchbar from './Searchbar.jsx'
import Header from './Header.jsx'

class AddSpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business: false,
      photo: {}
    }
    this.handleBusiness = this.handleBusiness.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
  }

  handleBusiness (event) {
    this.setState({
      business: event.target.value === 'false' ? false : true
    })
  }

  handlePhoto (event) {
    var photos = this.state.photo;
    photos[URL.createObjectURL(event.target.files[0])] = event.target.files[0]

    this.setState({
      photo: photos
    })
  }

  handleDeleteFile(i) {
    for (var key in this.state.photo) {
      if (key === i) {
        delete this.state.photo[key];
      }
    }

    this.setState({
      photo: this.state.photo
    })
  }



  render () {
    return (
      <form className="form">
          <div className="form-box">
          <label> Name of location</label>
          <input className="form-name"></input>
          </div>

          <div className="form-box">
          <label>Address</label>
          <input className="form-location"></input>
          </div>

          <div className="form-box">
            <label>Add Pictures</label>
            <div className="button-test" id="thumbnail">
              {Object.keys(this.state.photo).length > 0 &&
              Object.keys(this.state.photo).map((item, index) => {

                var styleSection = {
                  backgroundImage: `url(${item})`,
                  backgroundSize: "cover",
                  marginRight: "1em",
                  width: "6.5em",
                  height: "6.5em",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderRadius: "9px"
                }

                return (
                  <div className="form-imgblock" key={index}>
                    <div style={styleSection}></div>
                    <button type="button" className="img-button" onClick={() => this.handleDeleteFile(item)}></button>
                  </div>
                )
              })
              }
              <label htmlFor="upload-photo" className="add-button">+</label>
              <input type="file" name="photo" id="upload-photo" onChange={this.handlePhoto}></input>
            </div>
          </div>


          <div>
            <label>Is this a business?</label>
            <input type="radio" id="yes" name="answer" value="true" onChange={this.handleBusiness}></input>
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="answer" value="false" onChange={this.handleBusiness}></input>
            <label htmlFor="no">No</label>
          </div>

          {this.state.business ?
          <div className="isbusiness">
            <div className="form-box">
              <label>Website link:</label>
              <input type="url" className="form-website"></input>
            </div>

            <div className="form-box">
              <label>Phone number:</label>
              <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-number" required></input>
            </div>

            <div className="form-box">
              <label>Email:</label>
              <input type="email" className="form-email"></input>
            </div>


            <div className="form-box">
              <label>Hours:</label>
              <div className="hours">
                <label>Monday: <input className="form-hours"></input></label>
                <label>Tuesday: <input className="form-hours"></input></label>
                <label> Wednesday:<input className="form-hours"></input></label>
                <label>Thursday: <input className="form-hours"></input></label>
                <label>Friday: <input className="form-hours"></input></label>
                <label>Saturday: <input className="form-hours"></input></label>
                <label>Sunday: <input className="form-hours"></input></label>
              </div>

            </div>
          </div>
          : null}

          <div className="form-box">
          <label>Description</label>
          <textarea className="form-description"></textarea>
          </div>

          <div className="form-box">
          <label>Covid related information:</label>
          <textarea className="form-covid"></textarea>
          </div>


          <button className="submit-btn" type="submit">Submit</button>
      </form>
    )
  }
}

export default AddSpot;
