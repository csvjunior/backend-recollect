import { validate, Joi } from "express-validation";

export = validate({
  body: Joi.object({
    loginEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});
