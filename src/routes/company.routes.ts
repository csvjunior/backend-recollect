import express from "express";
import CompanyController from "../controllers/company.controller";
import companyCreateValidation from "../middlewares/validations/company/create";
import companyDeleteValidation from "../middlewares/validations/company/delete";
import companyUpdateValidation from "../middlewares/validations/company/update";

const routes = express.Router();

const companyController = new CompanyController();

routes.get("/", companyController.index);
routes.get("/:id", companyController.show);
routes.post("/", companyCreateValidation, companyController.create);
routes.put("/:id", companyUpdateValidation, companyController.update);
routes.delete("/:id", companyDeleteValidation, companyController.delete);

export default routes;
