import { validate, Joi } from "express-validation";

export = validate({
  params: Joi.object({
    id: Joi.string().required(),
  }),
});
