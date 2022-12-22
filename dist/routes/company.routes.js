"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var company_controller_1 = __importDefault(require("../controllers/company.controller"));
var routes = express_1["default"].Router();
var companyController = new company_controller_1["default"]();
routes.get('/', companyController.index);
routes.get('/:id', companyController.show);
routes.post('/', companyController.create);
routes.put('/:id', companyController.update);
routes["delete"]('/:id', companyController["delete"]);
exports["default"] = routes;
//# sourceMappingURL=company.routes.js.map