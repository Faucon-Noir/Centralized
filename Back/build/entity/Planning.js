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
exports.Planning = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./Project");
var Ticket_1 = require("./Ticket");
var Planning = /** @class */ (function () {
    function Planning(start_date, end_date) {
        this.start_date = start_date;
        this.end_date = end_date;
    }
    Planning.prototype.getId = function () {
        return this.id;
    };
    Planning.prototype.setStartDate = function (start_date) {
        this.start_date = start_date;
    };
    Planning.prototype.getStartDate = function () {
        return this.start_date;
    };
    Planning.prototype.setEndDate = function (end_date) {
        this.end_date = end_date;
    };
    Planning.prototype.getEndDate = function () {
        return this.end_date;
    };
    Planning.prototype.getProject = function () {
        return this.project;
    };
    Planning.prototype.setProject = function (project) {
        this.project = project;
    };
    Planning.prototype.setTicket = function (ticket) {
        this.ticket = this.ticket;
    };
    Planning.prototype.getTicket = function () {
        return this.ticket;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Planning.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Planning.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Planning.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Project_1.Project; }, { persistence: false }) // Init one to one relation with User
        ,
        (0, typeorm_1.JoinColumn)() // Join user table with FavoriteList table
        ,
        __metadata("design:type", Project_1.Project)
    ], Planning.prototype, "project", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Ticket_1.Ticket; }, function (ticket) { return ticket.planning; }),
        __metadata("design:type", Array)
    ], Planning.prototype, "ticket", void 0);
    Planning = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [Date, Date])
    ], Planning);
    return Planning;
}());
exports.Planning = Planning;
//# sourceMappingURL=Planning.js.map