import express from "express";
import AuthController from "../controllers/auth.controller";
import authLoginValidation from "../middlewares/validations/auth/login";
import authForgotPasswordValidation from "../middlewares/validations/auth/forgot.password";

const routes = express.Router();

const authcontroller = new AuthController();

routes.post("/", authLoginValidation, authcontroller.login);
routes.post(
  "/forgot_password",
  authForgotPasswordValidation,
  authcontroller.forgot_password
);

export default routes;
