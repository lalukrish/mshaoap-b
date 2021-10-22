const express = require('express')

const authController = require('../controllers/admin');

const router = express.Router()

router.post('/signup',authController.postSignup);

module.exports = router;