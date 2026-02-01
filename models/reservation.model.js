const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  guests: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  specialRequests: { type: String, default: "" },
  orderedItems: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

reservationSchema.index({ date: 1, time: 1 });


module.exports = mongoose.model("Reservation", reservationSchema);
