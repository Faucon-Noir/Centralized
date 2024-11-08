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
exports.SpecificationController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var Planning_1 = require("../entity/Planning");
var Project_1 = require("../entity/Project");
var Team_1 = require("../entity/Team");
var Specification_1 = require("../entity/Specification");
var Auth_1 = require("../middleware/Auth");
var User_1 = require("../entity/User");
require("reflect-metadata");
var axios_1 = require("axios");
var fs = require("fs");
var dotenv = require("dotenv");
var Ticket_1 = require("../entity/Ticket");
var enum_1 = require("../enum");
dotenv.config();
// TODO: Retourner un statut pending tant que l'ia n'as aps terminé de créer un
/**
 * Traite une string pour y extirper toutes les dates
 * @param {string} input
 * @param {string} startDateString
 * @returns {Date[]}
 */
function parseDurations(input, startDateString) {
    var durations = [];
    var startDate = new Date(startDateString);
    // Define mappings for different units
    var unitMappings = {
        semaine: "week",
        semaines: "weeks",
        week: "week",
        weeks: "weeks",
        jour: "day",
        jours: "days",
        day: "day",
        days: "days",
        j: "day",
        d: "days",
        heures: "hour",
        heure: "hour",
        hour: "hour",
        hours: "hours",
        h: "hours",
    };
    // Regular expression to match each duration entry
    var regex = /(\d+)\s*([a-zA-Z]+)/g;
    // Match all duration entries in the input string
    var match;
    while ((match = regex.exec(input)) !== null) {
        var value = parseInt(match[1]);
        var unit = unitMappings[match[2].toLowerCase()];
        if (!isNaN(value) && unit) {
            var newDate = void 0;
            switch (unit) {
                case "week":
                case "weeks":
                    newDate = new Date(startDate.getTime() + value * 7 * 24 * 60 * 60 * 1000);
                    break;
                case "day":
                case "days":
                    newDate = new Date(startDate.getTime() + value * 24 * 60 * 60 * 1000);
                    break;
                case "hour":
                case "hours":
                    newDate = new Date(startDate.getTime() + value * 60 * 60 * 1000);
                    break;
                default:
                    continue; // Unsupported unit
            }
            durations.push(newDate);
        }
    }
    return durations;
}
/**
 * Créé des tickets pour chaque date trouvé dans l'échéancier
 * @param {Project} params
 * @param {Project} project_input
 * @param {Planning} planning_input
 * @param {User} user
 * @param {any} planningRepository
 * @param {any} ticketRepository
 */
