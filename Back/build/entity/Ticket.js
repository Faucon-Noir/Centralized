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
exports.Ticket = void 0;
var typeorm_1 = require("typeorm");
var Planning_1 = require("./Planning");
var User_1 = require("./User");
var enum_1 = require("../enum");
var Ticket = /** @class */ (function () {
    function Ticket(title, description, urgenceId, status, planningId, start_date, end_date, updated_at) {
        this.title = title;
        this.description = description;
        this.urgenceId = urgenceId;
        this.status = status;
        this.planningId = planningId;
        this.start_date = start_date;
        this.end_date = end_date;
        this.updated_at = updated_at;
    }
    Ticket.prototype.getId = function () {
        return this.id;
    };
    Ticket.prototype.setTitle = function (title) {
        this.title = title;
    };
    Ticket.prototype.getTitle = function () {
        return this.title;
    };
    Ticket.prototype.setDescription = function (description) {
        this.description = description;
    };
    Ticket.prototype.getDescription = function () {
        return this.description;
    };
    Ticket.prototype.setUrgenceId = function (urgenceId) {
        this.urgenceId = urgenceId;
    };
    Ticket.prototype.getUrgenceId = function () {
        return this.urgenceId;
    };
    Ticket.prototype.setStatus = function (status) {
        this.status = status;
    };
    Ticket.prototype.getStatus = function () {
        return this.status;
    };
    Ticket.prototype.setPlanningId = function () {
        return this.planningId;
    };
    Ticket.prototype.getPlanningId = function () {
        return this.planningId;
    };
    Ticket.prototype.setStartDate = function (start_date) {
        this.start_date = start_date;
    };
    Ticket.prototype.getStartDate = function () {
        return this.start_date;
    };
    Ticket.prototype.setEndDate = function (end_date) {
        this.end_date = end_date;
    };
    Ticket.prototype.getEndDate = function () {
        return this.end_date;
    };
    Ticket.prototype.getPlanning = function () {
        return this.planning;
    };
    Ticket.prototype.setPlanning = function (planning) {
        this.planning = planning;
    };
    Ticket.prototype.getUser = function () {
        return this.user;
    };
    Ticket.prototype.setUser = function (user) {
        this.user = user;
    };
    Ticket.prototype.setUpdated_at = function (updated_at) {
        this.updated_at = updated_at;
    };
    Ticket.prototype.getUpdated_at = function () {
        return this.updated_at;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Ticket.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Ticket.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Ticket.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Ticket.prototype, "urgenceId", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Ticket.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Ticket.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Ticket.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Ticket.prototype, "planningId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Planning_1.Planning; }, function (planning) { return planning.ticket; }),
        (0, typeorm_1.JoinColumn)({ name: "planningId" }),
        __metadata("design:type", Planning_1.Planning)
    ], Ticket.prototype, "planning", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.ticket; }),
        __metadata("design:type", User_1.User)
    ], Ticket.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Ticket.prototype, "updated_at", void 0);
    Ticket = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, Number, String, String, Date,
            Date,
            Date])
    ], Ticket);
    return Ticket;
}());
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map