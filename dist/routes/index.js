"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var user_routes_1 = __importDefault(require("./user.routes"));
var company_routes_1 = __importDefault(require("./company.routes"));
var comment_routes_1 = __importDefault(require("./comment.routes"));
var routes = express_1["default"].Router();
routes.use('/users', user_routes_1["default"]);
routes.use('/companies', company_routes_1["default"]);
routes.use('/comments', comment_routes_1["default"]);
exports["default"] = routes;
//# sourceMappingURL=index.js.map