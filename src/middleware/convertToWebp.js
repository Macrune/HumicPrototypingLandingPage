const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const fileHelper = require('../config/fileHelper.js');
require('dotenv').config();

const uploadDir = path.join(__dirname, '..', process.env.IMG_DIR || 'img');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const convertToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Support both memory and disk storage
    const input = req.file.buffer || req.file.path;

    await sharp(input)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const oldFile = path.basename(req.file.path);
    if (oldFile) {
      await fileHelper.deleteFile(oldFile);
    }  

    req.file.filename = filename;
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    if (req.file && req.file.path) {
      await fileHelper.deleteFile(path.basename(req.file.path));
    }
    next(error);
  }
};

module.exports = convertToWebp;