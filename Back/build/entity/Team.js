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
exports.Team = void 0;
var typeorm_1 = require("typeorm");
var TeamUser_1 = require("./TeamUser");
var Specification_1 = require("./Specification");
var Project_1 = require("./Project");
var Team = /** @class */ (function () {
    function Team(avatar, name) {
        this.avatar = avatar;
        this.name = name;
    }
    Team.prototype.getId = function () {
        return this.id;
    };
    Team.prototype.getName = function () {
        return this.name;
    };
    Team.prototype.setName = function (name) {
        this.name = name;
    };
    Team.prototype.getAvatar = function () {
        return this.avatar;
    };
    Team.prototype.setAvatar = function (avatar) {
        this.avatar = avatar;
    };
    Team.prototype.getCreated_at = function () {
        return this.created_at;
    };
    Team.prototype.getTeamUser = function () {
        return this.teamUser;
    };
    Team.prototype.setTeamUser = function (teamUser) {
        this.teamUser = this.teamUser;
    };
    Team.prototype.setCdc = function (cdc) {
        this.cdc = this.cdc;
    };
    Team.prototype.getCdc = function () {
        return this.cdc;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Team.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Team.prototype, "avatar", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Team.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Team.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return TeamUser_1.TeamUser; }, function (teamUser) { return teamUser.team; }),
        __metadata("design:type", Array)
    ], Team.prototype, "teamUser", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Specification_1.Cdc; }, function (cdc) { return cdc.team; }),
        __metadata("design:type", Array)
    ], Team.prototype, "cdc", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Project_1.Project; }, function (project) { return project.team; }),
        __metadata("design:type", Array)
    ], Team.prototype, "project", void 0);
    Team = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String])
    ], Team);
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=Team.js.map