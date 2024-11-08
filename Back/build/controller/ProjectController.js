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
exports.ProjectController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var Project_1 = require("../entity/Project");
var Specification_1 = require("../entity/Specification");
var Team_1 = require("../entity/Team");
var Auth_1 = require("../middleware/Auth");
require("reflect-metadata");
var dotenv = require("dotenv");
dotenv.config();
var ProjectController = /** @class */ (function () {
    function ProjectController(projectRepository, cdcRepository, teamRepository) {
        this.projectRepository = projectRepository;
        this.cdcRepository = cdcRepository;
        this.teamRepository = teamRepository;
        this.clientUrl = "http://localhost:8000";
        this.projectRepository = data_source_1.AppDataSource.getRepository(Project_1.Project);
        this.cdcRepository = data_source_1.AppDataSource.getRepository(Specification_1.Cdc);
        this.teamRepository = data_source_1.AppDataSource.getRepository(Team_1.Team);
    }
    /**
     * @swagger
     * /project/{id}:
     *   get:
     *     tags:
     *       - Project
     *     summary: Retrieves a single project by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the project to retrieve.
     *     responses:
     *       200:
     *         description: The project object if found.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Project'
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
    ProjectController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var project, cdc, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.projectRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        project = _a.sent();
                        if (!project)
                            throw new Error("Project not found");
                        return [4 /*yield*/, this.cdcRepository.findOne({
                                where: { project: { id: id } },
                            })];
                    case 2:
                        cdc = _a.sent();
                        return [2 /*return*/, { projectData: project, cdcData: cdc }];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: err_1.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /project/user/{userid}:
     *   get:
     *     tags:
     *       - Project
     *     summary: Retrieves all projects associated with a specific user.
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user.
     *     responses:
     *       200:
     *         description: The project object if found.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Project'
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
    ProjectController.prototype.getAllPojectByUser = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var project, _i, project_1, task, cdc, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.projectRepository.find({
                                where: { user: { id: userid } },
                                order: { start_date: "ASC" },
                            })];
                    case 1:
                        project = _a.sent();
                        if (!project)
                            throw new Error("Project not found");
                        _i = 0, project_1 = project;
                        _a.label = 2;
                    case 2:
                        if (!(_i < project_1.length)) return [3 /*break*/, 5];
                        task = project_1[_i];
                        return [4 /*yield*/, this.cdcRepository.findOne({
                                where: { project: { id: task.id } },
                            })];
                    case 3:
                        cdc = _a.sent();
                        task.cdc = cdc ? cdc : "";
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, project];
                    case 6:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /project/{id}:
     *   delete:
     *     tags:
     *       - Project
     *     summary: Removes a project by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the project to be removed.
     *     responses:
     *       200:
     *         description: The project was successfully deleted.
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
    ProjectController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var project, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.projectRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        project = _a.sent();
                        if (!project)
                            throw new Error("Project not found");
                        return [4 /*yield*/, this.projectRepository.remove(project)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Project deleted" }];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /project/{id}:
     *   patch:
     *     tags:
     *       - Project
     *     summary: Updates a project by its ID.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the project to be updated.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Project'
     *     responses:
     *       200:
     *         description: The project was successfully updated.
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
    ProjectController.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var project, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.projectRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        project = _a.sent();
                        if (!project)
                            throw new Error("Project not found");
                        return [4 /*yield*/, this.projectRepository.save(__assign(__assign({}, project), data))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Project updated" }];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Get)("/project/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single project by its ID.
         * @param id - The ID of the project to retrieve.
         * @returns The project object if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Get)("/project/user/:userid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all projects associated with a specific user.
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the project associated with the user.
         * @throws An error if the project is not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "getAllPojectByUser", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/project/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a project by its ID.
         * @param id - The ID of the project to be removed.
         * @returns A promise that resolves to an object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "remove", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/project/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a project with the specified ID.
         * @param id - The ID of the project to update.
         * @param data - The updated project data.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], ProjectController.prototype, "update", null);
    ProjectController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], ProjectController);
    return ProjectController;
}());
exports.ProjectController = ProjectController;
//# sourceMappingURL=ProjectController.js.map