
const express = require('express');
const {registerUser , loginUser} = require('../controllers/authControllers');
const router = express.Router();

//all routes
router.post('/register' , registerUser);
router.post('/login' , loginUser);

module.exports = router;