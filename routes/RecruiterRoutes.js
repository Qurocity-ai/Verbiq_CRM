const express = require('express');
const router = express.Router();
const {
  createRecruiter,
  getSingleRecruiter,
  updateRecruiter,
  deleteRecruiter,
  getAllRecruiters
} = require('../controllers/createRecruiterController');
const authenticate = require('../middlewares/authenticate');


router.post('/createrecruiter', authenticate('super_admin'), createRecruiter);
router.get('/getrecruiter/:id', authenticate('super_admin'), getSingleRecruiter);
router.put('/updaterecruiter/:id', authenticate('super_admin'), updateRecruiter);
router.delete('/deleterecruiter/:id', authenticate('super_admin'), deleteRecruiter);
router.get('/getallrecruiters', authenticate('super_admin'), getAllRecruiters);

module.exports = router;