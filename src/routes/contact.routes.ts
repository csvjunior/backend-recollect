import express from "express";
import ContactController from '../controllers/contact.controller';

const routes = express.Router();

const contactController = new ContactController();

routes.post('/', contactController.create);

export default routes;
