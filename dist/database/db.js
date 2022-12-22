"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.connectDatabase = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
function connectDatabase() {
    mongoose_1["default"].connect("mongodb+srv://db-recollect:TQh5LOyDAtO2KD16@cluster0.ukyzpka.mongodb.net/?retryWrites=true&w=majority")
        .then(function () { return console.log("Mongodb Atlas conectado com sucesso!"); })["catch"](function (error) { return console.log(error); });
}
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=db.js.map