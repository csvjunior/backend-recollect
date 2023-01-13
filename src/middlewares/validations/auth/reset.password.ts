import { validate, Joi } from "express-validation";

export = validate({
  body: Joi.object({
    loginEmail: Joi.string().email().required(),
    token: Joi.string().token().required(),
    password: Joi.string().min(6).required(),
  }),
});
