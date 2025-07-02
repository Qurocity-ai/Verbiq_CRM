const express = require("express");
const router = express.Router();
const {
  filterByCurrentCTC,
  filterByExpectedCTC,
  filterByLocation,
  filterByLanguage,
  filterByExperience,
  filterByNoticePeriod,
  filterByCandidateStage,
  filterByDOI,
} = require("../controllers/filterController.js");
const authenticate = require("../middlewares/authenticate");

router.post("/filterByCurrentCTC", filterByCurrentCTC);
router.post("/filterByExpectedCTC", filterByExpectedCTC);
router.post("/filterByLocation", filterByLocation);
router.post("/filterByLanguage", filterByLanguage);
router.post("/filterByExperience", filterByExperience);
router.post("/filterByNoticePeriod", filterByNoticePeriod);
router.post("/filterByCandidateStage", filterByCandidateStage);
router.post("/filterByDOI", filterByDOI);

module.exports = router; //
