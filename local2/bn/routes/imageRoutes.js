const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  const newImage = new Image({
    imageName: req.file.originalname,
    imageData: req.file.buffer,
    contentType: req.file.mimetype
  });

  try {
    const savedImage = await newImage.save();
    res.status(200).json(savedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (err) {
    res.status(400).json({ message: err.message });
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