const db = require('../setup.js');
const Location = require('../models/locationForm.js');

  exports.addSpot = (req, res) => {
  var pictureArray = [];
  req.files.forEach(file => pictureArray.push(file.path));

  return Location.create({
    Name: `${req.query.Name}`,
    location: {
      "type" : "Point",
      "coordinates" : [
        Number(req.query.Address[0]),
        Number(req.query.Address[1])
      ]
    },
    Email: `${req.query.websiteEmail}`,
    Picture: pictureArray,
    isBusiness: `${req.query.isBusiness}`,
    Link: `${req.query.Link}`,
    phoneNumber: `${req.query.phoneNumber}`,
    Description: `${req.query.locationDescription}`,
    covidInfo: `${req.query.locationCovid}`,
    Favorite: 0,
  })
  .then ((success) => {
    res.sendStatus(200);
    res.end();
  })
  .catch((err) => {
    res.end(err);
  })
}

exports.sendSpots = (req, res) => {

  var coordinates = JSON.parse(req.query.coordinates);
  return Location.find({
    location: {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: "Point",
          coordinates: [coordinates.lng, coordinates.lat]

        }
      }
    }
  })
  .then ((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.sendAll= (req, res) => {
  return Location.find({})
  .then ((data) => {
    res.send(data)
  })
  .catch((err) => {
    console.log(err);
  })
}
