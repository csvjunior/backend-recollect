import { validate, Joi } from "express-validation";

export = validate({
  params: Joi.object({
    id: Joi.string().pattern(/(^[0-9a-f]{24}$)/).required(),
  }),
});
