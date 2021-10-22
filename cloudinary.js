require('dotenv').config();
exports.CLOUD_SECRET = process.env.CLOUD_SECRET || 'cloud-secret';
exports.CLOUD_NAME = process.env.CLOUD_NAME || 'cloud-name';
exports.CLOUD_API = process.env.CLOUD_API || 'cloud-api';
exports.CLOUDINARY_URL = process.env.CLOUDINARY_URL || 'cloud-url';
