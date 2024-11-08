"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var TeamUser_1 = require("./TeamUser");
var Ticket_1 = require("./Ticket");
var Specification_1 = require("./Specification");
var User = /** @class */ (function () {
    function User(lastname, firstname, mail, phone, bio, password, avatar) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.mail = mail;
        this.phone = phone;
        this.bio = bio;
        this.password = password;
        this.avatar = avatar;
    }
    User.prototype.getId = function () {
        return this.id;
    };
    User.prototype.getAvatar = function () {
        return this.avatar;
    };
    User.prototype.setAvatar = function (avatar) {
        this.avatar = avatar;
    };
    User.prototype.getLastname = function () {
        return this.lastname;
    };
    User.prototype.setLastname = function (lastname) {
        this.lastname = lastname;
    };
    User.prototype.getFirstname = function () {
        return this.firstname;
    };
    User.prototype.setFirstname = function (firstname) {
        this.firstname = firstname;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.setPassword = function (password) {
        this.password = password;
    };
    User.prototype.getMail = function () {
        return this.mail;
    };
    User.prototype.setMail = function (Mail) {
        this.mail = Mail;
    };
    User.prototype.getPhone = function () {
        return this.phone;
    };
    User.prototype.setPhone = function (phone) {
        this.phone = phone;
    };
    User.prototype.getBio = function () {
        return this.bio;
    };
    User.prototype.setBio = function (bio) {
        this.bio = bio;
    };
    User.prototype.getCreated_at = function () {
        return this.created_at;
    };
    User.prototype.getRoles = function () {
        this.roles = ["USER"];
        return this.roles;
    };
    User.prototype.setTeamUser = function (teamUser) {
        this.teamUser = this.teamUser;
    };
    User.prototype.getTeamUser = function () {
        return this.teamUser;
    };
    User.prototype.setTicket = function (ticket) {
        this.ticket = this.ticket;
    };
    User.prototype.getTicket = function () {
        return this.ticket;
    };
    User.prototype.setCdc = function (cdc) {
        this.cdc = this.cdc;
    };
    User.prototype.getCdc = function () {
        return this.cdc;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "lastname", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "firstname", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], User.prototype, "mail", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "bio", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return TeamUser_1.TeamUser; }, function (teamUser) { return teamUser.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "teamUser", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Ticket_1.Ticket; }, function (ticket) { return ticket.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "ticket", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Specification_1.Cdc; }, function (cdc) { return cdc.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "cdc", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String, String, String, String, String])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map