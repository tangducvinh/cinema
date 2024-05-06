const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dbcjjfe25',
  api_key: "388562339693623",
  api_secret: "n9s4s8eL68VCV0UYPauChFe4r0Q"
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'cinema'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;