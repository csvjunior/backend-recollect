import express from 'express';
import AuthController from '../controllers/auth.controller';

const routes = express.Router();

const authcontroller = new AuthController();

routes.post('/', authcontroller.login);

export default routes;
