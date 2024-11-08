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
exports.TeamController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var Team_1 = require("../entity/Team");
var TeamUser_1 = require("../entity/TeamUser");
var User_1 = require("../entity/User");
var Auth_1 = require("../middleware/Auth");
require("reflect-metadata");
var dotenv = require("dotenv");
var multer_1 = require("../config/multer");
dotenv.config();
// TODO: revoir les urls, plusieurs ne sont pas logiques
var TeamController = /** @class */ (function () {
    function TeamController(teamRepository, teamuserRepository, userRepository) {
        this.teamRepository = teamRepository;
        this.teamuserRepository = teamuserRepository;
        this.userRepository = userRepository;
        this.clientUrl = "http://localhost:8000";
        this.teamRepository = data_source_1.AppDataSource.getRepository(Team_1.Team);
        this.teamuserRepository = data_source_1.AppDataSource.getRepository(TeamUser_1.TeamUser);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    // Récupérer le userID depuis le token et changer l'url pour /team
    // Ce qui serait pas mal aussi c'est de faire en sorte que chaque id qu'on saisit en front soit ajouté d'office par cette requête, plutot que de multiplier les appels sur /teamuser
    /**
     * @swagger
     * /team/{userid}:
     *   post:
     *     tags:
     *       - Team
     *     summary: Creates a team and adds a user to it
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to be added to the team
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Team'
     *     responses:
     *       200:
     *         description: The created team user
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TeamUser'
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
    TeamController.prototype.createTeam = function (data, userid, storedFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var team, files, user, teamuser, err_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        team = data;
                        if (!team)
                            throw new Error("Team not created");
                        if (storedFiles) {
                            files = storedFiles.map(function (file) {
                                data.setAvatar(file.filename);
                            });
                        }
                        return [4 /*yield*/, this.teamRepository.save(team)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userid },
                            })];
                    case 3:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        teamuser = new TeamUser_1.TeamUser();
                        teamuser.setUser(user);
                        teamuser.setTeam(team);
                        if (!teamuser)
                            throw new Error("User not added to a Team");
                        return [4 /*yield*/, this.teamuserRepository.save(teamuser)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, teamuser];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, { error: err_1.message }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        return [2 /*return*/, { error: error_1.message }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: L'url est bonne mais il y a un bug qui fait qu'on ne peut pas ajouter un user à une équipe
    /**
     * @swagger
     * /teamuser:
     *   post:
     *     tags:
     *       - Team
     *     summary: Adds a user to a team
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/TeamUser'
     *     responses:
     *       200:
     *         description: The added team user
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/TeamUser'
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
    TeamController.prototype.addUserTeam = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, team, team_of_user, teamuser, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { mail: data.user },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        return [4 /*yield*/, this.teamRepository.findOne({
                                where: { id: data.team },
                            })];
                    case 2:
                        team = _a.sent();
                        if (!team)
                            throw new Error("Team not found");
                        return [4 /*yield*/, this.teamuserRepository
                                .createQueryBuilder("team_user")
                                .where("userId = :userId", { userId: user.getId() })
                                .andWhere("teamId = :teamId", { teamId: team.getId() })
                                .execute()];
                    case 3:
                        team_of_user = _a.sent();
                        if (team_of_user.length > 0)
                            throw new Error(user.getMail() + " already in the team");
                        teamuser = new TeamUser_1.TeamUser();
                        teamuser.setUser(user);
                        teamuser.setTeam(team);
                        if (!teamuser)
                            throw new Error("User not added to a Team");
                        return [4 /*yield*/, this.teamuserRepository.save(teamuser)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, teamuser];
                    case 5:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Récupérer le userID depuis le token et changer l'url pour /teamuser/user
    /**
     * @swagger
     * /teamuser/user/{id}:
     *   get:
     *     tags:
     *       - Team
     *     summary: Retrieves all teams associated with a user
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user
     *     responses:
     *       200:
     *         description: An array of teams associated with the user
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Team'
     *       400:
     *         description: User not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    TeamController.prototype.getAllTeamFromUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var team_of_user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teamuserRepository
                                .createQueryBuilder("team_user")
                                .leftJoinAndSelect("team_user.user", "user")
                                .leftJoinAndSelect("team_user.team", "team")
                                .where("user.id = :userId", { userId: id })
                                .getMany()];
                    case 1:
                        team_of_user = _a.sent();
                        if (!team_of_user)
                            throw new Error("User not found");
                        return [2 /*return*/, team_of_user];
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
     * /teamuser/project/{id}:
     *   get:
     *     tags:
     *       - Team
     *     summary: Retrieves all users from a project
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the project
     *     responses:
     *       200:
     *         description: A list of users in the project
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
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
    TeamController.prototype.getAllUserFromProject = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users_in_project, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teamuserRepository
                                .createQueryBuilder("team_user")
                                .innerJoin("team_user.user", "user")
                                .innerJoin("team_user.team", "team")
                                .innerJoin("team.project", "project", "project.id = :projectId", { projectId: id })
                                .select([
                                "user.firstname",
                                "user.lastname",
                                "user.bio",
                                "user.avatar as avatar",
                            ])
                                .getRawMany()];
                    case 1:
                        users_in_project = _a.sent();
                        if (!users_in_project)
                            throw new Error("Project not found");
                        return [2 /*return*/, users_in_project];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ========================================================================
     * A partir d'ici on ne touche plus les urls, elles sont logiques
     * ========================================================================
     */
    /**
     * @swagger
     * /teamuser/{id}:
     *   get:
     *     tags:
     *       - Team
     *     summary: Retrieves all users from a team
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the team
     *     responses:
     *       200:
     *         description: A list of users in the team
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
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
    TeamController.prototype.getAllUserFromTeam = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var users_in_team, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teamuserRepository
                                .createQueryBuilder("team_user")
                                .leftJoinAndSelect("team_user.user", "user")
                                .leftJoinAndSelect("team_user.team", "team")
                                .where("team.id = :teamId", { teamId: id })
                                .getMany()];
                    case 1:
                        users_in_team = _a.sent();
                        if (!users_in_team)
                            throw new Error("Team not found");
                        return [2 /*return*/, users_in_team];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, { error: err_5.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /team/{id}:
     *   get:
     *     tags:
     *       - Team
     *     summary: Retrieve a single team by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the team to retrieve
     *     responses:
     *       200:
     *         description: The team object if found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Team'
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
    TeamController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var team, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teamRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        team = _a.sent();
                        if (!team)
                            throw new Error("Team not found");
                        return [2 /*return*/, team];
                    case 2:
                        err_6 = _a.sent();
                        return [2 /*return*/, { error: err_6.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /team/{id}:
     *   delete:
     *     tags:
     *       - Team
     *     summary: Removes a team by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the team to remove
     *     responses:
     *       200:
     *         description: Team deleted
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
    TeamController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var team, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.teamRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        team = _a.sent();
                        if (!team)
                            throw new Error("Team not found");
                        return [4 /*yield*/, this.teamuserRepository.delete({ team: { id: id } })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.teamRepository.remove(team)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: "Team deleted" }];
                    case 4:
                        err_7 = _a.sent();
                        return [2 /*return*/, { error: err_7.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /teamuser/{id}:
     *   delete:
     *     tags:
     *       - Team
     *     summary: Removes a user from a team
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user to be removed from the team
     *     responses:
     *       200:
     *         description: User deleted from Team
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
    TeamController.prototype.removeUserTeam = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var teamuser, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.teamuserRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        teamuser = _a.sent();
                        if (!teamuser)
                            throw new Error("User cannot be deleted from Team");
                        return [4 /*yield*/, this.teamuserRepository.remove(teamuser)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "User deleted from Team" }];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, { error: err_8.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /project/{teamid}/{userid}:
     *   post:
     *     tags:
     *       - Team
     *     summary: Create a new project
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: teamid
     *         required: true
     *         schema:
     *           type: string
     *         description: The team ID
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: The user ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *               functionality:
     *                 type: string
     *               forecast:
     *                 type: string
     *               startDate:
     *                 type: string
     *                 format: date
     *               endDate:
     *                 type: string
     *                 format: date
     *               budget:
     *                 type: number
     *               technology:
     *                 type: string
     *               constraints:
     *                 type: string
     *               validation:
     *                 type: string
     *               teamUser:
     *                 type: string
     *     responses:
     *       200:
     *         description: Project created
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
    TeamController.prototype.update = function (id, data, storedFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var team_1, files, err_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.teamRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        team_1 = _a.sent();
                        if (!team_1)
                            throw new Error("Team not found");
                        // Version avatar
                        if (storedFiles) {
                            files = storedFiles.map(function (file) {
                                data.setAvatar(file.filename);
                                _this.teamRepository.save(__assign(__assign({}, team_1), data));
                                return { success: "Team updated" };
                            });
                        }
                        this.teamRepository.save(__assign(__assign({}, team_1), data));
                        return [2 /*return*/, { success: "Team updated" }];
                    case 2:
                        err_9 = _a.sent();
                        return [2 /*return*/, { error: err_9.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/team/:userid")
        // @UseBefore(CheckAuth)
        /**
         * Creates a team and adds a user to it.
         *
         * @param data - The team data.
         * @param userid - The ID of the user to be added to the team.
         * @returns The created team user.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Param)("userid")),
        __param(2, (0, routing_controllers_1.UploadedFiles)("avatar", { options: multer_1.multerConfig })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Team_1.Team, String, Array]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "createTeam", null);
    __decorate([
        (0, routing_controllers_1.Post)("/teamuser"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Adds a user to a team.
         *
         * @param data - The data containing the user and team IDs.
         * @returns The added team user.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "addUserTeam", null);
    __decorate([
        (0, routing_controllers_1.Get)("/teamuser/user/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all teams associated with a user.
         * @param id - The ID of the user.
         * @returns A promise that resolves to an array of teams.
         * @throws An error if the user is not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "getAllTeamFromUser", null);
    __decorate([
        (0, routing_controllers_1.Get)("/teamuser/project/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all users from a project.
         * @param id - The ID of the project.
         * @returns A Promise that resolves to an array of users in the project.
         * @throws If the team is not found, an error is thrown.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "getAllUserFromProject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/teamuser/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all users from a team.
         * @param id - The ID of the team.
         * @returns A Promise that resolves to an array of users in the team.
         * @throws If the team is not found, an error is thrown.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "getAllUserFromTeam", null);
    __decorate([
        (0, routing_controllers_1.Get)("/team/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single team by its ID.
         * @param id - The ID of the team to retrieve.
         * @returns The team object if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/team/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a team by its ID.
         * @param id - The ID of the team to remove.
         * @returns A promise that resolves to an object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "remove", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/teamuser/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a user from a team.
         * @param id - The ID of the user to be removed from the team.
         * @returns A success message if the user is successfully removed from the team, or an error message if an error occurs.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "removeUserTeam", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/team/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a team with the specified ID.
         * @param id - The ID of the team to update.
         * @param data - The updated team data.
         * @returns A promise that resolves to an object indicating the success or error message.
         */
        //  TODO: Vérifier que j'ai pas fait de la merde sur l'update
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __param(2, (0, routing_controllers_1.UploadedFiles)("avatar", { options: multer_1.multerConfig })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Team_1.Team,
            Array]),
        __metadata("design:returntype", Promise)
    ], TeamController.prototype, "update", null);
    TeamController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], TeamController);
    return TeamController;
}());
exports.TeamController = TeamController;
//# sourceMappingURL=TeamController.js.map