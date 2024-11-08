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
exports.TicketController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var Ticket_1 = require("../entity/Ticket");
var Planning_1 = require("../entity/Planning");
var User_1 = require("../entity/User");
var Auth_1 = require("../middleware/Auth");
require("reflect-metadata");
var dotenv = require("dotenv");
dotenv.config();
var TicketController = /** @class */ (function () {
    function TicketController(ticketRepository, planningRepository, userRepository) {
        this.ticketRepository = ticketRepository;
        this.planningRepository = planningRepository;
        this.userRepository = userRepository;
        this.clientUrl = "http://localhost:8000";
        this.ticketRepository = data_source_1.AppDataSource.getRepository(Ticket_1.Ticket);
        this.planningRepository = data_source_1.AppDataSource.getRepository(Planning_1.Planning);
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    /**
     * @swagger
     * /ticket:
     *   post:
     *     tags:
     *       - Ticket
     *     summary: Create a new ticket
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Ticket'
     *     responses:
     *       200:
     *         description: The ticket was created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     */
    TicketController.prototype.createTicket = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var planning, user, ticket, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.planningRepository.findOne({
                                where: { id: data.planningId },
                            })];
                    case 1:
                        planning = _a.sent();
                        if (!planning) {
                            throw new Error("Planning not found");
                        }
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: data.getUser() },
                            })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User not found");
                        }
                        ticket = data;
                        ticket.setPlanning(planning);
                        ticket.setUser(user);
                        if (!ticket)
                            throw new Error("Ticket not created");
                        return [4 /*yield*/, this.ticketRepository.save(ticket)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: "Ticket created" }];
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
     * /ticket/{id}:
     *   patch:
     *     tags:
     *       - Ticket
     *     summary: Update a ticket
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ticket ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Ticket'
     *     responses:
     *       200:
     *         description: The ticket was updated
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     */
    TicketController.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ticketRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        ticket = _a.sent();
                        if (!ticket)
                            throw new Error("Ticket not found");
                        return [4 /*yield*/, this.ticketRepository.save(__assign(__assign({}, ticket), data))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Ticket updated" }];
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
     * /ticket/{id}:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Retrieve a single ticket by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the ticket to retrieve
     *     responses:
     *       200:
     *         description: The ticket was found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: The ticket was not found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        ticket = _a.sent();
                        if (!ticket)
                            throw new Error("Account not found");
                        return [2 /*return*/, ticket];
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
     * /ticket/planning/{planningid}:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère tous les tickets associés à une planification spécifique
     *     parameters:
     *       - in: path
     *         name: planningid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de la planification
     *     responses:
     *       200:
     *         description: Les tickets ont été récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getAllTicketByPlanning = function (planningid) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, count, l, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository.find({
                                where: { planning: { id: planningid } },
                            })];
                    case 1:
                        ticket = _a.sent();
                        if (!ticket)
                            throw new Error("Ticket not found");
                        count = 0;
                        for (l in ticket) {
                            count++;
                        }
                        return [2 /*return*/, { ticket: ticket, count: count }];
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
     * /ticket/project/{projectid}:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère tous les tickets associés à un projet spécifique
     *     parameters:
     *       - in: path
     *         name: projectid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID du projet
     *     responses:
     *       200:
     *         description: Les tickets ont été récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getAllTicketByProject = function (projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var planning, ticket, count, l, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.planningRepository.find({
                                where: { project: { id: projectid } },
                            })];
                    case 1:
                        planning = _a.sent();
                        if (!planning)
                            throw new Error("Ticket not found");
                        return [4 /*yield*/, this.ticketRepository.find({
                                where: { planning: { id: planning[0].getId() } },
                                order: { start_date: "ASC" },
                            })];
                    case 2:
                        ticket = _a.sent();
                        if (!ticket)
                            throw new Error("Ticket not found");
                        count = 0;
                        for (l in ticket) {
                            count++;
                        }
                        return [2 /*return*/, { ticket: ticket, count: count, planning: planning }];
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
     * /ticket/user/{userid}:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère tous les tickets associés à un utilisateur spécifique
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de l'utilisateur
     *     responses:
     *       200:
     *         description: Les tickets ont été récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getAllTicketByUser = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var tickets, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder("ticket")
                                .innerJoin("ticket.planning", "planning", "ticket.user = :userid", { userid: userid })
                                .select(["ticket", "planning.project"])
                                .getRawMany()];
                    case 1:
                        tickets = _a.sent();
                        if (!tickets)
                            throw new Error("Ticket not found");
                        return [2 /*return*/, { ticket: tickets, count: tickets.length }];
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
     * /ticket/{id}:
     *   delete:
     *     tags:
     *       - Ticket
     *     summary: Supprime un ticket par son ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID du ticket à supprimer
     *     responses:
     *       200:
     *         description: Le ticket a été supprimé avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *                   description: Message de succès
     *       404:
     *         description: Le ticket n'a pas été trouvé
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   description: Message d'erreur
     */
    TicketController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ticketRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        ticket = _a.sent();
                        if (!ticket)
                            throw new Error("Ticket not found");
                        return [4 /*yield*/, this.ticketRepository.remove(ticket)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Ticket deleted" }];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, { error: err_6.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /ticket/user/{userid}/count:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Compte tous les tickets associés à un utilisateur spécifique.
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de l'utilisateur
     *     responses:
     *       200:
     *         description: Les tickets ont été récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getCountAllTicketByUser = function (userid) {
        return __awaiter(this, void 0, void 0, function () {
            var tickets, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder("ticket")
                                .innerJoin("ticket.planning", "planning", "ticket.user = :userid", { userid: userid })
                                .where("ticket.status != :status", { status: "résolu" })
                                .select(["COUNT(ticket.id) as nbr_ticket"])
                                .getRawOne()];
                    case 1:
                        tickets = _a.sent();
                        if (!tickets)
                            throw new Error("Ticket not found");
                        return [2 /*return*/, tickets];
                    case 2:
                        err_7 = _a.sent();
                        return [2 /*return*/, { error: err_7.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /ticket/user/{userid}/project/{projectid}:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère le nombre de ticket par parsonne pour un  d'un utilisateur spécifique
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de l'utilisateur
     *     responses:
     *       200:
     *         description: Les tickets ont été récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getCountAllTicketByUserOneProject = function (userid, projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var tickets, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder("ticket")
                                .innerJoin("ticket.planning", "planning", "ticket.status != 'résolu'")
                                .innerJoin("ticket.user", "user")
                                .innerJoin("planning.project", "project", "planning.project = :projectid", { projectid: projectid })
                                // Pour s'assurer que le projet est bien géré par une équipe de l'utilisateur
                                .innerJoin("project.team", "team")
                                .innerJoin("team.teamUser", "teamUser")
                                .innerJoin("teamUser.user", "TeamLimit", "teamUser.user = :userid", { userid: userid })
                                .select([
                                "concat(user.firstname,' ', user.lastname) as userName",
                                "COUNT(distinct ticket.id) as nbr_ticket",
                            ])
                                .groupBy("user.id")
                                .getRawMany()];
                    case 1:
                        tickets = _a.sent();
                        if (!tickets)
                            throw new Error("Ticket not found");
                        return [2 /*return*/, tickets];
                    case 2:
                        err_8 = _a.sent();
                        return [2 /*return*/, { error: err_8.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /ticket/user/{userid}/project/{projectid}/status:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère le nombre de ticket par état pour un projet
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de l'utilisateur
     *     responses:
     *       200:
     *         description: Les tickets ont été récupérés avec succès
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getCountAllTicketByStatusOneProject = function (userid, projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var tickets, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder("ticket")
                                .innerJoin("ticket.planning", "planning")
                                .innerJoin("ticket.user", "user")
                                .innerJoin("planning.project", "project", "planning.project = :projectid", { projectid: projectid })
                                // Pour s'assurer que le projet est bien géré par une équipe de l'utilisateur
                                .innerJoin("project.team", "team")
                                .innerJoin("team.teamUser", "teamUser")
                                .innerJoin("teamUser.user", "TeamLimit", "teamUser.user = :userid", { userid: userid })
                                .select([
                                "ticket.status as status",
                                "COUNT(distinct ticket.id) as nbr_ticket",
                            ])
                                .groupBy("ticket.status")
                                .getRawMany()];
                    case 1:
                        tickets = _a.sent();
                        if (!tickets)
                            throw new Error("Ticket not found");
                        return [2 /*return*/, tickets];
                    case 2:
                        err_9 = _a.sent();
                        return [2 /*return*/, { error: err_9.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /ticket/user/{userid}/project/{projectid}/count:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère le nombre de ticket non cloturé d'un projet
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de l'utilisateur
     *     responses:
     *       200:
     *         description: Le nombre de ticket du projet
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getCountAllTicketNotCloseOneProject = function (userid, projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var tickets, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder("ticket")
                                .innerJoin("ticket.planning", "planning", "ticket.status != 'résolu'")
                                .innerJoin("ticket.user", "user")
                                .innerJoin("planning.project", "project", "planning.project = :projectid", { projectid: projectid })
                                // Pour s'assurer que le projet est bien géré par une équipe de l'utilisateur
                                .innerJoin("project.team", "team")
                                .innerJoin("team.teamUser", "teamUser")
                                .innerJoin("teamUser.user", "TeamLimit", "teamUser.user = :userid", { userid: userid })
                                .select(["COUNT(distinct ticket.id) as nbr_ticket"])
                                .getRawOne()];
                    case 1:
                        tickets = _a.sent();
                        if (!tickets)
                            throw new Error("Ticket not found");
                        return [2 /*return*/, tickets];
                    case 2:
                        err_10 = _a.sent();
                        return [2 /*return*/, { error: err_10.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /ticket/user/{userid}/project/{projectid}/count/all:
     *   get:
     *     tags:
     *       - Ticket
     *     summary: Récupère le nombre de ticket total d'un projet
     *     parameters:
     *       - in: path
     *         name: userid
     *         required: true
     *         schema:
     *           type: string
     *         description: L'ID de l'utilisateur
     *     responses:
     *       200:
     *         description: Le nombre de ticket du projet
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Ticket'
     *       404:
     *         description: Les tickets n'ont pas été trouvés
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    TicketController.prototype.getCountAllTicketOneProject = function (userid, projectid) {
        return __awaiter(this, void 0, void 0, function () {
            var tickets, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ticketRepository
                                .createQueryBuilder("ticket")
                                .innerJoin("ticket.planning", "planning")
                                .innerJoin("ticket.user", "user")
                                .innerJoin("planning.project", "project", "planning.project = :projectid", { projectid: projectid })
                                // Pour s'assurer que le projet est bien géré par une équipe de l'utilisateur
                                .innerJoin("project.team", "team")
                                .innerJoin("team.teamUser", "teamUser")
                                .innerJoin("teamUser.user", "TeamLimit", "teamUser.user = :userid", { userid: userid })
                                .select(["COUNT(ticket.id) as nbr_ticket"])
                                .getRawOne()];
                    case 1:
                        tickets = _a.sent();
                        if (!tickets)
                            throw new Error("Ticket not found");
                        return [2 /*return*/, tickets];
                    case 2:
                        err_11 = _a.sent();
                        return [2 /*return*/, { error: err_11.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/ticket"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Creates a new ticket.
         * @param data - The ticket data.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Ticket_1.Ticket]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "createTicket", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/ticket/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a ticket with the specified ID.
         * @param id - The ID of the ticket to update.
         * @param data - The updated ticket data.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "update", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single ticket by its ID.
         * @param id - The ID of the ticket to retrieve.
         * @returns The ticket object if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/planning/:planningid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all tickets associated with a specific planning.
         * @param planningid - The ID of the planning.
         * @returns A Promise that resolves to the ticket associated with the planning, or an error object if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("planningid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getAllTicketByPlanning", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/project/:projectid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all tickets associated with a specific project.
         * @param projectid - The ID of the project.
         * @returns A promise that resolves to the array of tickets or an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getAllTicketByProject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/user/:userid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves all tickets associated with a specific user.
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getAllTicketByUser", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/ticket/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a ticket by its ID.
         * @param id - The ID of the ticket to be removed.
         * @returns A promise that resolves to an object with a success property if the ticket is deleted successfully, or an error property if an error occurs.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "remove", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/user/:userid/count"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Counts all tickets associated with a specific user.
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getCountAllTicketByUser", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/user/:userid/project/:projectid"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves the number of tickets per user of a specific user's groups for .
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __param(1, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getCountAllTicketByUserOneProject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/user/:userid/project/:projectid/status"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves the number of tickets per status of a specific user's project .
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __param(1, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getCountAllTicketByStatusOneProject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/user/:userid/project/:projectid/count"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves the number of tickets not close of a specific user's project.
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __param(1, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getCountAllTicketNotCloseOneProject", null);
    __decorate([
        (0, routing_controllers_1.Get)("/ticket/user/:userid/project/:projectid/count/all"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves the number of tickets of a specific user's project .
         * @param userid - The ID of the user.
         * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("userid")),
        __param(1, (0, routing_controllers_1.Param)("projectid")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", Promise)
    ], TicketController.prototype, "getCountAllTicketOneProject", null);
    TicketController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], TicketController);
    return TicketController;
}());
exports.TicketController = TicketController;
//# sourceMappingURL=TicketController.js.map