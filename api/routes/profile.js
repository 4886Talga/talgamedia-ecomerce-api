const express = require("express");
const {
  setProfile,
  getProfile,
  modifyProfile,
} = require("../../controllers/profile.controller");
const { authorizeAccess } = require("../../middleware/handleCurrentUser");
const {
  validateProfile,
  validateProfileUpdation,
} = require("../../middleware/validate");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authorizeAccess, validateProfile, setProfile)
  .get(authorizeAccess, getProfile)
  .put(authorizeAccess, validateProfileUpdation, modifyProfile);

module.exports = router;
