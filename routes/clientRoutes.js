const express = require("express");
const router = express.Router();
const {
  createClient,
  getClient,
  getClientById,
  deleteClientById,
  updateClientById,
} = require("../controllers/clientController");
const authenticate = require("../middlewares/authenticate");

router.post("/createClient", authenticate("super_admin"), createClient);
router.get("/getClient", getClient);
router.get("/getClient/:id", authenticate("super_admin"), getClientById);
router.delete(
  "/deletedClient/:id",
  authenticate("super_admin"),
  deleteClientById
);
router.put("/updateClient/:id", authenticate("super_admin"), updateClientById);

module.exports = router; //
