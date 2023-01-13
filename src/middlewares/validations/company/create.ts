import { validate, Joi } from "express-validation";

export = validate({
  body: Joi.object({
    companyName: Joi.string().required(),
    site: Joi.string(),
    responsibleName: Joi.string().required(),
    responsiblePhone: Joi.number(),
    companyEmail: Joi.string().email().required(),
    address: {
      street: Joi.string().required(),
      zip: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
    phone: Joi.number().required(),
    typesOfMaterialYouRecycle: Joi.string(),
    removeTheMaterialAtAnotherAddress: Joi.string(),
    loginEmail: Joi.string().email().required(),
    password: Joi.string().min(6).required,
  }),
});
