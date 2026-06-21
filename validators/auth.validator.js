const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),

  // At least 8 characters, at least one letter and one number.
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one letter and one number",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    })

  // NOTE: "role" is intentionally NOT accepted here, even though the old
  // controller read it from req.body. Letting a client choose role:"admin"
  // on self-registration is a privilege-escalation bug. New accounts always
  // get role "user" (the User model's default). Promote to admin directly
  // in the database.
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required"
  })
});

module.exports = { registerSchema, loginSchema };
