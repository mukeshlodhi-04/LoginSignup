const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/auth.validation');
const { signup, login } = require('../controller/auth.controller');
const router = express.Router();

router.post('/login',loginValidation,login);

router.post('/signup',signupValidation,signup);




module.exports = router;