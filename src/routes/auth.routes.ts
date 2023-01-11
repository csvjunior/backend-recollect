import express from 'express';
import AuthController from '../controllers/auth.controller';

const routes = express.Router();

const authcontroller = new AuthController();

routes.post('/', authcontroller.login);
routes.post("/forgot_password", authcontroller.forgot_password);
routes.post("/reset_password", authcontroller.reset_password);

export default routes;
