import express from "express";
import ContactController from "../controllers/contact.controller";
import contactCreateValidation from "../middlewares/validations/contact/create";

const routes = express.Router();

const contactController = new ContactController();

routes.post("/", contactCreateValidation, contactController.create);

export default routes;
