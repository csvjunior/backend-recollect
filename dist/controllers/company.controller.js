"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var database_1 = __importDefault(require("../database"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, address, telephone, company;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, address = _a.address, telephone = _a.telephone;
                return [4 /*yield*/, database_1["default"].company.create({
                        data: {
                            name: name,
                            email: email,
                            address: address,
                            telephone: telephone
                        }
                    })];
            case 1:
                company = _b.sent();
                return [2 /*return*/, res.json({ company: company })];
        }
    });
}); });
var CompanyController = /** @class */ (function () {
    function CompanyController() {
    }
    CompanyController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var companies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].company.findMany()];
                    case 1:
                        companies = _a.sent();
                        res
                            .json({ message: "Empresas recuperadas com sucesso!", companies: companies })
                            .status(200);
                        return [2 /*return*/];
                }
            });
        });
    };
    CompanyController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, company;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1["default"].company.findFirst({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        company = _a.sent();
                        if (!company) {
                            return [2 /*return*/, res.status(404).json({ error: "Empresa não encontrada!." })];
                        }
                        return [2 /*return*/, res.json(company).status(200)];
                }
            });
        });
    };
    CompanyController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, address, telephone, company;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, address = _a.address, telephone = _a.telephone;
                        return [4 /*yield*/, database_1["default"].company.create({
                                data: {
                                    address: address,
                                    email: email,
                                    name: name,
                                    telephone: telephone
                                }
                            })];
                    case 1:
                        company = _b.sent();
                        return [2 /*return*/, res.json(company).status(201)];
                }
            });
        });
    };
    CompanyController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name, email, address, company, updatedCompany;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, name = _a.name, email = _a.email, address = _a.address;
                        return [4 /*yield*/, database_1["default"].company.findFirst({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        company = _b.sent();
                        if (!company) {
                            return [2 /*return*/, res.status(404).json({
                                    error: "Empresa não encontrada!"
                                })];
                        }
                        return [4 /*yield*/, database_1["default"].company.update({
                                data: {
                                    address: address,
                                    email: email,
                                    name: name
                                },
                                where: { id: id }
                            })];
                    case 2:
                        updatedCompany = _b.sent();
                        res.json(updatedCompany).status(200);
                        return [2 /*return*/];
                }
            });
        });
    };
    CompanyController.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, company;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, database_1["default"].company.findFirst({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        company = _a.sent();
                        if (!company) {
                            return [2 /*return*/, res.status(404).json({ error: 'Empresa não encontrada!.' })];
                        }
                        return [4 /*yield*/, database_1["default"].company["delete"]({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.send().status(204)];
                }
            });
        });
    };
    return CompanyController;
}());
exports["default"] = CompanyController;
//# sourceMappingURL=company.controller.js.map