import { validate, Joi } from "express-validation";

export = validate({
  body: Joi.object({
    password: Joi.string().min(6).required(),
  }),
});
