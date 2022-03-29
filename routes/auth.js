const express = require('express');
const router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');


router.use(async (req, res, next) => {
    next();
});


module.exports = router;