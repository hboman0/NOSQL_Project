const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservation.controller");
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get("/stats/summary", auth, role("admin"), controller.getReservationStats);
router.put("/bulk/large", auth, role("admin"), controller.markLargeReservations);

router.get("/", controller.getAllReservations);

router.post("/", controller.createReservation);

router.post("/:id/items", auth, role("admin"), controller.addItemToReservation);
router.delete("/:id/items", auth, role("admin"), controller.removeItemFromReservation);

router.get("/:id", controller.getReservationById);
router.put("/:id", auth, role("admin"), controller.updateReservation);
router.delete("/:id", auth, role("admin"), controller.deleteReservation);

module.exports = router;