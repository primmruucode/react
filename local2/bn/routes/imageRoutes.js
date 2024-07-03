const express = require('express');
const multer = require('multer');
const sharp = require('sharp'); // Import sharp for image resizing
const Image = require('../models/Image');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const { originalname, buffer, mimetype } = req.file;

  try {
    // Resize image to create thumbnail (optional, adjust dimensions as needed)
    const thumbnailBuffer = await sharp(buffer)
      .resize({ width: 200 }) // Resize to width of 200 pixels for thumbnail
      .toBuffer();

    const newImage = new Image({
      imageName: originalname,
      imageData: buffer,
      thumbnailData: thumbnailBuffer, // Store thumbnail buffer if needed
      contentType: mimetype,
    });

    const savedImage = await newImage.save();
    res.status(200).json(savedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200)
       .set('Cache-Control', 'public, max-age=3600') // Cache images for 1 hour
       .json(images);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.set({
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year (adjust as needed)
      'Content-Type': image.contentType,
    }).send(image.imageData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const deletedImage = await Image.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedImage);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

module.exports = router;