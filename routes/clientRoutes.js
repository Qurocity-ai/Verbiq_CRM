const express = require("express");
const router = express.Router();
const {
  createClient,
  getClient,
  getClientById,
  deleteClientById,
} = require("../controllers/clientController");
const authenticate = require("../middlewares/authenticate");

router.post("/createClient", authenticate("super_admin"), createClient);
router.get("/getClient", authenticate("super_admin"), getClient);
router.get("/getClient/:id", authenticate("super_admin"), getClientById);
router.delete(
  "/deletedClient/:id",
  authenticate("super_admin"),
  deleteClientById
);

module.exports = router; //
