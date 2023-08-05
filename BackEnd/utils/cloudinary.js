const cloudinary = require('cloudinary').v2;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name';
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || 'your_api_key';
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || 'your_api_secret';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

module.exports = cloudinary;

