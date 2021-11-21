import React, { Component} from "react";
import Searchbar from './Searchbar.jsx'
import Header from './Header.jsx';
import Map from './googlemap.jsx';
import Submitted from './submitted.jsx'

const axios = require('axios');


class AddSpot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      business: false,
      photo: {},
      locationName: "",
      locationAddress: [],
      websiteLink: "",
      websitePhoneNumber: "",
      websiteEmail: "",
      locationDescription: "",
      locationCovid: "",
      submit: false,
      nameError: "",
      locationError: "",
      photoError: "",
      descriptionError:""
    }
    this.handleBusiness = this.handleBusiness.bind(this);
    this.handlePhoto = this.handlePhoto.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.validate = this.validate.bind(this);
    this.exit = this.exit.bind(this);
  }

  validate () {
    let submit = true;
    if (this.state.locationName === "") {
      submit = false;
      this.setState({
        nameError: "Please enter location name!"
      })

    }

    if (this.state.locationAddress.length === 0) {
      submit = false;
      this.setState({
        locationError: "Please pin location on map!"
      })
    }

    if (Object.keys(this.state.photo).length === 0) {
      submit = false;

      this.setState({
        photoError: "please submit at least one picture!"
      })
    }

    if (this.state.locationDescription === "") {
      submit = false;
      this.setState({
        descriptionError: "please share short description!"
      })
    }

    return submit
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
      photo: photos,
      photoError: ""
    })
  }

  handleAddress(address) {
    var coordinates = [address.lng, address.lat]
    this.setState({
      locationAddress: coordinates,
      locationError: ""
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

  handleChange () {
    this.setState({
      [event.target.name]: event.target.value
    })

    if (event.target.name === "locationName") {
      this.setState({
        nameError: ""
      })
    }

    if (event.target.name === "locationDescription") {
      this.setState({
        descriptionError: ""
      })
    }
  }

  exit () {
      this.setState({
        submit: false
      })
  }


  handleSubmit (e) {
    e.preventDefault();
    let validated = this.validate();

    if (validated) {

      let data = new FormData();
      var photos = Object.values(this.state.photo);

      var body = {
        isBusiness: this.state.business,
        picture: data,
        Name: this.state.locationName,
        Address: this.state.locationAddress,
        Link: this.state.websiteLink,
        phoneNumber: this.state.websitePhoneNumber,
        websiteEmail: this.state.websiteEmail,
        locationDescription: this.state.locationDescription,
        locationCovid: this.state.locationCovid,
      }

      photos.forEach(file => data.append('photo', file));
      // data.append('body', body)
      axios({
        url: '/form',
        data: data,
        params: body,
        method: 'post'
      })
      .then((res) => {
        this.setState({
          submit: true
        })
      })
      .catch(err => console.log('ERR',err))

    }
  }

  render () {
    return (
      <div className="background-form">
        <div className="white">.</div>
      {this.state.submit ?  <Submitted exit={this.exit}/> :
      <form
        className="form"
        method="post"
        onSubmit={this.handleSubmit}
        encType="multipart/form-data"
        autoComplete="off"
      >
        <h2 className="form-title">Share Instagrammable Spot!</h2>
        <div className="biggercol">
        <div className="colform-1">
          <div className="form-box">
          <label> Name of location</label>
          <input className="form-name" name="locationName" onChange={this.handleChange}></input>
          <div className="Error">{this.state.nameError}</div>
          </div>

          <div className="form-box">
          <label>Address</label>
          <div className="address-wording">Pin location on the map</div>
          <Map handleAddress={this.handleAddress} view={this.props.view}/>
          <div className="Error">{this.state.locationError}</div>
          <div className="additional-info">
          <label>Addition information</label>
          <input placeholder="e.g. apartment number, free parking"></input>
          </div>
          </div>
        </div>

          <div className="colform-2">
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
              <input type="file" name="photo" id="upload-photo" accept="image/png, image/jpeg" onChange={this.handlePhoto} ></input>
            </div>
            <div className="Error">{this.state.photoError}</div>
          </div>


          <div>
            <label className="bold">Is this a business?</label>
            <input type="radio" id="yes" name="answer" value="true" onChange={this.handleBusiness}></input>
            <label htmlFor="yes">Yes</label>
            <input type="radio" id="no" name="answer" value="false" onChange={this.handleBusiness}></input>
            <label htmlFor="no">No</label>
          </div>

          {this.state.business ?
          <div className="isbusiness">
            <div className="form-box">
              <label>Website link:</label>
              <input type="url" className="form-website" name="websiteLink" onChange={this.handleChange}></input>
            </div>

            <div className="form-box">
              <label>Phone number:</label>
              <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-number" name="websitePhoneNumber" onChange={this.handleChange}></input>
            </div>

            <div className="form-box">
              <label>Email:</label>
              <input type="email" className="form-email" name="websiteEmail" onChange={this.handleChange}></input>
            </div>

          </div>
          : null}

          <div className="form-box">
          <label>Description</label>
          <textarea className="form-description" name="locationDescription" onChange={this.handleChange}></textarea>
          <div className="Error">{this.state.descriptionError}</div>
          </div>

          <div className="form-box">
          <label>Covid related information</label>
          <textarea className="form-covid" name="locationCovid" onChange={this.handleChange}></textarea>
          </div>

          </div>
          </div>
          <button className="submit-btn" type="submit">Submit</button>
      </form>
  }
    <div className="white">.</div>


      </div>
    )
  }
}

export default AddSpot;
