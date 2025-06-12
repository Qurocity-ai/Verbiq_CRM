const express = require("express");
const router = express.Router();
const createRecruiter = require("../controllers/createRecruiterController");
const { getRecuiters } = require("../controllers/recruiterController");
const authenticate = require("../middlewares/authenticate");

router.post("/createrecruiter", authenticate("super_admin"), createRecruiter);

//Protected route to get all recruiters
router.get("/recruiters", authenticate("super_admin"), getRecuiters);

module.exports = router;
