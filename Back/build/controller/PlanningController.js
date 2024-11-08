"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PlanningController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var Planning_1 = require("../entity/Planning");
var Project_1 = require("../entity/Project");
var Auth_1 = require("../middleware/Auth");
require("reflect-metadata");
var dotenv = require("dotenv");
dotenv.config();
var PlanningController = /** @class */ (function () {
    function PlanningController(planningRepository, projectRepository) {
        this.planningRepository = planningRepository;
        this.projectRepository = projectRepository;
        this.clientUrl = "http://localhost:8000";
        this.planningRepository = data_source_1.AppDataSource.getRepository(Planning_1.Planning);
        this.projectRepository = data_source_1.AppDataSource.getRepository(Project_1.Project);
    }
    /**
     * @swagger
     * /planning:
     *   post:
     *     tags:
     *       - Planning
     *     summary: Creates a new planning.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Planning'
     *     responses:
     *       200:
     *         description: The planning was successfully created.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *       400:
     *         description: Error message.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    PlanningController.prototype.createPlanning = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var project, planning, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.projectRepository.findOne({
                                where: { id: data.getProject() },
                            })];
                    case 1:
                        project = _a.sent();
                        if (!project) {
                            throw new Error("Project not found");
                        }
                        planning = data;
                        if (!planning)
                            throw new Error("Planning not created");
                        return [4 /*yield*/, this.planningRepository.save(planning)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Planning created" }];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, { error: error_1.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /planning/{id}:
     *   get:
     *     tags:
     *       - Planning
     *     summary: Retrieves a single planning by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the planning to retrieve.
     *     responses:
     *       200:
     *         description: The planning object if found.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Planning'
     *       400:
     *         description: Error message.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    PlanningController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var planning, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.planningRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        planning = _a.sent();
                        if (!planning)
                            throw new Error("Account not found");
                        return [2 /*return*/, planning];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: err_1.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /planning/{id}:
     *   get:
     *     tags:
     *       - Planning
     *     summary: Retrieves a single planning by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the planning to retrieve.
     *     responses:
     *       200:
     *         description: The planning object if found.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Planning'
     *       400:
     *         description: Error message.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    PlanningController.prototype.getAllPlanningByProject = function (projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var planning, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.planningRepository.find({
                                where: { project: { id: projectid } },
                            })];
                    case 1:
                        planning = _a.sent();
                        if (!planning)
                            throw new Error("Planning not found");
                        return [2 /*return*/, planning];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /planning/user/{userid}:
     *   get:
     *     tags:
     *       - Planning
     *     summary: Retrieves all plannings IDs and project name by their user ID.
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to retrieve.
     *     responses:
     *       200:
     *         description: The planning object if found.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Planning'
     *       400:
     *         description: Error message.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    PlanningController.prototype.getAllPlanningByUser = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var plannings, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.planningRepository
                                .createQueryBuilder("planning")
                                .innerJoin("planning.project", "project", "project.user = :userid", { userid: userid })
                                .select(["planning.id", "project.name"])
                                .getRawMany()];
                    case 1:
                        plannings = _a.sent();
                        if (!plannings)
                            throw new Error("Planning not found");
                        return [2 /*return*/, plannings];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /planning/{id}:
     *   delete:
     *     tags:
     *       - Planning
     *     summary: Removes a planning by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the planning to be removed.
     *     responses:
     *       200:
     *         description: The planning was successfully deleted.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *       400:
     *         description: Error message.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    PlanningController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var planning, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.planningRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        planning = _a.sent();
                        if (!planning)
                            throw new Error("Planning not found");
                        return [4 /*yield*/, this.planningRepository.remove(planning)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Planning deleted" }];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PlanningController.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var planning, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.planningRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        planning = _a.sent();
                        if (!planning)
                            throw new Error("Planning not found");
                        return [4 /*yield*/, this.planningRepository.save(__assign(__assign({}, planning), data))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Planning updated" }];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, { error: err_5.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/planning"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Creates a new planning.
         * @param data The planning data.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Planning_1.Planning]),
        __metadata("design:returntype", Promise)
    ], PlanningController.prototype, "createPlanning", null);
    __decorate([
        (0, routing_controllers_1.Get)("/planning/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single planning by its ID.
         * @param id - The ID of the planning to retrieve.
         * @returns The planning object if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PlanningController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Get)("/planning/project/:projectid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all planning items for a given project.
         * @param projectid - The ID of the project.
         * @returns A Promise that resolves to the planning items for the project, or an error object if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PlanningController.prototype, "getAllPlanningByProject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/planning/user/:userid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all projects name and plannings IDs associated with a specific user.
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the project associated with the user.
         * @throws An error if the project is not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PlanningController.prototype, "getAllPlanningByUser", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/planning/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a planning by its ID.
         * @param id - The ID of the planning to be removed.
         * @returns A promise that resolves to an object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], PlanningController.prototype, "remove", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/planning/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a planning record.
         * @param id - The ID of the planning record to update.
         * @param data - The updated data for the planning record.
         * @returns An object indicating the success or error message of the update operation.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Planning_1.Planning]),
        __metadata("design:returntype", Promise)
    ], PlanningController.prototype, "update", null);
    PlanningController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        __metadata("design:paramtypes", [Object, Object])
    ], PlanningController);
    return PlanningController;
}());
exports.PlanningController = PlanningController;
//# sourceMappingURL=PlanningController.js.map