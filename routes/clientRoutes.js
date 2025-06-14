
const express=require('express');
const router=express.Router();
const {createClient}=require('../controllers/clientController');
const authenticate=require('../middlewares/authenticate')


router.post('/createClient',authenticate("super_admin"),createClient);

module.exports=router;