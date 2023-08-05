const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); 

const storage = new CloudinaryStorage({
  cloudinary,
  folder: 'project-thumbnails', 
  allowedFormats: ['jpg', 'jpeg', 'png'],
  filename: (req, file, callback) => {
    const uniqueName = Date.now();
    callback(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
