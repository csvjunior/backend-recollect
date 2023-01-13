import express from "express";
import CompanyController from "../controllers/company.controller";
import companyCreateValidation from "../middlewares/validations/company/create";

const routes = express.Router();

const companyController = new CompanyController();

routes.get("/", companyController.index);
routes.get("/:id", companyController.show);
routes.post("/", companyCreateValidation, companyController.create);
routes.put("/:id", companyController.update);
routes.delete("/:id", companyController.delete);

export default routes;
