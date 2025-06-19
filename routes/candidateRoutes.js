const express = require("express");
const router = express.Router();
const { createCandidate } = require("../controllers/candidateController.js");
const authenticate = require("../middlewares/authenticate");

router.post("/createCandidate", authenticate("super_admin"), createCandidate);

module.exports = router; //
