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
exports.Project = void 0;
var typeorm_1 = require("typeorm");
var Team_1 = require("./Team");
var User_1 = require("./User");
var Project = /** @class */ (function () {
    function Project(name, description, functionality, forecast, start_date, end_date, budget, technology, constraints, validation, template, status, team_user, color) {
        this.name = name;
        this.description = description;
        this.functionality = functionality;
        this.forecast = forecast;
        this.start_date = start_date;
        this.end_date = end_date;
        this.budget = budget;
        this.technology = technology;
        this.constraints = constraints;
        this.validation = validation;
        this.template = template;
        this.status = status;
        this.team_user = this.team_user;
        this.color = color;
    }
    Project.prototype.getId = function () {
        return this.id;
    };
    Project.prototype.getName = function () {
        return this.name;
    };
    Project.prototype.setDescription = function (description) {
        this.description = description;
    };
    Project.prototype.getDescription = function () {
        return this.description;
    };
    Project.prototype.setFunctionality = function (functionality) {
        this.functionality = functionality;
    };
    Project.prototype.getFunctionality = function () {
        return this.functionality;
    };
    Project.prototype.setForecast = function (forecast) {
        this.forecast = forecast;
    };
    Project.prototype.getForecast = function () {
        return this.forecast;
    };
    Project.prototype.setStartDate = function (start_date) {
        this.start_date = start_date;
    };
    Project.prototype.getStartDate = function () {
        return this.start_date;
    };
    Project.prototype.setEndDate = function (end_date) {
        this.end_date = end_date;
    };
    Project.prototype.getEndDate = function () {
        return this.end_date;
    };
    Project.prototype.setBudget = function (budget) {
        this.budget = budget;
    };
    Project.prototype.getBudget = function () {
        return this.budget;
    };
    Project.prototype.setTechnology = function (technology) {
        this.technology = technology;
    };
    Project.prototype.getTechnology = function () {
        return this.technology;
    };
    Project.prototype.setConstraints = function (constraints) {
        this.constraints = constraints;
    };
    Project.prototype.getConstraints = function () {
        return this.constraints;
    };
    Project.prototype.setValidation = function (validation) {
        this.validation = validation;
    };
    Project.prototype.getValidation = function () {
        return this.validation;
    };
    Project.prototype.setTemplate = function (template) {
        this.template = template;
    };
    Project.prototype.getTemplate = function () {
        return this.template;
    };
    Project.prototype.setStatus = function (status) {
        this.status = status;
    };
    Project.prototype.getStatus = function () {
        return this.status;
    };
    Project.prototype.getTeam = function () {
        return this.team;
    };
    Project.prototype.setTeam = function (team) {
        this.team = team;
    };
    Project.prototype.setUser = function (user) {
        this.user = user;
    };
    Project.prototype.getUser = function () {
        return this.user;
    };
    Project.prototype.setTeamUser = function (team_user) {
        this.team_user = team_user;
    };
    Project.prototype.getTeamUser = function () {
        return this.team_user;
    };
    Project.prototype.setColor = function (color) {
        this.color = color;
    };
    Project.prototype.getColor = function () {
        return this.color;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Project.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Project.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "functionality", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "forecast", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Project.prototype, "start_date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Project.prototype, "end_date", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "budget", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "technology", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "constraints", void 0);
    __decorate([
        (0, typeorm_1.Column)("text"),
        __metadata("design:type", String)
    ], Project.prototype, "validation", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Project.prototype, "color", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Project.prototype, "team_user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Project.prototype, "template", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Project.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.User; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", User_1.User)
    ], Project.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Team_1.Team; }) // Init many to one relation with Localisation
        ,
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Team_1.Team)
    ], Project.prototype, "team", void 0);
    Project = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String, String, Date,
            Date, String, String, String, String, String, Boolean, String, Number])
    ], Project);
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=Project.js.map