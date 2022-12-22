"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
//user criado para testar a conexão com banco de dados
var UserSchema = new mongoose_1["default"].Schema({
    nome: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    }
});
exports.User = mongoose_1["default"].model("User", UserSchema);
//# sourceMappingURL=User.js.map