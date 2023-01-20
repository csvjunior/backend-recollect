import express from "express";
import CompanyController from "../controllers/company.controller";
import companyCreateValidation from "../middlewares/validations/company/create";
import companyDeleteValidation from "../middlewares/validations/company/delete";
import companyUpdateValidation from "../middlewares/validations/company/update";
import companyShowValidation from "../middlewares/validations/company/show";
import auth from "../middlewares/auth";

const routes = express.Router();

const companyController = new CompanyController();

routes.get("/", companyController.index);
routes.get("/:id", companyShowValidation, companyController.show);
routes.post("/", companyCreateValidation, companyController.create);
routes.put("/:id", auth, companyUpdateValidation, companyController.update);
routes.delete("/:id", auth,companyDeleteValidation, companyController.delete);

export default routes;
