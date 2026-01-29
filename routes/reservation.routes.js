const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservation.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

// PUBLIC
router.get("/", controller.getAllReservations);
router.get("/:id", controller.getReservationById);

// ADMIN ONLY
router.post("/", auth, role("admin"), controller.createReservation);
router.put("/:id", auth, role("admin"), controller.updateReservation);
router.delete("/:id", auth, role("admin"), controller.deleteReservation);

module.exports = router;
