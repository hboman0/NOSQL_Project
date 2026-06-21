const { AppError } = require("./errorHandler");

module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new AppError(400, message));
  }

  req.body = value;
  next();
};
