import express from "express";
import AuthController from "../controllers/auth.controller";
import authLoginValidation from "../middlewares/validations/auth/login";
import authForgotPasswordValidation from "../middlewares/validations/auth/forgot.password";
import authChangePassword from "../middlewares/validations/auth/change.password";
import auth from "../middlewares/auth";

const routes = express.Router();

const authcontroller = new AuthController();

routes.post("/", authLoginValidation, authcontroller.login);
routes.post(
  "/forgot_password",
  authForgotPasswordValidation,
  authcontroller.forgot_password
);
//criar validação
routes.post(
  "/change_password",
  auth,
  authChangePassword,
  authcontroller.change_password
);

export default routes;
