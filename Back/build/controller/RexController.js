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
exports.RexController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var Rex_1 = require("../entity/Rex");
var Project_1 = require("../entity/Project");
var Auth_1 = require("../middleware/Auth");
require("reflect-metadata");
var dotenv = require("dotenv");
dotenv.config();
var RexController = /** @class */ (function () {
    function RexController(rexRepository, projectRepository) {
        this.rexRepository = rexRepository;
        this.projectRepository = projectRepository;
        this.clientUrl = "http://localhost:8000";
        this.rexRepository = data_source_1.AppDataSource.getRepository(Rex_1.Rex);
        this.projectRepository = data_source_1.AppDataSource.getRepository(Project_1.Project);
    }
    /**
     * @swagger
     * /rex:
     *   post:
     *     tags:
     *       - Rex
     *     summary: Create a new Rex
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Rex'
     *     responses:
     *       200:
     *         description: Rex created
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *       default:
     *         description: Unexpected error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    RexController.prototype.createRex = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var project, dataproject, rex, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.projectRepository.findOne({
                                where: { id: data.getProject() },
                            })];
                    case 1:
                        project = _a.sent();
                        if (!project) {
                            throw new Error("Project not found");
                        }
                        dataproject = { status: true };
                        rex = data;
                        if (!rex)
                            throw new Error("Rex not created");
                        return [4 /*yield*/, this.projectRepository.save(__assign(__assign({}, project), dataproject))];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.rexRepository.save(rex)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: "Rex created" }];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, { error: error_1.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /rex/{id}:
     *   get:
     *     tags:
     *       - Rex
     *     summary: Retrieve a Rex by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The Rex ID
     *     responses:
     *       200:
     *         description: Rex retrieved
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Rex'
     *       default:
     *         description: Unexpected error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    RexController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rex, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.rexRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        rex = _a.sent();
                        if (!rex)
                            throw new Error("Rex not found");
                        return [2 /*return*/, rex];
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
     * /rex/project/{projectid}:
     *   get:
     *     tags:
     *       - Rex
     *     summary: Retrieve all Rex objects associated with a specific project
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: projectid
     *         required: true
     *         schema:
     *           type: string
     *         description: The project ID
     *     responses:
     *       200:
     *         description: Rex objects retrieved
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Rex'
     *       default:
     *         description: Unexpected error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    RexController.prototype.getAllRexByProject = function (projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var rex, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.rexRepository.findOne({
                                where: { project: { id: projectid } },
                            })];
                    case 1:
                        rex = _a.sent();
                        if (!rex)
                            throw new Error("Rex not found");
                        return [2 /*return*/, rex];
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
     * /rex/{id}:
     *   patch:
     *     tags:
     *       - Rex
     *     summary: Update a Rex by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The Rex ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Rex'
     *     responses:
     *       200:
     *         description: Rex updated
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *       default:
     *         description: Unexpected error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    RexController.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var rex, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.rexRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        rex = _a.sent();
                        if (!rex)
                            throw new Error("Rex not found");
                        return [4 /*yield*/, this.rexRepository.save(__assign(__assign({}, rex), data))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Rex updated" }];
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
     * /rex/{id}:
     *   delete:
     *     tags:
     *       - Rex
     *     summary: Delete a Rex by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The Rex ID
     *     responses:
     *       200:
     *         description: Rex deleted
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *       default:
     *         description: Unexpected error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    RexController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rex, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.rexRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        rex = _a.sent();
                        if (!rex)
                            throw new Error("Rex not found");
                        return [4 /*yield*/, this.rexRepository.remove(rex)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Rex deleted" }];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/rex"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Creates a new Rex.
         * @param data - The data for the new Rex.
         * @returns A promise that resolves to an object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Rex_1.Rex]),
        __metadata("design:returntype", Promise)
    ], RexController.prototype, "createRex", null);
    __decorate([
        (0, routing_controllers_1.Get)("/rex/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single Rex entity by its ID.
         * @param id - The ID of the Rex entity to retrieve.
         * @returns The retrieved Rex entity if found, otherwise an object with an error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RexController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Get)("/rex/project/:projectid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all Rex objects associated with a specific project.
         * @param projectid - The ID of the project.
         * @returns A Promise that resolves to an array of Rex objects.
         * @throws If the Rex objects are not found, an error is thrown.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RexController.prototype, "getAllRexByProject", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/rex/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a Rex entity by its ID.
         * @param id - The ID of the Rex entity to update.
         * @param data - The updated data for the Rex entity.
         * @returns An object indicating the success or error message of the update operation.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], RexController.prototype, "update", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/rex/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a Rex entity by its ID.
         * @param id - The ID of the Rex entity to be removed.
         * @returns A promise that resolves to an object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], RexController.prototype, "remove", null);
    RexController = __decorate([
        (0, routing_controllers_1.Controller)(),
        __metadata("design:paramtypes", [Object, Object])
    ], RexController);
    return RexController;
}());
exports.RexController = RexController;
//# sourceMappingURL=RexController.js.map