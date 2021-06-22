const express = require('express')
const app = express()
const port = 3000
const multer = require('multer')
const cors = require('cors')
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require ('multer-storage-cloudinary');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

const { CLOUD_NAME, CLOUD_API, CLOUD_SECRET, CLOUDINARY_URL} = require('../cloudinary.js');
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API,
  api_secret: CLOUD_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'spots'
  },
  allowedFormats: ["jpg", "png", "jpeg"],
  transformation: [
    {if: "w_gt_1900", width: 1900, crop: "scale"},
    {if: "h_gt_1900", height: 1900, crop: "scale"},
    {quality: "auto"},
    {format: 'jpg'}

  ]
});

const parser = multer ({storage});



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})