function createTicket(params, project_input, planning_input, user, planningRepository, ticketRepository) {
    return __awaiter(this, void 0, void 0, function () {
        var resultArray, forecastarray, planning;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resultArray = parseDurations(params.getForecast(), JSON.stringify(project_input.getStartDate()));
                    forecastarray = params.getForecast().split(/[;,]/);
                    return [4 /*yield*/, planningRepository.findOne({
                            where: { id: planning_input.getId() },
                        })];
                case 1:
                    planning = _a.sent();
                    if (!planning)
                        throw new Error("Planning not found");
                    //On créé un ticket pour chaque date trouvé
                    if (resultArray.length > 0) {
                        resultArray.forEach(function (date, index) { return __awaiter(_this, void 0, void 0, function () {
                            var ticket;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ticket = new Ticket_1.Ticket(forecastarray[index], // title
                                        "", // description
                                        0, // urgenceId
                                        enum_1.StatusEnum.Open, // status
                                        planning.getId(), // planningId
                                        project_input.getStartDate(), // start_date
                                        date, // end_date
                                        new Date());
                                        ticket.setUser(user);
                                        ticket.setPlanning(planning);
                                        return [4 /*yield*/, ticketRepository.save(ticket)];
                                    case 1:
                                        _a.sent();
                                        console.log("Ticket ".concat(index + 1, " cr\u00E9\u00E9: ").concat(ticket.getId()));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    else {
                        console.log("Pas de durée trouvé, pas de ticket créé");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
var requestStatus = {
    finished: false,
    data: null
};
var SpecificationController = /** @class */ (function () {
    function SpecificationController(planningRepository, projectRepository, cdcRepository, teamRepository, userRepository, ticketRepository) {
        this.planningRepository = planningRepository;
        this.projectRepository = projectRepository;
        this.cdcRepository = cdcRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.planningRepository = data_source_1.AppDataSource.getRepository(Planning_1.Planning);
        this.projectRepository = data_source_1.AppDataSource.getRepository(Project_1.Project);
        this.cdcRepository = data_source_1.AppDataSource.getRepository(Specification_1.Cdc);
        this.teamRepository = data_source_1.AppDataSource.getRepository(Team_1.Team);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        this.ticketRepository = data_source_1.AppDataSource.getRepository(Ticket_1.Ticket);
    }
    /**
     * @swagger
     * /project/{teamid}/{userid}:
     *   post:
     *     tags:
     *       - Cdc
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
    SpecificationController.prototype.newproject = function (params, req, teamid, userid) {
        return __awaiter(this, void 0, void 0, function () {
            var team, user, project, project_nbr, project_input, cdc, cdc_input, dataread, content, data, config, databackup_1, configbackup_1, planning_input, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestStatus.finished = false;
                        requestStatus.data = null;
                        return [4 /*yield*/, this.teamRepository.findOne({
                                where: { id: teamid },
                            })];
                    case 1:
                        team = _a.sent();
                        if (!team)
                            throw new Error("Team not found");
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: userid },
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user)
                            throw new Error("User not found");
                        return [4 /*yield*/, this.projectRepository.find({
                                where: { user: { id: userid } },
                            })];
                    case 3:
                        project = _a.sent();
                        project_nbr = Object.keys(project).length;
                        project_input = params;
                        project_input.setTeam(team);
                        project_input.setUser(user);
                        cdc = "Données en attente";
                        cdc_input = new Specification_1.Cdc(cdc);
                        cdc_input.setTeam(team);
                        cdc_input.setUser(user);
                        project_input.setColor(project_nbr++);
                        return [4 /*yield*/, this.projectRepository.save(project_input)];
                    case 4:
                        _a.sent();
                        console.log("Projet cr\u00E9\u00E9: ".concat(project_input.getId()));
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, fs.promises.readFile(__filename + "/../../template/Template_1.txt", "utf8")];
                    case 6:
                        dataread = _a.sent();
                        content = "La génération doit etre en HTML. En suivant ce plan: " +
                            dataread +
                            " Génère un cahier des charges comme si un humain l'avais rédigé en ajoutant des informations correspondant au projet et en developpant d'avantage le projet pour remplir toutes les catégories pour un projet appelé " +
                            params.getName() +
                            ". Description du projet: " +
                            params.getDescription() +
                            ". Développe d'avantage la description du projet et justifie le besoin de ce projet. Liste des fonctionnalités: " +
                            params.getFunctionality() +
                            ". Developpe la rédatio autour de ces fonctionnalité. Planning prévisionnel: " +
                            params.getForecast() +
                            ". Date de début: " +
                            params.getStartDate() +
                            ". Date de fin: " +
                            params.getEndDate() +
                            ". Budget: " +
                            params.getBudget() +
                            ". Estimme comment ce budget va etre dépensé et justifie le. Technologies du projet: " +
                            params.getTechnology() +
                            ". Jusitifie le choix de ses technologies dans un developpement complet. Les contraintes techniques: " +
                            params.getConstraints() +
                            ". Condition de validation du projet: " +
                            params.getValidation() +
                            ". Chef de projet: " +
                            user.getFirstname() +
                            " " +
                            user.getLastname() +
                            ". Nom de l'équipe: " +
                            team.getName() +
                            ". Chaque membre de l'équipe et leurs role: " +
                            params.getTeamUser();
                        data = {
                            model: process.env.IA_MODEL,
                            messages: [{ role: "user", content: content }],
                            temperature: 0,
                        };
                        config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(process.env.API_KEY),
                            },
                        };
                        databackup_1 = {
                            model: process.env.BACKUP_IA_MODEL,
                            messages: [{ role: "user", content: content }],
                            temperature: 0,
                        };
                        configbackup_1 = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(process.env.BACKUP_API_KEY),
                            },
                        };
                        // Requete axios a l'api open ai
                        console.log("requete ia");
                        axios_1.default
                            .post(process.env.IA_URL, data, config)
                            .then(function (response) {
                            console.log(response.data.choices[0].message.content);
                            cdc = response.data.choices[0].message.content;
                            cdc = cdc.replace(/```html/g, "");
                            cdc = cdc.split("```")[0];
                            cdc_input.setCdc(cdc);
                            cdc_input.setProject(project_input);
                            _this.cdcRepository.save(cdc_input);
                            console.log("Cahier des charges cr\u00E9\u00E9");
                            requestStatus.finished = true;
                            requestStatus.data = response.data;
                            return cdc;
                        })
                            .catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                            var backupResponse, backupError_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.error("Error:", error);
                                        // If the first request fails, try a backup URL
                                        console.log("Backup request ia");
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, axios_1.default.post(process.env.BACKUP_IA_URL, databackup_1, configbackup_1)];
                                    case 2:
                                        backupResponse = _a.sent();
                                        console.log(backupResponse.data.choices[0].message.content);
                                        cdc = backupResponse.data.choices[0].message.content;
                                        cdc_input.setCdc(cdc);
                                        cdc_input.setProject(project_input);
                                        this.cdcRepository.save(cdc_input);
                                        console.log("Cahier des charges cr\u00E9\u00E9 (backup)");
                                        requestStatus.finished = true;
                                        requestStatus.data = cdc_input;
                                        return [2 /*return*/, cdc];
                                    case 3:
                                        backupError_1 = _a.sent();
                                        console.error("Backup Error:", backupError_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        planning_input = new Planning_1.Planning(params.getStartDate(), params.getEndDate());
                        planning_input.setProject(project_input);
                        if (!planning_input)
                            throw new Error("Planning not created");
                        return [4 /*yield*/, this.planningRepository.save(planning_input)];
                    case 7:
                        _a.sent();
                        console.log("Planning cr\u00E9\u00E9: ".concat(planning_input.getId()));
                        //on appelle la fonction de création de ticket
                        createTicket(params, project_input, planning_input, user, this.planningRepository, this.ticketRepository);
                        return [2 /*return*/, { status: requestStatus.finished }];
                    case 8:
                        error_1 = _a.sent();
                        return [2 /*return*/, { error: error_1.message }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SpecificationController.prototype.checkStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { status: requestStatus.finished }];
            });
        });
    };
    /**
     * @swagger
     * /cdc/{id}:
     *   get:
     *     tags:
     *       - Cdc
     *     summary: Retrieve a single Cdc entity by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the Cdc entity
     *     responses:
     *       200:
     *         description: The retrieved Cdc entity if found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cdc'
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
    SpecificationController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cdc, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdcRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        cdc = _a.sent();
                        if (!cdc)
                            throw new Error("Cdc not found");
                        return [2 /*return*/, cdc];
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
     * /cdc/user/{userid}:
     *   get:
     *     tags:
     *       - Cdc
     *     summary: Retrieves all CDCs associated with a specific user
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: userid
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the user
     *     responses:
     *       200:
     *         description: A CDC object
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cdc'
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
    SpecificationController.prototype.getAllCdcByUser = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var cdc, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdcRepository.find({
                                where: { user: { id: userid } },
                            })];
                    case 1:
                        cdc = _a.sent();
                        if (!cdc)
                            throw new Error("Cdc not found");
                        return [2 /*return*/, cdc];
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
     * /cdc/project/{projectid}:
     *   get:
     *     tags:
     *       - Cdc
     *     summary: Retrieves all CDCs associated with a specific project
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: projectid
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the project
     *     responses:
     *       200:
     *         description: A CDC object
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Cdc'
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
    SpecificationController.prototype.getAllCdcByProject = function (projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var cdc, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.cdcRepository.findOne({
                                where: { project: { id: projectid } },
                            })];
                    case 1:
                        cdc = _a.sent();
                        if (!cdc)
                            throw new Error("Cdc not found");
                        return [2 /*return*/, cdc];
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
     * /cdc/{id}:
     *   delete:
     *     tags:
     *       - Cdc
     *     summary: Removes a Cdc by its ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the Cdc to remove
     *     responses:
     *       200:
     *         description: Cdc deleted
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
    SpecificationController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var cdc, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.cdcRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        cdc = _a.sent();
                        if (!cdc)
                            throw new Error("Cdc not found");
                        return [4 /*yield*/, this.cdcRepository.remove(cdc)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Cdc deleted" }];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, { error: err_4.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /cdc/{id}:
     *   patch:
     *     tags:
     *       - Cdc
     *     summary: Update a Cdc record
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The id of the Cdc record to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Cdc'
     *     responses:
     *       200:
     *         description: Cdc record updated
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
    SpecificationController.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var cdc, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.cdcRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        cdc = _a.sent();
                        if (!cdc)
                            throw new Error("Cdc not found");
                        return [4 /*yield*/, this.cdcRepository.save(__assign(__assign({}, cdc), data))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Cdc updated" }];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, { error: err_5.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/project/:teamid/:userid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Creates a new project.
         *
         * @param params - The project parameters.
         * @param req - The request object.
         * @param teamid - The team ID.
         * @param userid - The user ID.
         * @returns A success message if the project is created, or an error message if there is an error.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Param)("teamid")),
        __param(3, (0, routing_controllers_1.Param)("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Project_1.Project, Object, String, String]),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "newproject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/specification/check-status"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "checkStatus", null);
    __decorate([
        (0, routing_controllers_1.Get)("/cdc/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single Cdc entity by its ID.
         * @param id - The ID of the Cdc entity.
         * @returns The retrieved Cdc entity if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Get)("/cdc/user/:userid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all CDCs associated with a specific user.
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the retrieved CDCs or an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "getAllCdcByUser", null);
    __decorate([
        (0, routing_controllers_1.Get)("/cdc/project/:projectid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all CDCs associated with a specific project.
         * @param projectid - The ID of the project.
         * @returns A Promise that resolves to the retrieved CDCs, or an error object if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "getAllCdcByProject", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/cdc/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a Cdc by its ID.
         * @param id - The ID of the Cdc to remove.
         * @returns A promise that resolves to an object with a success property if the Cdc is deleted successfully, or an error property if an error occurs.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "remove", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/cdc/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a Cdc record with the specified id.
         * @param id - The id of the Cdc record to update.
         * @param data - The updated data for the Cdc record.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Specification_1.Cdc]),
        __metadata("design:returntype", Promise)
    ], SpecificationController.prototype, "update", null);
    SpecificationController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
    ], SpecificationController);
    return SpecificationController;
}());
exports.SpecificationController = SpecificationController;
//# sourceMappingURL=SpecificationController.js.map