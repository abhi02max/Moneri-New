const GalleryImage = require('../models/GalleryImage');
const fs = require('fs');
const path = require('path');

// @desc    Upload an image to the gallery
// @route   POST /api/gallery/upload
// @access  Private (Admin only)
exports.uploadImage = async (req, res) => {
  const { tagline } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file' });
  }
  const imageUrl = `/${req.file.path.replace(/\\/g, "/")}`;
  
  try {
    const newImage = new GalleryImage({ tagline, imageUrl });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: 'Server error while uploading image' });
  }
};

// @desc    Get all gallery images (or a limited number)
// @route   GET /api/gallery
// @access  Public
exports.getImages = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    const images = await GalleryImage.find().sort({ createdAt: -1 }).limit(limit);
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching images' });
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private (Admin only)
exports.deleteImage = async (req, res) => {
    try {
        const image = await GalleryImage.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Construct the file path and delete the file from the server
        // image.imageUrl is stored like '/uploads/filename.ext'. Ensure we resolve safely within server root
        const normalizedRelativePath = image.imageUrl.replace(/^\//, '');
        const filePath = path.join(__dirname, '..', normalizedRelativePath);
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error('File deletion error:', err.message);
                // Even if file deletion fails, proceed to delete from DB
            }
            await image.deleteOne();
            res.json({ message: 'Image removed successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting image' });
    }
};