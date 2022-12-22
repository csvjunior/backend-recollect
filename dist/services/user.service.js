"use strict";
exports.__esModule = true;
var User_1 = require("../models/User");
// service criado para testar o db
var create = function (body) { return User_1.User.create(body); };
module.exports = {
    create: create
};
//# sourceMappingURL=user.service.js.map