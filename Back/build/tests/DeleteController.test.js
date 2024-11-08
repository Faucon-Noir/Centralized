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
Object.defineProperty(exports, "__esModule", { value: true });
var supertest = require("supertest");
var index_1 = require("../index");
var index_2 = require("../index");
var UserController_test_1 = require("./UserController.test");
var Specification_test_1 = require("./Specification.test");
var PlanningController_test_1 = require("./PlanningController.test");
var RexController_test_1 = require("./RexController.test");
var TicketController_test_1 = require("./TicketController.test");
var TeamController_test_1 = require("./TeamController.test");
describe("Delete tests", function () {
    test("Delete Rex", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(index_1.app)
                        .delete("/api/rex/" + RexController_test_1.rex_id)
                        .auth(UserController_test_1.tokentest, { type: "bearer" })
                        .expect(200)
                        .expect("Content-Type", "application/json; charset=utf-8")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Delete ticket", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(index_1.app)
                        .delete("/api/ticket/" + TicketController_test_1.ticket_id)
                        .auth(UserController_test_1.tokentest, { type: "bearer" })
                        .expect(200)
                        .expect("Content-Type", "application/json; charset=utf-8")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Delete planning", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(index_1.app)
                        .delete("/api/planning/" + PlanningController_test_1.planning_id)
                        .auth(UserController_test_1.tokentest, { type: "bearer" })
                        .expect(200)
                        .expect("Content-Type", "application/json; charset=utf-8")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Delete cdc", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(index_1.app)
                        .delete("/api/cdc/" + Specification_test_1.cdc_id)
                        .auth(UserController_test_1.tokentest, { type: "bearer" })
                        .expect(200)
                        .expect("Content-Type", "application/json; charset=utf-8")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Delete project", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(index_1.app)
                        .delete("/api/project/" + Specification_test_1.project_id)
                        .auth(UserController_test_1.tokentest, { type: "bearer" })
                        .expect(200)
                        .expect("Content-Type", "application/json; charset=utf-8")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("Delete team", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(index_1.app)
                        .delete("/api/team/" + TeamController_test_1.team_id)
                        .auth(UserController_test_1.tokentest, { type: "bearer" })
                        .expect(200)
                        .expect("Content-Type", "application/json; charset=utf-8")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
index_2.default.close();
//# sourceMappingURL=DeleteController.test.js.map