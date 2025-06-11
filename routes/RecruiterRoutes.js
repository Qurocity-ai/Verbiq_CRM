const express = require('express');
const router = express.Router();
const createRecruiter = require('../controllers/createRecruiterController');
const authenticate = require('../middlewares/authenticate');


router.post('/createrecruiter', authenticate('super_admin'), createRecruiter);

module.exports = router;