const express = require('express');
const router = express.Router();
const auth = require("../controllers/auth.controller");

router.post('/user/register', auth.handleRegister);
router.post('/user/login', auth.handleLogin);
router.get('/user/logout', auth.handleLogout);

router.post('/partner/register', auth.handlePartnerRegister);
router.post('/partner/login', auth.handlePartnerLogin);
router.get('/partner/logout', auth.handleLogout);

module.exports = router;