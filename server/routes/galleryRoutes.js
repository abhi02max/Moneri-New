const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getImages, deleteImage } = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage: storage });

// Routes
router.route('/')
  .get(getImages);

router.route('/upload')
  .post(protect, upload.single('image'), uploadImage);

// New delete route
router.route('/:id')
  .delete(protect, deleteImage);

module.exports = router;