const express = require("express");
const userController = require("../../controllers/user.controller");
const {
  validateUserSignUp,
  validateUser,
  validateUserEmail,
} = require("../../middleware/validate");
const {
  authorizeAccess,
  authorizeAdmin,
} = require("../../middleware/handleCurrentUser");

const router = express.Router();

router.post("/auser", userController.regauser);
router.post("/sign-up", validateUserSignUp, userController.signup);
router.post("/board-user", userController.boardUser);
router.get("/verify/:token", userController.verifyEmail);
router.post("/login", validateUser, userController.login);
router.get("/me", authorizeAccess, userController.getMe);
router.get("/refresh", userController.refresh);
router.post("/logout", userController.logout);
router.post(
  "/forgotpassword",
  validateUserEmail,
  userController.forgotPassword
);
router.put("/resetpassword/:resettoken", userController.resetPassword);
router.put(
  "/updatepassword",
  authorizeAccess,
  userController.updateUserPassword
);
router.get("/", authorizeAccess, authorizeAdmin, userController.getAllUsers);
router.get(
  "/:userId",
  authorizeAccess,
  authorizeAdmin,
  userController.getSingleUser
);
router.post(
  "/",
  authorizeAccess,
  authorizeAdmin,
  userController.createUserByAdmin
);
router.patch(
  "/:userId",
  authorizeAccess,
  authorizeAdmin,
  userController.updateUserByAdmin
);
router.delete(
  "/:userId",
  authorizeAccess,
  authorizeAdmin,
  userController.deleteUserByAdmin
);

module.exports = router;
