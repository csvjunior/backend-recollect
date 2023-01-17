import { validate, Joi } from "express-validation";

export = validate({
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  }),
});
