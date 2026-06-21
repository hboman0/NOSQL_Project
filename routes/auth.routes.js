const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/auth.validator");

router.post("/register", validate(registerSchema), controller.register);
router.post("/login", validate(loginSchema), controller.login);

// Protected: requires "Authorization: Bearer <token>" header.
// Used by the navbar "Profile" modal.
router.get("/profile", auth, controller.getProfile);

router.get("/test", (req, res) => {
  res.send("AUTH WORKS");
});

module.exports = router;
