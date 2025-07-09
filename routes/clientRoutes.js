const express = require("express");
const router = express.Router();
const {
  createClient,
  getClient,
  getClientById,
  deleteClientById,
  updateClientById,
  createJobs,
  getJobs,
  getJobById,
  deleteJobById,
} = require("../controllers/clientController");
const authenticate = require("../middlewares/authenticate");

router.post("/createClient", authenticate("super_admin"), createClient);
router.get("/getClient", getClient);
router.get("/getClient/:id", authenticate("super_admin"), getClientById);
router.post("/createJob", authenticate("super_admin"), createJobs);
router.get("/getJob", getJobs);
router.get("/getJob/:id", authenticate("super_admin"), getJobById);
router.delete(
  "/deletedClient/:id",
  authenticate("super_admin"),
  deleteClientById
);
router.delete("/deletedJob/:id", authenticate("super_admin"), deleteJobById);
router.put("/updateClient/:id", authenticate("super_admin"), updateClientById);

module.exports = router; //
