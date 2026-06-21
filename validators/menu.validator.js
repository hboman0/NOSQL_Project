const Joi = require("joi");

const menuItemSchema = Joi.object({
  name: Joi.string().min(2).max(80).required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required"
  }),

  description: Joi.string().min(5).max(500).required().messages({
    "string.min": "Description must be at least 5 characters",
    "string.empty": "Description is required",
    "any.required": "Description is required"
  }),

  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required"
  }),

  category: Joi.string()
    .valid("starters", "main", "desserts")
    .required()
    .messages({
      "any.only": "Category must be one of: starters, main, desserts",
      "any.required": "Category is required"
    }),

  image: Joi.string().allow("", null)

  // "views" is not accepted from clients - it's server-managed
  // (defaults to 0, only changed via PUT /menu/:id/views).
});

module.exports = { menuItemSchema };
