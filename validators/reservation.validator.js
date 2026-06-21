const Joi = require("joi");


const objectId = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({ "string.pattern.base": '"menuItem" must be a valid id' });

const reservationSchema = Joi.object({
  customerName: Joi.string().min(2).max(80).required().messages({
    "string.empty": "Customer name is required",
    "any.required": "Customer name is required"
  }),

  guests: Joi.number().integer().min(1).max(20).required().messages({
    "number.base": "Guests must be a number",
    "number.min": "There must be at least 1 guest",
    "number.max": "Reservations are limited to 20 guests",
    "any.required": "Number of guests is required"
  }),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Date must be in YYYY-MM-DD format",
      "any.required": "Date is required"
    }),

  time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Time must be in HH:MM (24h) format",
      "any.required": "Time is required"
    }),

  specialRequests: Joi.string().allow("", null).max(300),

  orderedItems: Joi.array()
    .items(
      Joi.object({
        menuItem: objectId.required(),
        quantity: Joi.number().integer().min(1).default(1)
      })
    )
    .default([])
});

module.exports = { reservationSchema };
