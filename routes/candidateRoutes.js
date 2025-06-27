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

router.post("/createCandidate", createCandidate);
router.get(
  "/getCandidate",

  getCandidate
);
router.get("/getCandidate/:id", getCandidateById);
router.delete(
  "/deleteCandidate/:id",

  deleteCandidateById
);
router.put(
  "/updateCandidate/:id",

  updateCandidateById
);

module.exports = router; //
