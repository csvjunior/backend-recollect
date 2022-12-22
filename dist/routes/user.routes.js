"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var routes = express_1["default"].Router();
var userController = new user_controller_1["default"]();
routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.post('/', userController.create);
routes.put('/:id', userController.update);
routes["delete"]('/:id', userController["delete"]);
exports["default"] = routes;
//# sourceMappingURL=user.routes.js.map