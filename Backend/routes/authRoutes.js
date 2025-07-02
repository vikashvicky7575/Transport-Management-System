const express = require('express');
const { register, login , getUserByRole } = require('../controllers/authControllers');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/userlist/:role',getUserByRole)

module.exports = router;