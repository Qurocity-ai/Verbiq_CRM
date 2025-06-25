const express = require("express");
const router = express.Router();
const {
  loginController,
  recruiterLoginController,
} = require("../controllers/loginController");

router.post("/login", loginController);
router.post("/recruiterlogin", recruiterLoginController);

module.exports = router;
