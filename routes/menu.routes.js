const express = require("express");
const router = express.Router();
const controller = require("../controllers/menu.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// PUBLIC
router.get("/", controller.getAllMenuItems);
router.get("/:id", controller.getMenuItemById);

// ADMIN ONLY
router.post("/", auth, role("admin"), controller.createMenuItem);
router.put("/:id", auth, role("admin"), controller.updateMenuItem);
router.delete("/:id", auth, role("admin"), controller.deleteMenuItem);

module.exports = router;
