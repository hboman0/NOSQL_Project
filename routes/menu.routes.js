const express = require("express");
const router = express.Router();
const controller = require("../controllers/menu.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const validate = require("../middleware/validate");
const { menuItemSchema } = require("../validators/menu.validator");

router.get("/", controller.getAllMenuItems);
router.get("/:id", controller.getMenuItemById);

router.post("/", auth, role("admin"), validate(menuItemSchema), controller.createMenuItem);
router.put("/:id", auth, role("admin"), controller.updateMenuItem);
router.delete("/:id", auth, role("admin"), controller.deleteMenuItem);

router.put("/:id/views", controller.incrementViews);

module.exports = router;
