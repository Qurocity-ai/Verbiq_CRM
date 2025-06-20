const express = require("express");
const router = express.Router();
const {
  createCandidate,
  getCandidate,
  getCandidateById,
  deleteCandidateById,
  updateCandidateById,
} = require("../controllers/candidateController.js");
const authenticate = require("../middlewares/authenticate");

router.post("/createCandidate", authenticate("super_admin"), createCandidate);
router.get("/getCandidate", authenticate("super_admin"), getCandidate);
router.get("/getCandidate/:id", authenticate("super_admin"), getCandidateById);
router.delete(
  "/deleteCandidate/:id",
  authenticate("super_admin"),
  deleteCandidateById
);
router.put(
  "/updateCandidate/:id",
  authenticate("super_admin"),
  updateCandidateById
);

module.exports = router; //
