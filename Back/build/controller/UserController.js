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
exports.UserController = void 0;
var routing_controllers_1 = require("routing-controllers");
var data_source_1 = require("../db/data-source");
var User_1 = require("../entity/User");
var Auth_1 = require("../middleware/Auth");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var crypto = require("crypto");
require("reflect-metadata");
var NodeMailer_1 = require("../email/NodeMailer");
var multer_1 = require("../config/multer");
var dotenv = require("dotenv");
dotenv.config();
var UserController = /** @class */ (function () {
    function UserController(userRepository) {
        this.userRepository = userRepository;
        this.clientUrl = "http://localhost:8000";
        this.mailer = new NodeMailer_1.NodeMailerSendEmail();
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    /**
     * @swagger
     * /register:
     *   post:
     *     tags:
     *       - User
     *     summary: Registers a new user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: An object indicating the success message if registration is successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *       default:
     *         description: An object containing the error message
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    UserController.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var hasAccountWithEmail, hash, user, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { mail: data.getMail() },
                            })];
                    case 1:
                        hasAccountWithEmail = _a.sent();
                        if (hasAccountWithEmail)
                            throw new Error("Account existing. Please Login");
                        if (data.getPassword() == "" || !data.getPassword())
                            throw new Error("No password provide");
                        if (data.getPassword().includes(" "))
                            throw new Error("Space cannot be in a password");
                        return [4 /*yield*/, bcrypt.hash(data.getPassword(), 10)];
                    case 2:
                        hash = _a.sent();
                        user = data;
                        if (!user)
                            throw new Error("Account not created");
                        user.setPassword(hash);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 3:
                        _a.sent();
                        token = jwt.sign({
                            id: user.getId(),
                            roles: user.getRoles(),
                        }, process.env.SEC_KEY, {
                            expiresIn: "24h",
                        });
                        if (!token)
                            throw new Error("Error authentication");
                        return [2 /*return*/, { success: "Account created", token: token }];
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
     * /login:
     *   post:
     *     tags:
     *       - User
     *     summary: Authenticates a user and generates a JWT token for further authorization
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               mail:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: An object containing the success message and the generated token if authentication is successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: string
     *                 token:
     *                   type: string
     *       default:
     *         description: An object containing the error message
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     */
    UserController.prototype.login = function (data, req) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { mail: data.getMail() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        return [4 /*yield*/, bcrypt.compare(data.getPassword(), user.getPassword())];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid)
                            throw new Error("Identifiant/password incorrect");
                        token = jwt.sign({
                            id: user.getId(),
                            roles: user.getRoles(),
                        }, process.env.SEC_KEY, {
                            expiresIn: "24h",
                        });
                        if (!token)
                            throw new Error("Error authentication");
                        return [4 /*yield*/, this.mailer.sendMailTicket(user.getMail(), "Centralized : votre ticket à été avec succès !", user.getLastname())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { success: "Account login", token: token }];
                    case 4:
                        error_2 = _a.sent();
                        return [2 /*return*/, { error: error_2.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /user/{id}:
     *   get:
     *     tags:
     *       - User
     *     summary: Retrieves a single user by their ID
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the user to retrieve
     *     responses:
     *       200:
     *         description: The user object if found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
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
    UserController.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        return [2 /*return*/, user];
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
     * /user/mail/{id}:
     *   get:
     *     tags:
     *       - User
     *     summary: Retrieves a single user by their mail
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: mail
     *         schema:
     *           type: string
     *         required: true
     *         description: The mail of the user to retrieve
     *     responses:
     *       200:
     *         description: The user object if found
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
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
    UserController.prototype.getOneByMail = function (mail) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { mail: mail },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        return [2 /*return*/, user];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, { error: err_2.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // TODO: Modifier en /me et décoder le token pour savoir quel user on va mettre à jour
    // Comme le token est signé, si on change l'id conten u dedans il n'est plus valide donc 403
    // Et comme ça on améliore la sécurité
    /**
     * @swagger
     * /user/{id}:
     *   patch:
     *     tags:
     *       - User
     *     summary: Updates a user account
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user account to update
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     responses:
     *       200:
     *         description: Account updated
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
    UserController.prototype.update = function (id, data, storedFiles) {
        return __awaiter(this, void 0, void 0, function () {
            var user, files, hash, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        if (storedFiles) {
                            files = storedFiles.map(function (file) {
                                data.setAvatar(file.filename);
                                _this.userRepository.save(__assign(__assign({}, user), data));
                            });
                        }
                        if (!(data.getPassword() != undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.hash(data.getPassword(), 10)];
                    case 2:
                        hash = _a.sent();
                        data.setPassword(hash);
                        this.userRepository.save(__assign(__assign({}, user), data));
                        return [2 /*return*/, { success: "Account updated" }];
                    case 3:
                        this.userRepository.save(__assign(__assign({}, user), data));
                        return [2 /*return*/, { success: "Account updated" }];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, { error: err_3.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /user/{id}:
     *   delete:
     *     tags:
     *       - User
     *     summary: Removes a user account
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the user account to be removed
     *     responses:
     *       200:
     *         description: Account deleted
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
    UserController.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        return [4 /*yield*/, this.userRepository.remove(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { success: "Account deleted" }];
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
     * /requestResetPassword:
     *   post:
     *     tags:
     *       - User
     *     summary: Requests a password reset for a user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               mail:
     *                 type: string
     *     responses:
     *       200:
     *         description: The password reset link
     *         content:
     *           text/plain:
     *             schema:
     *               type: string
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
    UserController.prototype.requestResetPassword = function (data, req) {
        return __awaiter(this, void 0, void 0, function () {
            var user, resetToken, hash, link, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { mail: data.getMail() },
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        resetToken = crypto.randomBytes(32).toString("hex");
                        return [4 /*yield*/, bcrypt.hash(resetToken, 10)];
                    case 2:
                        hash = _a.sent();
                        req.session.token = hash;
                        link = "".concat(this.clientUrl, "/passwordReset?token=").concat(resetToken, "&id=").concat(user.getId());
                        return [2 /*return*/, link];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, { error: error_3.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @swagger
     * /user/resetPassword:
     *   patch:
     *     tags:
     *       - User
     *     summary: Resets the password for a user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               token:
     *                 type: string
     *               password:
     *                 type: string
     *               id:
     *                 type: string
     *     responses:
     *       200:
     *         description: Password reset
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
    UserController.prototype.resetPassword = function (data, req) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordResetToken, isValid, hash, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, req.session.token];
                    case 1:
                        passwordResetToken = _a.sent();
                        if (!passwordResetToken)
                            throw new Error("Invalid or expired password reset token");
                        return [4 /*yield*/, bcrypt.compare(data.token, passwordResetToken)];
                    case 2:
                        isValid = _a.sent();
                        if (!isValid)
                            throw new Error("Invalid or expired password reset token");
                        return [4 /*yield*/, bcrypt.hash(data.password, 10)];
                    case 3:
                        hash = _a.sent();
                        return [4 /*yield*/, this.userRepository.findOne({
                                where: { id: data.id },
                            })];
                    case 4:
                        user = _a.sent();
                        if (!user)
                            throw new Error("Account not found");
                        user.setPassword(hash);
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, { success: "Password reset" }];
                    case 6:
                        error_4 = _a.sent();
                        return [2 /*return*/, { error: error_4.message }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Post)("/register")
        /**
         * Registers a new user.
         *
         * @param data - The user data to be registered.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "register", null);
    __decorate([
        (0, routing_controllers_1.Post)("/login")
        /**
         * Authenticates a user and generates a JWT token for further authorization.
         *
         * @param data - The user data containing the email and password.
         * @param req - The request object.
         * @returns An object containing the success message and the generated token if authentication is successful,
         *          otherwise an object containing the error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "login", null);
    __decorate([
        (0, routing_controllers_1.Get)("/user/:id"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single user by their ID.
         * @param id - The ID of the user to retrieve.
         * @returns The user object if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Get)("/user/mail/:mail"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Retrieves a single user by their email.
         * @param id - The ID of the user to retrieve.
         * @returns The user object if found, otherwise an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("mail")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "getOneByMail", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/user/:id") // => /user/:id deviendrait /me
        ,
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Updates a user account.
         * @param id - The ID of the user account to update. => voué à disparaitre du coup, serait remplacé par le token
         * @param data - The updated user data. => ça on garde
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __param(1, (0, routing_controllers_1.Body)()),
        __param(2, (0, routing_controllers_1.UploadedFiles)("avatar", { options: multer_1.multerConfig })),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, User_1.User,
            Array]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "update", null);
    __decorate([
        (0, routing_controllers_1.Delete)("/user/:id/"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Removes a user account.
         * @param id - The ID of the user account to be removed.
         * @returns A promise that resolves to an object with a success property if the account is deleted, or an error property if an error occurs.
         */
        ,
        __param(0, (0, routing_controllers_1.Param)("id")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "remove", null);
    __decorate([
        (0, routing_controllers_1.Post)("/requestResetPassword"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Requests a password reset for a user.
         * @param data - The user data.
         * @param req - The request object.
         * @returns The password reset link or an error object.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [User_1.User, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "requestResetPassword", null);
    __decorate([
        (0, routing_controllers_1.Patch)("/resetPassword"),
        (0, routing_controllers_1.UseBefore)(Auth_1.CheckAuth)
        /**
         * Resets the password for a user.
         * @param data - The data containing the password reset token and new password.
         * @param req - The request object.
         * @returns An object indicating the success or error message.
         */
        ,
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Req)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], UserController.prototype, "resetPassword", null);
    UserController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        __metadata("design:paramtypes", [Object])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map