const mongoose = require("mongoose");
const Reservation = require("../models/reservation.model");

exports.createReservation = async (req, res) => {
  try {
    let { orderedItems, ...rest } = req.body;

    if (Array.isArray(orderedItems) && orderedItems.length > 0) {
      orderedItems = orderedItems.map(item => ({
        menuItem: item.menuItem,
        quantity: item.quantity
      }));
    } else {
      orderedItems = [];
    }

    const reservation = await Reservation.create({
      ...rest,
      orderedItems: orderedItems
    });

    const populated = await Reservation.findById(reservation._id)
      .populate('orderedItems.menuItem');

    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating reservation:", error.message);
    res.status(400).json({ 
      message: error.message
    });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('orderedItems.menuItem');
    
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('orderedItems.menuItem');
    
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    
    res.json(reservation);
  } catch (error) {
    console.error("Error fetching reservation:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('orderedItems.menuItem');
    
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    
    res.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation:", error.message);
    res.status(500).json({ message: "Error updating reservation" });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const deleted = await Reservation.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error("Error deleting reservation:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.addItemToReservation = async (req, res) => {
  try {
    const { menuItem, quantity } = req.body;

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          orderedItems: { menuItem, quantity }
        }
      },
      { new: true }
    ).populate('orderedItems.menuItem');

    if (!updated) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Error adding item:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.removeItemFromReservation = async (req, res) => {
  try {
    const { menuItemId } = req.body;

    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          orderedItems: { menuItem: menuItemId }
        }
      },
      { new: true }
    ).populate('orderedItems.menuItem');

    res.json(updated);
  } catch (error) {
    console.error("Error removing item:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.markLargeReservations = async (req, res) => {
  try {
    const result = await Reservation.updateMany(
      { guests: { $gte: 6 } },
      { $set: { specialRequests: "Large group reservation" } }
    );

    res.json(result);
  } catch (error) {
    console.error("Error bulk updating:", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationStats = async (req, res) => {
  try {
    const stats = await Reservation.aggregate([
      {
        $group: {
          _id: "$date",
          totalReservations: { $sum: 1 },
          totalGuests: { $sum: "$guests" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({ message: error.message });
  }
};