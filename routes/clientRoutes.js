const express = require("express");
const router = express.Router();
const {
  createClient,
  getClient,
  getClientById,
} = require("../controllers/clientController");
const authenticate = require("../middlewares/authenticate");

router.post("/createClient", authenticate("super_admin"), createClient);
router.post("/getClient", authenticate("super_admin"), getClient);
router.post("/getClient/:id", authenticate("super_admin"), getClientById);

module.exports = router; //
