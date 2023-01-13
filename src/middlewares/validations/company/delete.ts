import { validate, Joi } from "express-validation";

export = validate({
  params: Joi.object({
    id: Joi.string().alphanum().length(24).required(),
  }),
});
