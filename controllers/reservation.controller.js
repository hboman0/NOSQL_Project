const Reservation = require("../models/reservation.model");

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  const reservations = await Reservation.find();
  res.json(reservations);
};

exports.getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation)
    return res.status(404).json({ message: "Reservation not found" });
  res.json(reservation);
};

exports.updateReservation = async (req, res) => {
  console.log("PUT body:", req.body, "ID:", req.params.id);
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReservation) return res.status(404).json({ message: "Reservation not found" });
    res.json(updatedReservation);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Error updating reservation" });
  }
};




exports.deleteReservation = async (req, res) => {
  const deleted = await Reservation.findByIdAndDelete(req.params.id);
  if (!deleted)
    return res.status(404).json({ message: "Reservation not found" });
  res.json({ message: "Reservation deleted" });
};
