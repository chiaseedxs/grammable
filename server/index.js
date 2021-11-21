const express = require('express');
// const bodyParser = require('body-parser');
const spots = require('../database/controllers/addSpot.js')
const path = require('path');
const app = express();
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const port = 8080



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));



const { CLOUD_NAME, CLOUD_API, CLOUD_SECRET, CLOUDINARY_URL} = require('../cloudinary.js');
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API,
  api_secret: CLOUD_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spots',
    onError: (err) => {
      // console.log(err)
    }
  },
  allowedFormats: ["jpg", "png", "jpeg", "gif", "JPEG"],
  transformation: [
     { if: "w_gt_1900", width: 1900, crop: "scale" },
     { if: "h_gt_1900", height: 1900, crop: "scale" },
     { quality: "auto" },
     { format: 'jpg' }
  ]
});
const cloudParser = multer({ storage });



app.post('/form', cloudParser.array('photo'), spots.addSpot)

app.get('/spots', spots.sendSpots)

app.get('/getall', spots.sendAll)

app.get('*', (req, res) => res.sendFile(path.resolve('client', 'dist', 'index.html')));

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})