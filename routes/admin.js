const express = require('express')

const authController = require('../controllers/admin');

const router = express.Router()

router.post('/signup',authController.postSignup);

router.post('/signin',authController.postSignin);

module.exports = router;