const express = require("express");
const router = express.Router();
const { createClient, getClient } = require("../controllers/clientController");
const authenticate = require("../middlewares/authenticate");

router.post("/createClient", authenticate("super_admin"), createClient);
router.post("/getClient", authenticate("super_admin"), getClient);

module.exports = router; //
