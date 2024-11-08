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
exports.Cdc = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./Project");
var User_1 = require("./User");
var Team_1 = require("./Team");
var Cdc = /** @class */ (function () {
    function Cdc(cdc) {
        this.cdc = cdc;
    }
    Cdc.prototype.getId = function () {
        return this.id;
    };
    Cdc.prototype.setCdc = function (cdc) {
        this.cdc = cdc;
    };
    Cdc.prototype.getCdc = function () {
        return this.cdc;
    };
    Cdc.prototype.getProject = function () {
        return this.project;
    };
    Cdc.prototype.setProject = function (project) {
        this.project = project;
    };
    Cdc.prototype.getUser = function () {
        return this.user;
    };
    Cdc.prototype.setUser = function (User) {
        this.user = User;
    };
    Cdc.prototype.getTeam = function () {
        return this.team;
    };
    Cdc.prototype.setTeam = function (team) {
        this.team = team;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Cdc.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ length: 15000 }),
        __metadata("design:type", String)
    ], Cdc.prototype, "cdc", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Project_1.Project; }, { persistence: false }) // Init one to one relation with User
        ,
        (0, typeorm_1.JoinColumn)() // Join user table with FavoriteList table
        ,
        __metadata("design:type", Project_1.Project)
    ], Cdc.prototype, "project", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.cdc; }),
        __metadata("design:type", User_1.User)
    ], Cdc.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Team_1.Team; }, function (team) { return team.teamUser; }),
        __metadata("design:type", Team_1.Team)
    ], Cdc.prototype, "team", void 0);
    Cdc = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String])
    ], Cdc);
    return Cdc;
}());
exports.Cdc = Cdc;
//# sourceMappingURL=Specification.js.map