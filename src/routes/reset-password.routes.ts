import express from "express";
import AuthController from "../controllers/auth.controller";
import resetPasswordValidation from "../middlewares/validations/auth/reset.password";

const routes = express.Router();

const authController = new AuthController();

routes.post("/", resetPasswordValidation, authController.reset_password);

export default routes;
