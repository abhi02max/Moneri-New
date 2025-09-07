const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');

// For first time setup to create an admin user
router.post('/register', registerAdmin); 

router.post('/login', loginAdmin);

module.exports = router;