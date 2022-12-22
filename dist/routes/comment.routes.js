"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
var routes = express_1["default"].Router();
var commentController = new comment_controller_1["default"]();
routes.get('/', commentController.index);
routes.get('/:id', commentController.show);
routes.post('/', commentController.create);
routes.put('/:id', commentController.update);
routes["delete"]('/:id', commentController["delete"]);
exports["default"] = routes;
//# sourceMappingURL=comment.routes.js.map