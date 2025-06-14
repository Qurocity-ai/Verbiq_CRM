
const express=require('express');
const router=express.Router();
const {createClient}=require('../controllers/clientController');
const authenticate=require('../middlewares/authenticate')


router.get('/createClient',authenticate("super_admin"),createClient);

module.exports=router;