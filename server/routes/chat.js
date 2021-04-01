const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/chat');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

module.exports = router;
